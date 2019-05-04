const express= require('express');
const serverless= require('serverless-http');


const app= express()
const router= express.Router()

const images=[
    'david-mullins-1167108-unsplash',
    'divjot-ratra-698430-unsplash',
    'evan-dvorkin-1463601-unsplash',
    'israel-sundseth-1688-unsplash',
    'jeff-sheldon-3227-unsplash',
    'maria-teneva-1416232-unsplash',
    'tilen-dominik-perko-692944-unsplash',
    'timj-310824-unsplash'
]
router.get('/getfiles',(req,res)=>{
    return res.status(200).json({listofimages:images})
})
router.get('/getfile/:name',async(req,res,next)=>{
    try {
        const filetosend= `./myimages/${req.params.name}.jpg`
        await res.download(filetosend,err=>{
            if (err){
                console.log('====================================');
                console.log(`something went wrong sending the file ${filetosend}:\nerror:${err}`);
                console.log('====================================');
            }
        })
        
    } catch (error) {
        next(e)    
    }

})


app.use('./netlify/functions/server')
module.exports= app
module.exports.handler= serverless(app)
