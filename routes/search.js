var express = require('express');
var router = express.Router();
var braintree = require('braintree');

var transactionId = '5x0p7dgk'; //specify transactionId here
var refund_result = null;

router.get('/', function (req, res, next) {

  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: 'mzwf7bv4zc2bjccb',
    publicKey: 'kc2qfb4zt7g86s57',
    privateKey: '9632cee15f46df181b4042f743682f18'
  });

  var nonceFromTheClient = req.body.paymentMethodNonce;

  gateway.transaction.find("5x0p7dgk", (err, transaction) => {
    transaction.statusHistory.forEach((event) => {
      console.log("event.amount", event.amount);
      console.log("event.status", event.status);
      console.log("event.timestamp", event.timestamp);
      console.log("event.transactionSource", event.transactionSource);
      console.log("event.user", event.user);
    });
  });

    gateway.transaction.refund(transactionId, (err, result) => {
      console.log("\n =========Refund result object========= \n", result.statusHistory);
      refund_result = JSON.stringify(result, null, 4);
      console.log(refund_result);
    });

  res.render('refund', {
    id: transactionId,
    result: refund_result
  });

});

module.exports = router;