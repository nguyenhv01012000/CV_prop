const express = require('express');
const cors = require('cors')

const app = express()

app.use(cors())

const port = process.env.PORT || 3000;

const routes = require('./route');
routes(app);

app.listen(port);
console.log('todo list RESTful API server started on: ' + port);
