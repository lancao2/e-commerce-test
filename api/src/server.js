const express = require('express');
const routes = require('./app/routes');
const cors = require('cors');
require("./database")

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200,
}));
app.use(routes);


app.listen(port, ()=> {
    console.log(`listening on http://localhost:${port}`);
})