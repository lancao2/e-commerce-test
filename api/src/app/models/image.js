const { Model, DataTypes } = require('sequelize')
require('dotenv').config();

class Image extends Model {
    static init(sequelize) {
        super.init({
            url: DataTypes.STRING,
            product_id: DataTypes.INTEGER,
            
        }, 
        {
            sequelize
        });
    }
}

module.exports = Image