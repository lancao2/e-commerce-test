const Category = require('../models/Category')

module.exports = {
    async store(req, res){
        try {
            const { name } = req.body; 
            
            const repitedCateory = await Category.findOne({where: {name: name}});

            if (repitedCateory){
                throw new Error("this category already exists")

            }else{   

                const cateory = await Category.create({name});
                
                return res.json(cateory);
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({message: error.message})
        }
    },
    async index(req, res){
        try {
            const categories = await Category.findAll()
            if(!categories){
                throw new Error('No categories')
            }
            return res.status(200).json(categories)
        } catch (error) {
            return res.status(404).json({message: error.message})
        }
    },
    async update(req, res){
        try {
            const categoryId = req.params.categoryId
            const {name} = req.body
            const category = await Category.findOne({where: {id: categoryId}})
            if (!category) {
                throw new Error('Cannot find category')
            }
            category.update({name},{where: {id: categoryId},returning: true})
            return res.status(200).json(category)
        } catch (error) {
            return res.status(404).json({message: error.message})
        }
    },
    async delete(req, res) {
        try {
            const categoryId = req.params.categoryId
            const {name} = req.body
            const category = await Category.findOne({where: {id: categoryId}})
            if (!category) {
                throw new Error('Cannot find category')
            }
            category.destroy()
            return res.status(200).json()
        } catch (error) {
            return res.status(404).json({message: error.message})
        }
    }

}