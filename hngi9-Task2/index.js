//.src/index.js
const express= require('express')
const cors = require('cors');


//defining the express app
const app=express()

//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use the express-static middleware
app.use(express.static("/"))
app.use(cors({
  origin: '*'
}))

// defining the GET responce object
const ads = { slackUsername:"su-sid",
              backend:true,
              age:22,
              bio:'Free thinker, ready to network with other people'
            }

//converting the object to a json object
const adsJSON=JSON.stringify(ads)

//defining a get endpoint to return all data
app.get('/', (req, res) => {
    res.send(ads);
  });


//defining the post endpoints
app.post("/", (req, res) => {
    console.log(req.body);
   
   //destructuing into three variables. 
    const  { operation_type, x, y} = req.body;
  
// string to int conversion 
let xvalue=parseInt(x)
let yvalue=parseInt (y)

//testing if input are numbers. 

    if (isNaN(xvalue) || isNaN(yvalue))
    return res.send({
      error: "Kindly, enter a number"
    })

  let result = ''

  if (operation_type.toLowerCase() === "addition") {
    result = +xvalue + +yvalue
  }
  if (operation_type.toLowerCase() === "multiplication") {
    result = +xvalue* +yvalue
  }
  if (operation_type.toLowerCase() === "subtraction") {
    result = +xvalue- +yvalue
  }
  else return res.send({
    error: "select from the following accepted operations: 'addition', 'multiplication', or 'subtraction' "
  })

  res.send({
    slackUsername: 'su-sid',
    result,
    operation_type
  })
})



  //starting the server
  app.listen(process.env.PORT ||5000,()=>{
                        console.log(`listening on the open port ${5000} `)
                      })


