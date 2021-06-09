var express = require('express');
var app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser'); 
dotenv.config();

app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false})); 
// app.use(function(req, res, next){
//   console.log(`${req.method} ${req.path} - ${req.ip}`);
//   next(); 
// }); 

app.get(
    "/now",
    (req, res, next) => {
      req.time = new Date().toString();
      next();
    },
    (req, res) => {
      res.send({
        time: req.time
      });
    }
  );
  
  app.get('/name',(req,res)=>{
    res.json({name: `${req.query.first} ${req.query.last}`});
  });

  app.post('/name', (req, res)=>{
    res.json({name: `${req.body.first} ${req.body.last}`})
  });
  
  app.get("/:word/echo", (req, res)=>{
    res.json({echo:req.params.word});   
  }); 
  
  
  
  app.get("/", function(req, res){
    res.sendFile(__dirname + '/views/index.html')
  });
  
  app.get('/json', function(req, res){
    let message = "Hello json"; 
    if(process.env.MESSAGE_STYLE == "uppercase"){
      message = message.toUpperCase(); 
    }
  
    res.json({"message": message}); 
  });

app.get('/', function(req, res){
    res.send("Hello Express");
});




































 module.exports = app;
