/******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/
 
var bGround = require('fcc-express-bground');
var myApp = require('./myApp');
var express = require('express');
var app = express();
const dotenv = require('dotenv'); 
dotenv.config();


app.use('/public', express.static(__dirname + '/public'));

app.use(function(req, res, next){
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next(); 
}); 



if (!process.env.DISABLE_XORIGIN) {
  app.use(function(req, res, next) {
    var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
    var origin = req.headers.origin || '*';
    if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
         console.log(origin);
         res.setHeader('Access-Control-Allow-Origin', origin);
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
  });
}



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


var port = process.env.PORT || 3000;
bGround.setupBackgroundApp(app, myApp, __dirname).listen(port, function(){
  bGround.log('Node is listening on port '+ port + '...')
});

/******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/

