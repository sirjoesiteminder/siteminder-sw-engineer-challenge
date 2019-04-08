import sendSendgrid from './sendgrid/index.mjs';

import send from './index.mjs';

jest.mock('./sendgrid/index.mjs');


it('calls sendSendGrid given an input', () => {
  sendSendgrid.mockReturnValue(Promise.resolve({}));

  send({
    to: 'chris@voyya.com', cc: '', bcc: '', body: 'body', subject: 'subject',
  });

  expect(sendSendgrid).toHaveBeenCalledTimes(1);
  expect(sendSendgrid).toHaveBeenCalledWith({
    to: 'chris@voyya.com', cc: '', bcc: '', body: 'body', subject: 'subject',
  });
});
