const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const user_Schema=new Schema({
 
    email: {type: String},
     
    password: {type: String},
    
    name:{type: String},
    
    lname:{type: String}    

  
});

const model=mongoose.model('usrD',user_Schema);

module.exports=model;
