const User = require('../models/User');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken')
require('dotenv').config();




module.exports = {
    async store(req, res){
       try {
        const { email, password } = req.body;

        const user = await User.findOne({where: {email}});

        if (!user) {
            throw new Error('User was not found');
        }else{
            if (!await bcrypt.compare(password, user.password)){
                throw new Error('Password is incorrect');
            }else{
                const token = jwt.sign({ id: user.id}, process.env.TOKEN_HASH, {
                    expiresIn: 86400
                })
                const userResponse = _.pick(user, ['id', 'name', 'email', 'is_adm', 'updatedAt', 'createdAt']);
                return res.json({user: userResponse, token})
            }
        }
       } catch (error) {
            return res.status(400).json({message: error.message});
       }
    }
}
