var Express = require("express");
var apiRoutes = Express.Router();
var User = require("../model/signUp");
//
apiRoutes.post("/",function (req,res) {
  //create user
  try {
// console.log(req.body);
  var userData = new User({
    local:{
      name:req.body.name,
      email:req.body.email,
      password:req.body.password,
      mobileNo: req.body.mobileNo
    }
  });

  // save the created user
  userData.save(function(err) {
    if (err) throw err;
    console.log('User saved successfully');
    res.json({ success: true ,"message":"User saved successfully"});
  });
  // res.send({"token":"jhjkhjg",status:true});

} catch (e) {
  console.log(e);
  res.send({"token":null,status:false});
}
});

module.exports = apiRoutes;
