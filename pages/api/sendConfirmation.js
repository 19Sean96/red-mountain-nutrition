import nodemailer from "nodemailer";

export default async (req, res) => {
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
  const { ADMIN_EMAIL, ADMIN_PW } = process.env
  console.log(ADMIN_EMAIL, ADMIN_PW);
	// create reusable transporter object using the default SMTP transport
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
    to: "1996.sean.alexander@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  }

  transporter.sendMail(info, (err, data) => {
      if (err) {
          console.log(err)
      } else {
          console.log("EMAIL SENT SUCCESSFULLY");
      }
      res.json(data)

  })


};
