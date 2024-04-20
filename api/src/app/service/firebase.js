const  firebase  =  require( "firebase-admin" );

const serviceAccount = require('../../config/alexlan-firebase-adminsdk-cj1uo-19b8438a0c.json')

if (!firebase.apps.length) {
    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
        storageBucket: 'alexlan.appspot.com'
    });
}

const bucket = firebase.storage().bucket();


const uploadImage = (req, res, next) => {
    if(req.files.length < 1) return next();

        const imagesUrls = [];
        for (const file of req.files) {
            const fileName = `${Date.now()}_${file.originalname}`;
            const fileUpload = bucket.file(fileName);

            const stream = fileUpload.createWriteStream({
                metadata: {
                    contentType: file.mimetype
                }
            })

            stream.on('error', (e) => {
                console.log(e)
            })

            stream.on('finish', async() => {
                await fileUpload.makePublic();

                const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
                imagesUrls.push(imageUrl);
                req.images = imagesUrls
                
                return next()
            })

            stream.end(file.buffer)    
        }    

}

module.exports = uploadImage