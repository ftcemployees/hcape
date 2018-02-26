const express = require('express');
const  logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
import {router as apiRoot} from "./routes/api-root";

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static(path.join(__dirname, 'client/build/static')));

app.use('/', (req, res) => {
  console.log(req);
  res.sendFile(__dirname + '/client/build/index.html');
});

app.use('/api', apiRoot);
app.use('/s', (req, res)=> {
  res.redirect('/');
});
app.use('/t', (req, res)=> {
  res.redirect('/');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
