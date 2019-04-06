import sgMail from "@sendgrid/mail";

sgMail.setApiKey(
  "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"
);

const msg = {
  to: "malherbe.chris.1@gmail.com",
  from: "test@example.com",
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>"
};

export default async () => sgMail.send(msg);
