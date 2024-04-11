const express = require('express');
const routes = require('./app/routes');
require("./database")

const app = express();
const port = 3001;

app.use(express.json());
app.use(routes);

app.listen(port, ()=> {
    console.log(`listening on http://localhost:${port}`);
})