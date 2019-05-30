require('dotenv').config();

const config = {
  credentials: {
    private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
  },
  port: process.env.PORT || 3000,
};

module.exports = {
  config,
};
