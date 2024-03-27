// const nodemailer = require("nodemailer");
// const ejs = require('ejs');
// const path = require('path');

// let transporter = nodemailer.createTransport({
//     service:'gmail',/*Specifies the email service to be used. In this case, it's set to 'gmail', indicating the use of Gmail's SMTP server.*/
//     host: 'smtp.gmail.com', /*Specifies the SMTP server host. For Gmail, it's 'smtp.gmail.com'. it is basically a domain to interact with*/ 
//     port: 587, /* Specifies the port number to be used for SMTP communication. For Gmail, it's 587. */
//     secure: false, /*Specifies whether to use a secure connection (SSL/TLS) when connecting to the SMTP server. In this case, it's set to false, indicating that it's not using a secure connection.*/
//     auth: {
//         user: 'tiwari.108',
//         pass: 'tiwari.108108'
//     }
// });

// let renderTemplet = (data , relativePath) => {
//     let mailHTML;
//     ejs.renderFile(
//         path.join(__dirname , '../views/mailers' , relativePath),
//         data,
//         function( err , Templet){
//             if(err){console.log('error in redering the templet');return;}
//             mailHTML = Templet;
//         }
//     )

//     return mailHTML;

// }

// module.exports = {
//     transporter : transporter,
//     renderTemplet: renderTemplet
// }