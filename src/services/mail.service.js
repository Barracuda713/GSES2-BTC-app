import { getTestMessageUrl } from 'nodemailer';
import { transporter } from '../smtp.transporter.js';

class MailService {
  async sendMails(subscribers, data) {
    let mails = [];

    for(const sub of subscribers) {
      const message = {
        from: 'Server <sender@example.com>',
        to: `Recipient <${sub}>`,
        subject: `BTC-UAH rate on ${data.date}`,
        text: `BTC-UAH: ${data.rate}`
      };

      const info = await transporter.sendMail(message);
      
      mails.push({
        id: info.messageId,
        url: getTestMessageUrl(info)
      });
    }

    return mails;
  }
}

export const mailService = new MailService();