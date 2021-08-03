var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var checkoutRouter = require('./routes/checkout');
var refundRouter = require('./routes/refund');
var resultRouter = require('./routes/result');
var searchRouter = require('./routes/search');
var voidRouter = require('./routes/void');
var client_tokenRouter = require('./routes/client_token');
var create_customerRouter = require('./routes/create_customer');
var create_customerWithPaymentMethodRouter = require('./routes/create_customerWithPaymentMethod');

var app = express(); //Creates an Express application. The express() function is a top-level function exported by the express module.

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/checkout', checkoutRouter);
app.use('/refund', refundRouter);
app.use('/search', searchRouter);
app.use('/void', voidRouter);
app.use('/client_token', client_tokenRouter);
app.use('/create_customer', create_customerRouter);
app.use('/create_customerWithPaymentMethod', create_customerWithPaymentMethodRouter);

// Display payment result for dLocal
app.use('/result', resultRouter);
app.use(express.urlencoded({extended: true}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
