
import config from "../../config/config";
import { INTERNAL_SERVER_ERROR, OK } from "http-status";

const sgMail = require('@sendgrid/mail');
const sendgridAPIKey = process.env.SENDGRID_API_KEY || config.sendgrid_api_key;

sgMail.setApiKey(sendgridAPIKey)
const mail = async (req, res) => {
  try {
    const { fullname, email, phone, package: package_type, message } = req.body;
    let data;
    if(message) {
        data = {
            from: 'info@kitech.rw',
            to: 'fridolinho@gmail.com',
            subject: 'Contact form submission',
            html: '<div><p>' + message + '</p><p><b>Contact Email:</b> ' + email + '<br/>',
        };
    }
    if(package_type) {
        data = {
            from: 'info@kitech.rw',
            to: 'fridolinho@gmail.com',
            subject: 'AKADOMORW ORDER REQUEST',
            html: '<div><p><b>Name:</b> ' +fullname+ '</b><br/><b>Package:</b> '+package_type+ '<br/><b>Phone:</b> '+phone+'<br/><b>Email:</b> '+email+'  </p></div>'
        };
    }

    await sgMail.send(data);
    return res.status(OK).json({ status: OK, message: "email sent" });
  }
  catch(error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: INTERNAL_SERVER_ERROR,
      message: "Something went wrong",
      error,
    });
  }
}

export default mail;
