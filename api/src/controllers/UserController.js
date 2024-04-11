const User = require('../models/User');
const bcrypt = require('bcrypt');
const _ = require('lodash');
require('dotenv').config();

module.exports = {
    async store(req, res){
        try {
            const {name, email, password, is_adm} = req.body;

            // verify if user already exists if not create it.
            const repitedUser = await User.findOne({ where:{email} });
            if (repitedUser){
                throw new Error("this email is already in use")

            }else{   
                const hash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
                const user = await User.create({name, email, password: hash, is_adm});
                const userResponse = _.pick(user, ['id', 'name', 'email', 'is_adm', 'updatedAt', 'createdAt']);
                
                return res.json(userResponse);
            }
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
        

    },
    async update(req, res){
        try {
            const { password, is_adm} = req.body;
            const { id } = req.params

            // verify if have a id in params.
            if (!id){
                throw new Error("id was not found");
            }else{
                //verify if the if id is valid and edit user.
                const user = await User.findOne({where:{id} });

                if (user){
                    await User.update({password, is_adm},{where:{id},returning: true})
                    const user = await User.findOne({where:{id} });
                    return res.json(user);
                }else{
                    throw new Error("this is not a valid Id")
                }
            }

          

        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }
    
};