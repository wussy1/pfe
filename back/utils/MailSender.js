import NodeMailer from "nodemailer";

const nodemailerr = NodeMailer;

export async function sendMailTo(to, code, subject) {
  let transporter = nodemailerr.createTransport({
    service: "gmail",
    auth: {
      user: "hyundaimahdia@gmail.com",
      pass: "gbdjtftalficswdo",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailoption = {
    from: "wissempfe@gmail.com",
    to: to,
    subject: subject,
    html: `<div><h4>Dear ${to}</h4><h4>Please use this Code to Verify your account</h4><h2>${code}</h2><p>This code will expire after 15Minutes , You can't use a verification code more than once</p></div>`, // html body
  };

   transporter.sendMail(mailoption, function (err, scc) {
    if (err) {
      console.log(err);
    } else {
      console.log("email sent successfully");
    }
  });
}
