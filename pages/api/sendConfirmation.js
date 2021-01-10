import nodemailer from "nodemailer";

export default async (req, res) => {
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
  const { ADMIN_EMAIL, ADMIN_PW } = process.env
  console.log(ADMIN_EMAIL, ADMIN_PW);
  // create reusable transporter object using the default SMTP transport
  const { id, email, name, phone, date } = req.body
  console.log("THIS IS THE EMAIL BODY RIGHT HERE: ", req.body);
  if (email && phone && name) {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      // host: "smtp.gmail.com",
      // port: 587,
      // secure: false,
      // requireTLS: true,
      auth: {
        user: ADMIN_EMAIL, // generated ethereal user
        pass: ADMIN_PW, // generated ethereal password
      },
      });
      
        // send mail with defined transport object
    let info = {
      from: ADMIN_EMAIL, // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<div>
              <h1>Thank you for your purchase, ${name} your appointment at 7:13 PM, on 12/29/2020</p>!</h1>
              <p>We have you scheduled in for your app
              <p>We will reach out to you 5 minutes prior at the number you provided us to confirm your appointment: ${phone}</p>
              <p>Speak to you soon!</p>
      
              <div>
                <h2>Purchase Details</h2>
                <ul>
                  <li>Purchase Total: $429</li>
                  <li>Package: Standard</li>
                  <li>Initial Appointment Time: 7:13 PM, 12/29/2020</li>
                </ul>
              </div>
            </div>`, // html body
    }, res
  

    await transporter.sendMail(info, (err, data) => {
        if (err) {
            console.log(err)
            res.json(err)
        } else {
            console.log("EMAIL SENT SUCCESSFULLY");
            res = data
            res.json(res)


        }
    })


  }

};
