const Router = require('koa-router');
const messageWebhook = require('./facebook-processing/message-webhook');
const verifyWebhook = require('./facebook-processing/verify-webhook');

const router = new Router();

router.post('/', messageWebhook);

router.get('/', verifyWebhook);

module.exports = router;
