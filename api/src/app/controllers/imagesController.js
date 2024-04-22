const Image = require("../models/image")

module.exports = {
    async delete(req, res) {
       try {
            const image = await Image.findOne({where: {id: req.params.url_id}})

            if (!image) throw new Error('image not found')

            image.destroy()

            return res.status(200).json()

       } catch (error) {
            return res.status(404).json({error: error.message})
       }
    }, 
}