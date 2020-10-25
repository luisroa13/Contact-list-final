const router = require('express').Router();
const model = require('../models/log');
const contact = require('../models/contacts');
const transporter = require('../helpers/sendMail');
const { sendMail } = require('../helpers/sendMail');
let userlog = 'default';

//Routes
//Sign in


//Sign up
router.post('/valData/Signup', async (req, res) => {
  const newmail = req.body.nemail;
  const newpwd = req.body.npassw;
  const newname = req.body.usrn
  const newlname = req.body.usrln
  const newusr = new model({});
  newusr.email = newmail;
  newusr.password = newpwd;
  newusr.name = newname;
  newusr.lname = newlname;
  await newusr.save();
  const message = 'We send you a confirmation email';
  const confirmation = 'Hello ' + newname + ' ' + newlname + '¨.Please confirm your account, enter to next link: http://localhost:3000/users/login'
  const mailOptions = {
    from: 'salomondrin222@1019jcbez1019@gmail.com',
    to: newusr.email,
    subject: 'Confirmation email',
    text: confirmation
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Email enviado: ' + info.response);
    }
  });
  res.render('users/login');

});

//forgot password
router.post('/valData/updatepass',async (req, res) => {
  const emailusr = req.body.email;
  const pwd = req.body.npass;
  const fname=req.body.fname;
  
  const usr =  await model.findOne({email:req.body.email});
   if(!usr)
   { 
     console.log("User doesnt existe");

   }
  else{
    const name=usr.name;
    const id=usr._id;
    const sname=usr.lname;
   
    if(name==req.body.fname)
    {
      
     await model.findByIdAndUpdate(id,{email:emailusr,password:pwd,fname:fname,lname:sname});
    
     res.render('users/login');
    }
    else{

      console.log('First name error');
      res.render('users/forgot');
    }
  }
    

});



//Add Contact

router.post('/valData/addContact', async (req, res) => {

  const fname = req.body.cfn;
  const lname = req.body.cln;
  const cnmail = req.body.cemail;
  const cnumber = req.body.cnumber;
  const ncontact = new contact();
  ncontact.fname = fname;
  ncontact.lname = lname;
  ncontact.email = cnmail;
  ncontact.number = cnumber;
  await ncontact.save();
  const message = 'added to my contact list';
  const confirmation = 'Hello ' + fname + ' ' + lname + ' add you to my contact list'
  const mailOptions = {
    from: 'salomondrin222@gmail.com',
    to: ncontact.email,
    subject: 'Confirmation email',
    text: confirmation
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Email enviado: ' + info.response);
    }
  });
  res.render('users/login');
  res.redirect('show');
});

router.get('/valData/show', async (req, res) => {
  
  res.render('users/redirect');
});





module.exports = router;