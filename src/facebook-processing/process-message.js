const fetch = require('node-fetch');
const dialogflow = require('dialogflow');
const log = require('../logger')(__filename);

const projectId = 'yevhenii-rjhrsg';
const sessionId = '123456';
const languageCode = 'en-US';

let sessionClient;
let sessionPath;

const config = {
  credentials: {
    private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
  },
};

try {
  sessionClient = new dialogflow.SessionsClient(config);
  sessionPath = sessionClient.sessionPath(projectId, sessionId);
} catch (error) {
  log.error(error, 'FAILED TO CREATE SESSION CLIENT');
}

const { FACEBOOK_ACCESS_TOKEN } = process.env;

let sendTextMessage;

try {
  sendTextMessage = (userId, text) =>
    fetch(`https://graph.facebook.com/v2.6/me/messages?access_token=${FACEBOOK_ACCESS_TOKEN}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        messaging_type: 'RESPONSE',
        recipient: {
          id: userId,
        },
        message: {
          text,
        },
      }),
    });
} catch (error) {
  log.error(error, 'FAILED TO SEND MESSAGE');
}

module.exports = event => {
  const userId = event.sender.id;
  const message = event.message.text;

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode,
      },
    },
  };

  sessionClient
    .detectIntent(request)
    .then(responses => {
      const result = responses[0].queryResult;
      return sendTextMessage(userId, result.fulfillmentText);
    })
    .catch(err => {
      log.error(err, 'FAILED TO DETECT INTENT');
    });
};
