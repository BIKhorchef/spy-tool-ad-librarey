require('dotenv').config();

module.exports = {
  apiToken: process.env.API_TOKEN,
  port: process.env.PORT || 30
};
