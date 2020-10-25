const router = require('express').Router();

//rutas
router.get('/',async(req,res) =>{
 
    res.render('users/login')


});


module.exports=router;