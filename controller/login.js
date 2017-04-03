var express    = require("express");
var app        =  express();
var config     =  require("../config/config");
var apiRoutes  = express.Router();
var jwt        = require('jsonwebtoken'); // used to create, sign, and verify tokens
var SECRET     = new config().secret;     // creating object of class config
// var SECRET     = config.secret;     // creating object of class config

var User = require("../model/signUp");
apiRoutes.post('/',function(req,res){
  User.findOne({
    "local.email":req.body.email,
    "local.password":req.body.password
  },function(err,user){
    if(err) {
       throw err;
     }

    if (!user) {
            res.json({
                authsuccess: false,
                description: 'logging failed'
            });
         } else {
             //16c. generate the token because we have the username and pasword
             //matching
            //  var token = jwt.sign(user, app.get('superSecret'), {
            //        expiresIn: 1440 // expires in 24 hours
            //      });
            var userObj = user.toJSON();
            console.log(userObj._id);
            console.log(typeof userObj._id);
                var token = jwt.sign({id:userObj._id}, SECRET, { expiresIn: 1000*30 });
             //send the response to the caller with the accesstoken and data
             //16d.
             res.json({
                 authsuccess: true,
                 description: 'logging in Successfully',
                 token:token
             });
         }
     });
  });
module.exports = apiRoutes;
