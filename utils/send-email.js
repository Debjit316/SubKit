import dayjs from "dayjs";
import { emailTemplates } from "./email-template.js";
import transporter, { accountEmail } from "../config/nodemailer.js";

export const sendRemEmail = async ({ to, type, subs }) => {
  // console.log("Subs: ", subs);
  if (!to || !type) throw new Error("Missing required parameters");

  const template = emailTemplates.find((t) => t.label == type);

  if (!template) throw new Error("Invalid email type");

  // console.log("Renewal Date: ", subs.renewalDate);

  const mailInfo = {
    userName: subs.user ? subs.user.name : "Subscriber",
    subscriptionName: subs.name,
    renewalDate: dayjs(subs.renewalDate).format("D MMM, YYYY"),
    planName: subs.name,
    price: `${subs.currency} ${subs.price} (${subs.frequency})`,
    payment: subs.payment,
  };

  const message = template.generateBody(mailInfo);
  const subject = template.generateSubject(mailInfo);

  const mailOptions = {
    from: accountEmail,
    to: to,
    subject: subject,
    html: message,
  };

  // let i = 0;
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return console.log(err, "Error sending mail");

    console.log(`Email sent:  ${info.response}`);
  });
};
