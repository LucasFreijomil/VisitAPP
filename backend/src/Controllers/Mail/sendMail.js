const { Users } = require("../../db.js");
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "dario.zerobyte@gmail.com",
      pass: "gwyq xyhp rtlg jmzf",
    },
  });
 
const sendMail = async (req, res)=>
{

    try
    {
        const { email } = req.body

        const user = await Users.findOne( { where: {email} } );

        if(!user) return res.status(400).send('No se encuentra el usuario en la base de datos')
        
        const info = await transporter.sendMail(
        {
          from: 'Visit-App@no-reply.com',
          to: user.email,
          subject: "Welcome to VisitApp - Registration Successful",
          html: `
              <html>
                  <head>
                      <style>
                          body {
                              font-family: Arial, sans-serif;
                              color: #333;
                          }
                          .container {
                              max-width: 600px;
                              margin: 0 auto;
                              padding: 20px;
                          }
                          .header {
                              background-color: #f5f5f5;
                              padding: 10px;
                              text-align: center;
                          }
                          .header h1 {
                              color: #333;
                          }
                          .content {
                              padding: 20px 0;
                          }
                          .footer {
                              text-align: center;
                              color: #777;
                              font-size: 12px;
                              margin-top: 20px;
                          }
                      </style>
                      <title>🏋️‍♀️ Welcome to GetFit 🏋️‍♂️</title>
                  </head>
                  <body>
                      <div class="container">
                          <div class="header">
                              <h1>Welcome to GetFit</h1>
                          </div>
                          <div class="content">
                              <p>Hello ${user.username},</p>
                              <p>Your registration at GetFit has been completed successfully!</p>
                              <p>GetFit is your go-to platform for all your fitness needs. Explore our website and start your fit-journey today!</p>
                              <p>Best regards,<br>The GetFit Team</p>
                          </div>
                          <div class="footer">
                              <p>This is an automated message. Please do not reply to this email.</p>
                          </div>
                      </div>
                  </body>
              </html>
          `
        });
        
        res.status(200).send(`Message sent: ${info.messageId}`);

    }
    catch(error)
    {
        res.status(500).send(error.message)
    }

}

module.exports = sendMail;