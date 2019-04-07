import mg from 'mailgun-js';

const mailgun = mg({ apiKey: process.env.MAILGUN_API_KEY, domain: 'www.siteminder.com' });

export default async data => mailgun.messages().send(data).then(
  (data) => {
    console.log(data);
  },
  (err) => {
    console.log(err);
  },
);
