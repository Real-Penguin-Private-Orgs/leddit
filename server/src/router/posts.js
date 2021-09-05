const {Router} = require('express')
const knex = require('../knex')
const yup = require('yup');
const { auth } = require('../utils/auth');
const router = Router()

router.get('/', async(req, res) => {
    let data =  await knex.select('*').from('posts')
    res.json(data);
})

const schema = yup.object().shape({
    title: yup.string().trim().min(8).required(),
    body: yup.string().trim().min(50).required()
})

const errorMessages = {
    titleInUsed: 'Title in use, try another one',
};

router.post('/', auth, async(req, res, next) => {
    let { title, content } = req.body;
    
    //SELECT * FROM posts WHERE title = ?
    const existingTitle = await knex.select('title').table('posts').where({ title }).first();

    await schema.validate({ title, content })
    .catch(err => res.json(err))

    if(!title || !content) return res.status(204)

    if (existingTitle) {
        const error = errorMessages.titleInUsed;
        return  res.status(403).json({
            message: error,
            status: 403
        }) 
    }

    knex('posts').insert({
            title: title,
            body: content
    })
    .then((response) => {
        res.status(201).json(response);     
    })
    .catch((err) => {
       next(err)
    })
})

router.get('/:id', async(req, res) => {
    let { id } = req.params;
    if(!id) return;
    await knex.select('*').from('posts').where({ id }).first()
    .then((response) => {
        if(response) {
            res.json(response)
        } else {
            res.status(404).json({ message: 'not found' }) 
        }
    })
    .catch((err) => {
        console.error(err)
    });
})

router.put('/:id', async(req, res, next) => {
        let { title, content } = req.body;
        let { id } = req.params
        if(!id || !title || !content) return;

        await schema.validate({ title, content })
        .catch(err => res.json(err))
        
        await knex('users')
        .where({ id: id })
        .update({ 
                title: title,
                body: content
         })
         .then((result) => {
             res.json(result)
         })
         .catch((err) => {
             next(err);
         })
})

router.delete('/:id', async(req, res, next) => {
    let { id } = req.params;
    if(!id) return;
    await knex('posts')
            .where({ id: id })
            .del()
            .then((response) => {
                res.json(response)
            })
            .catch((err) => {
                next(err)
            })
})

module.exports = router;