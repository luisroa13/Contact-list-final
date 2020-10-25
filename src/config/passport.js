const passport=require('passport');
const model = require('../models/log');
LocalStrategy=require('passport-local').Strategy;
passport.use(new LocalStrategy(async (email,password,done)=>{
      console.log(email);
      
    const usr=await model.findOne({email:email});
  
    if(!usr)
    {

        return done(null,false,{message:'Not User Found'})
    }
    else{

       const match=await usr.comparePassword(password);
       if(match)
       {
           return done(null,usr)
       }else{

        return done(null,false,{message:'Ivalid Password'})
       }
    }
}
));

passport.serializeUser((user,done)=>{
done (null,user.id)

});

passport.deserializeUser((user,done)=>{

     done(err,user)
})
