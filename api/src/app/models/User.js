const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt');
require('dotenv').config();

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            is_adm: DataTypes.BOOLEAN,
        }, 
        {
            sequelize
        });

        this.addHook('beforeSave', async (user) =>{
            user.password = await bcrypt.hash(user.password, parseInt(process.env.SALT_ROUNDS));
        });
    }
}

module.exports = User
