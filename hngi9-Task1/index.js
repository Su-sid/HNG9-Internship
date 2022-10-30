//.src/index.js
const express= require('express')

//defining the express app
const app=express()


// use the express-static middleware
app.use(express.static("/"))

// defining an object
const ads = { slackUsername:"su-sid",
              backend:true,
              age:22,
              bio:'Free thinker, ready to network with other people'
            }

//converting the object to a json object
const adsJSON=JSON.stringify(ads)

//defining an endpoint to return all data
app.get('/', (req, res) => {
    res.send(ads);
  });

  //starting the server
  app.listen(process.env.PORT ||5000,()=>{
                        console.log(`listening on the open port ${5000} `)
                      })