const User = require("../models/User");

module.exports = async (req, res, next) => {
   try {
        const { email } = req.body
        const user = await User.findOne({where: {email}});
        if (!user) {
            throw new Error("user are not allowed")
        }
        if (user.is_adm !== true){
            throw new Error("user are not allowed")
        }
        next()
   } catch (error) {
        return res.status(402).json({message: error.message});
   }
}