const axios = require('axios');
const dialogflow = require('dialogflow');
const log = require('../logger')(__filename);
const { createTask } = require('../template/button-templates');

let sessionClient;
let sessionPath;
const { FACEBOOK_ACCESS_TOKEN } = process.env;
const projectId = 'yevhenii-rjhrsg';
const sessionId = '123456';
const languageCode = 'en-US';
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

function sendTextMessage(userId, data) {
  if (data === 'Create task') {
    const headers = {
      'Content-Type': 'application/json',
    };

    const response = {
      recipient: {
        id: userId,
      },
      message: createTask,
    };
    try {
      axios.post(
        `https://graph.facebook.com/v2.6/me/messages?access_token=${FACEBOOK_ACCESS_TOKEN}`,
        response,
        { headers },
      );
    } catch (error) {
      log.error(error, 'FAILED TO SEND MESSAGE TO FACEBOOK CLIENT');
    }
  }
}

module.exports = async event => {
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

  sendTextMessage(userId, 'Create task');

  // sessionClient
  //   .detectIntent(request)
  //   .then(responses => {
  //     const result = responses[0].queryResult;
  //     return sendTextMessage(userId, result.fulfillmentText);
  //   })
  //   .catch(err => {
  //     log.error(err, 'FAILED TO DETECT INTENT');
  //   });
};
