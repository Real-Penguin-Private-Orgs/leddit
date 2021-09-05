const app = require("./app");

let port = process.env.PORT || 3001;

app.listen(port, (err) => {
    if(err) throw err;
    console.log(`Listening to http://locahost:${port}`)
})