const Category = require('../models/Category');
const Product = require('../models/Product');
const Image = require('../models/image');
// const multer = require('multer')
const firebase = require('../service/firebase');

module.exports = {
    async srtore(req,res){
        try {
            const  {name, descriptions, id_cateory, supply, price} = req.body
            if (!req.body) throw new Error('body is missing')

            const product = await Product.create({name, descriptions, id_cateory, supply, price})
            if(req.images.length > 0){
                for (const url of req.images){
                    const image = await Image.create({url, product_id: product.id})
                    if (!image) throw new Error('image is missing')
                }
            }
            return res.status(200).json({product, images: req.images})

            


           

        } catch (error) {
            return res.status(500).json({ error: error.message})
        }
    },

    async index(req, res) {
        try {
            const products = await Product.findAll()
            const responseProducts = []

            for (const product of products) {
                const images = await Image.findAll({where: {product_id: product.id}})
                const urls = images.map(image => image.url)
                responseProducts.push({product, urls})
            }
            
            return res.status(200).json(responseProducts)

        } catch (error) {
            return res.status(500).json({ error: error.message})
        }
    }, 

    async update(req, res) {
        try {
            const  {name, descriptions, id_category, supply, price} = req.body;
            const id = req.params.id

            console.log(req.body)

            const product = await Product.findOne({where: {id}})
            if (!product) throw new Error('Product not found')
            

            await product.update({name, descriptions, id_category, supply, price},{where:{id},returning: true})
            return res.status(200).json({product})


        } catch (error) {
            return res.status(500).json({ error: error.message})
        }
    },

    async delete(req, res) {
      try {
        const id = req.params.id
        const product = await Product.findOne({where: {id}})
        const images = await Image.findAll({where: {product_id: id}})
        if (!product) throw new Error('Product not found')
        images.forEach(image => image.destroy())
        product.destroy()
        res.status(200).json()
      } catch (error) {
        return res.status(500).json({ error: error.message})
      }
    }

}
