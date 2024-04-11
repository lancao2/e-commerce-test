const express = require('express');
const routes = express.Router();

const UserRoutes = require('./userRoutes')
const KeyRoutes = require('./keyRoutes')
const AuthRoutes = require('./authRoutes')

routes.use('/users', UserRoutes)
routes.use('/users/key', KeyRoutes)
routes.use('/auth', AuthRoutes)
  
module.exports = routes