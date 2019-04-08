import sendSendgrid from './sendgrid/index.mjs';
import sendMailGun from './mailgun/index.mjs';
import circuitBreaker from 'opossum';

const trimEmails = value => value && value.split(',').map(s => s.trim()).join(',');

export default async (input) => {
  const data = {
    to: trimEmails(input.to),
    cc: trimEmails(input.cc),
    bcc: trimEmails(input.bcc),
    from: 'chris@emailtest.com',
    subject: input.subject,
    text: input.body,
  };

  const options = {
    timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
    errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
    resetTimeout: 30000 // After 30 seconds, try again.
  };

  const emailBreaker = circuitBreaker(() => sendSendgrid(data), options);
  emailBreaker.fallback(() => sendMailGun(data));
  emailBreaker.on('fallback', () => console.log('Sendgrid failed, using sendMailGun to send'));
  emailBreaker.on('success', () => console.log('Email sent'));

  // No need to catch errors here, if both fail, the controller top level catch will log the error.
  return emailBreaker.fire();
};
