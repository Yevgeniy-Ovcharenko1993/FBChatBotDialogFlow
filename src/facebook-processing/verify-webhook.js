const log = require('../logger')(__filename);

const verifyWebhook = async context => {
  const VERIFY_TOKEN = 'pusher-bot';

  const mode = context.request.query['hub.mode'];
  const token = context.request.query['hub.verify_token'];
  const challenge = context.request.query['hub.challenge'];

  if (mode && token === VERIFY_TOKEN) {
    context.status = 200;
    context.body = challenge;
    log.info('WEBHOOK SUCESSFULLY CHECKED');
  } else {
    context.status = 403;
    log.error('CHECKING WEBHOOK FAILED');
  }
};

module.exports = verifyWebhook;
