const Key = require('../models/Key')
const User = require('../models/User');
const generateKey = require('../service/generateKey');
const transport = require('../service/mailer');
const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports = {
    async store(req, res){
        try {
            const { email } = req.body

            const user = await User.findOne({ where:{email} });
            const user_id = user.id
            

            if (!user) {
                throw new Error(`Email ${email} not found`)
            }
            const key = generateKey()
            const newKey = await Key.create({user_id, key});
            
            if(!newKey){
                throw new Error(`something is wrong`)
            }

            transport.sendMail({
                to: email,
                from: 'contato@alexlan.com.br',
                subject: 'Recuperação de senha',
                text: `Seu codio de verificação é ${key}`
            }, (error, info)=>{
                if (error) {
                    console.log(error);
                  } else {
                    res.status(200).json({
                        message: `Recover code was sand to ${email}`
                    })
                  }
            })

           
            
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    },
    async update(req, res){
        try {
            const {email, key} = req.body;

            const user = await User.findOne({where: {email}});
            const dbKey = await Key.findOne({where: {key}});

            if (!user){
                throw new Error('User was not found')
            }

            if (!dbKey){
                throw new Error('invalid key')
            }

            
            if (dbKey.user_id !== user.id) throw new Error('invalid key');

            const token = jwt.sign({ id: user.id}, process.env.TOKEN_HASH, {
                expiresIn: 86400
            })

            return res.json({token})
            
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }
}