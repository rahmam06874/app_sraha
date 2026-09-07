import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rahmaandran@gmail.com",
      //pass: "YOUR_APP_PASSWORD",
      pass: "fonyczrrkyrrqvmy ",
    },
  });

  const info = await transporter.sendMail({
    from: '"Saraha App" <YOUR_EMAIL@gmail.com>',
    to,
    subject,
    html,
  });

  return info;
};