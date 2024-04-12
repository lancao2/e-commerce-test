const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt');
require('dotenv').config();

class Key extends Model {
    static init(sequelize) {
        super.init({
            key: DataTypes.INTEGER,
            type: DataTypes.STRING,
            user_id: DataTypes.INTEGER,
        }, 
        {
            sequelize
        });
    }
}

module.exports = Key