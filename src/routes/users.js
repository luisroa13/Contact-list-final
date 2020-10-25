const router = require('express').Router();
const model = require('../models/log');
const contact = require('../models/contacts');
const passport=require('passport');



router.get('/users/login',(req,res) =>{
   
    res.render('users/login');
})

//router.post('/valData/login',passport.authenticate('local',{
  //  successRedirect:'/users/contactos',
    //failureRedirect: '/users/login',
    //passReqToCallBack: true

   
//}));
router.post('/valData/login',async (req,res)=>{
const user= await model.findOne({email:req.body.email});


if(!user)
{
  res.render('users/login');
  console.log("User doesnt exist");
  
}

else{
    
    const pwd = user.password;
    
    console.log(req.body.passw)
    if(pwd == req.body.passw) 
    {
        
        res.render("users/redirect");
    }
    else{
        console.log("Error");
        res.render('users/login');
    }
}


})


router.get('/users/signup',(req,res) =>{
   
    res.render('users/signup');
})

router.get('/users/forgot',(req,res) =>{
   
    res.render('users/forgot');
})
router.get('/users/contacts', async (req,res) =>{
     
 
    const contacts=await contact.find({}).lean();   
    
    res.render('users/showContacts',{contacts});
});

router.get('/users/redirect',(req,res) =>{
   
    res.render('users/redirect');
})

router.get('/users/addContact',(req,res) =>{
   
    res.render('users/addContact');
})

router.get('/users/addContact',(req,res) =>{
   
    res.render('users/addContact');
})



router.get('/users/update/:id',async(req,res)=>{

const _id=await contact.findById(req.params.id).lean();

res.render('users/update',_id);
})
router.post('/users/update/contact',async(req,res)=>{
   const name=req.body.fn;
   const lname=req.body.ln;
   const email=req.body.mail;
   const number=req.body.number;
   const _id=req.body.id;
 
await contact.findByIdAndUpdate(_id,{name,lname,email,number})
  res.render('users/redirect');
})

router.get('/users/delete/:id',async(req,res)=>{

    await contact.findByIdAndDelete(req.params.id);
    
    res.render('users/redirect');
    })


router.post('/users/search?search=',(req,res)=>{
console.log("vierwa");

})

module.exports=router;