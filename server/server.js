const express = require('express');
const webpack = require('webpack');
const config = require('../webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const history = require('connect-history-api-fallback');
const bodyParser = require('body-parser');

const app = express();
const compiler = webpack(config);
const jsonParser = bodyParser.json();
const dbManager = require('./connectDB');

app.use(history());
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.post('/api/user', jsonParser, (req, res) => {
  if (!req.body) {
    return res.sendStatus(400);
  }

  dbManager.getUser(req.body)
    .then(data => res.send(data))
    .catch(err => res.send(err))
});

app.post('/api/user-by-id', jsonParser, (req, res) => {
  if (!req.body) {
    return res.sendStatus(400);
  }

  dbManager.getUserById(req.body.id)
    .then(data => res.send(data))
    .catch(err => res.send(err))
});

app.put('/api/add-task', jsonParser, (req, res) => {
  if (!req.body) {
    return res.sendStatus(400);
  }

  dbManager.addTask(req.body)
    .then(data => res.send(data.value.tasks))
    .catch(err => res.send(err));
});

app.delete('/api/delete-task', jsonParser, (req, res) => {
  if (!req.body) {
    return res.sendStatus(400);
  }

  dbManager.deleteTask(req.body)
    .then(data => res.send(data.value.tasks))
    .catch(err => res.send(err));
});

app.listen(3000);
