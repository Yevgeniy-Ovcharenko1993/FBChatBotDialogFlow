const processMessage = require('./process-message');

module.exports = async context => {
  if (context.request.body.object === 'page') {
    const { entry } = context.request.body;
    entry.forEach(e => {
      e.messaging.forEach(event => {
        if (event.message && event.message.text) {
          processMessage(event);
        }
      });
    });
  }
  context.status = 200;
};
