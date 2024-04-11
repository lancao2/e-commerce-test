const express = require('express');
const routes = express.Router();

const UserRoutes = require('./userRoutes')

routes.use('/users', UserRoutes)
  
module.exports = routes