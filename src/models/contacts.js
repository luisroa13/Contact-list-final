const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const usr=mongoose.model('usrD');
const contacs_Schema=new Schema({
 
    email: String,
     
    number: Number,
    
    fname: String,
    lname: String,
    

  
});

module.exports=mongoose.model('contacts', contacs_Schema);
