import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ec77999fac4fbc",
    pass: "acc09b75462c3c"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'equipe fedget <oi@feedget.com>',
      to: 'Diego Marques <marquesashiri@gmail.com>',
      subject,
      html: body,
    });
  }
}