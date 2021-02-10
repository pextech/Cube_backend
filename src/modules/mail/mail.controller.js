import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import config from '../../config/config';

const sgMail = require('@sendgrid/mail');

const sendgridAPIKey =
  process.env.SENDGRID_API_KEY || config.sendgrid_api_key;
sgMail.setApiKey(sendgridAPIKey);

const mail = async (req, res) => {
  try {
    const {
      fullname,
      email,
      phone,
      package: package_type,
      message,
    } = req.body;

    let data;
    if (message) {
      data = {
        from: process.env.MAIL_FROM,
        to: process.env.MAIL_TO,
        subject: 'Contact form submission',
        html: `<div><p>${message}</p><p><b>Contact Email:</b> ${email}<br/>`,
      };
    }

    if (package_type) {
      data = {
        from: process.env.MAIL_FROM,
        to: process.env.MAIL_TO,
        subject: 'AKADOMORW ORDER REQUEST',
        html: `<div><p><b>Name:</b> ${fullname}</b><br/><b>Package:</b> ${package_type}<br/><b>Phone:</b> ${phone}<br/><b>Email:</b> ${email}  </p></div>`,
      };
    }

    await sgMail.send(data);
    return res.status(OK).json({ status: OK, message: 'email sent' });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: INTERNAL_SERVER_ERROR,
      message: 'Something went wrong',
      error,
    });
  }
};

const sendInvoice = async (email, message, attachments) => {
  const data = {
    from: process.env.MAIL_FROM,
    to: email,
    subject: 'Kitech Invoice',
    attachments,
    html: `<div><p>${message}</p><p><b>Contact Email:</b> ${process.env.MAIL_FROM}<br/>`,
  };
  await sgMail.send(data);
};

export { mail, sendInvoice };
