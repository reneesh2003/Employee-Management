const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
   console.log("connection succeeded");
})
const SignUpSchema= new mongoose.Schema({
    username: {type:String,required:true},
    email: {type:String,required:true},
    password: {type:String,required:true}
  });
  const Employee_Schema = new mongoose.Schema({
      name: {type:String,required:true},
    email: {type:String,required:true},
    mobileNo: {type:String,required:true},
    designation: {type:String,required:true},
    gender: {type:String,required:true},
    course: {type:String,required:true},
    createDate: {type:String,required:true},
    img:
    {
        type: Buffer,
        contentType: String
    }
  });
  const SignUpModel= mongoose.model("Users",SignUpSchema);
   const EmployeeModel= mongoose.model("Employee",Employee_Schema);
  module.exports = {SignUpModel,EmployeeModel}