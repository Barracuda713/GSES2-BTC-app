import { createTestAccount, createTransport } from 'nodemailer';

let transporter;

const initSMTP = async () => {
  let testAccount = await createTestAccount();

  transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });
};

export { initSMTP, transporter };
