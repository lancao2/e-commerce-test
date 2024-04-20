const { Model, DataTypes } = require('sequelize')
require('dotenv').config();

class Product extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            descriptions: DataTypes.TEXT,
            id_category: DataTypes.INTEGER,
            supply: DataTypes.INTEGER,
            price: DataTypes.FLOAT
        }, 
        {
            sequelize
        });
    }
}

module.exports = Product