import mg from 'mailgun-js';

const mailgun = mg({ apiKey: '2416cf28-e97d5263', domain: 'www.siteminder.com' });

const data = {
  from: 'me@samples.mailgun.org',
  to: 'malherbe.chris.1@gmail.com',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomeness!',
};

export default async () => mailgun.messages().send(data).then(
  (data) => {
    console.log(data);
  },
  (err) => {
    console.log(err);
  },
);
