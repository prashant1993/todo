var mongoose = require("mongoose");

//set variable reffernce to mongoose schema
var Schema = mongoose.Schema;

//create the schema
var userSchema = new Schema({
local:{
  name: String,
  email: String,
  password:String,
  mobileNo:String
},
fb:{
    id: String,
		access_token: String,
		firstName: String,
		lastName: String,
    email: String
},
google:{
  id: String,
  access_token: String,
  firstName: String,
  lastName: String,
  email: String
}
},{collection:"user"});

// to create a model using it
var signUp = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
//to export the module
module.exports = signUp;

// module.exports = myCreateUser;
