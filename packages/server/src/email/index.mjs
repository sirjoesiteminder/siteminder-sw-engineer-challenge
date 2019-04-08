import sendSendgrid from './sendgrid/index.mjs';
// import sendMailgun from './mailgun';

const trimEmails = value => value && value.split(',').map(s => s.trim()).join(',');

export default async (input) => {
  const data = {
    to: trimEmails(input.to),
    cc: trimEmails(input.cc),
    bcc: trimEmails(input.bcc),
    from: 'malherbe.chris.1@gmail.com',
    subject: input.subject,
    text: input.body,
  };

  return sendSendgrid(data);
};
