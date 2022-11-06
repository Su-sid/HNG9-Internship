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
  

//testing if input are numbers. 

    if (isNaN(x) || isNaN(y))
    return res.send({
      error: "Kindly, enter a number"
    })

  let result = ''

  //the unary plus operator before the x and y operators converts the operators from non numbers to numbers. does the same function as parseInt method.
  if (operation_type.toLowerCase() === "addition") {
    result = +x + +y
  }
  if (operation_type.toLowerCase() === "multiplication") {
    result = +x* +y
  }
  if (operation_type.toLowerCase() === "subtraction") {
    result = +x- +y
  }
  else return res.send({
    error: "choose from the following accepted operations: 'addition', 'multiplication', or 'subtraction' "
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


