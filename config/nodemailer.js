import nodemailer from "nodemailer";

import { EMAIL_PASSWORD, Account_Email } from "./env.js";

export const accountEmail = Account_Email;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: accountEmail,
    pass: EMAIL_PASSWORD,
  },
});

export default transporter;
