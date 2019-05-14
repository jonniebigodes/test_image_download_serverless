const express = require("express")
const serverless = require("serverless-http")
const bodyparser = require("body-parser")
const app = express()
const router = express.Router();
const fs= require('fs');


router.route('/hello').get((req,res)=>{
  const html = `
        <html>
          <head>
            <style>
              body {
                padding: 30px;
              }
            </style>
          </head>
          <body>
            <h1>Express running inside netlify serverless function</h1>
            <p>I'm using Express running via a <a href='https://www.netlify.com/docs/functions/' target='_blank'>Netlify Function</a>.</p>
          </body>
        </html>
      `
    res.send(html)
})
router.route('/getfile/:name').get((req,res,next)=>{
  try {
    const filetosend= `./myimages/${req.params.name}.jpg`
    if (!fs.existsSync(`./myimages`)){
      return res.status(200).json({exists:true})
    }
    return res.status(404).send('NOT FOUND')

    //return res.status(200).json({nameoffile:req.params.name})
    /* await res.download(filetosend,err=>{
        if (err){
            console.log('====================================');
            console.log(`something went wrong sending the file ${filetosend}:\nerror:${err}`);
            console.log('====================================');
        }
    }) */
    
  } catch (error) {
    next(error)
  }
})

router.route('/listfiles').get((req,res)=>{
  return res.status(200).json({
    listoffiles: [
      "david-mullins-1167108-unsplash",
      "divjot-ratra-698430-unsplash",
      "evan-dvorkin-1463601-unsplash",
      "israel-sundseth-1688-unsplash",
      "jeff-sheldon-3227-unsplash",
      "maria-teneva-1416232-unsplash",
      "tilen-dominik-perko-692944-unsplash",
      "timj-310824-unsplash",
    ],
  })
})




/* router.get("/listfiles", (req, res) =>
  res.json({
    listoffiles: [
      "david-mullins-1167108-unsplash",
      "divjot-ratra-698430-unsplash",
      "evan-dvorkin-1463601-unsplash",
      "israel-sundseth-1688-unsplash",
      "jeff-sheldon-3227-unsplash",
      "maria-teneva-1416232-unsplash",
      "tilen-dominik-perko-692944-unsplash",
      "timj-310824-unsplash",
    ],
  })
) */

app.use(bodyparser.json())

app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);