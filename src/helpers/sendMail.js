const nodemailer = require('nodemailer'); 
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'salomondrin222@gmail.com',
        pass: '2apwp455w0rd'
    }
});

module.exports=transporter;