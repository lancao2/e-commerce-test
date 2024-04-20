const express = require('express');
const routes = express.Router();

//routes group
const UserRoutes = require('./userRoutes')
const KeyRoutes = require('./keyRoutes')
const AuthRoutes = require('./authRoutes')
const CategoryRoutes = require('./categoryRoutes')
const ProductRoutes = require('./productRoutes')

//middlewares
const authMiddleware = require("../middleware/auth")

routes.use('/users', UserRoutes)
routes.use('/RecoverPassword', KeyRoutes)
routes.use('/auth', AuthRoutes)
routes.use('/category', CategoryRoutes) // tem middleware
routes.use('/product', ProductRoutes) // tem middleware
  
module.exports = routes