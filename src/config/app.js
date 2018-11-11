const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('../routes/router');

const createApp = () => {
  const app = express();
  console.log(__dirname);
  app.use('/', express.static(`${__dirname}/../static`));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use('/api', router);
  return app;
};

module.exports = createApp;
