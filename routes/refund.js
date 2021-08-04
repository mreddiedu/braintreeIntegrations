var express = require('express');
var router = express.Router();
var braintree = require('braintree');

var transactionId = 'm2yf4090'; //specify transactionId here

router.get('/', function (req, res, next) {

  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: 'mzwf7bv4zc2bjccb',
    publicKey: 'kc2qfb4zt7g86s57',
    privateKey: '9632cee15f46df181b4042f743682f18'
  });

  gateway.transaction.find(transactionId, (err, transaction) => {
    transaction.statusHistory.forEach((event) => {
      console.log("event.amount", event.amount);
      console.log("event.status", event.status);
      console.log("event.timestamp", event.timestamp);
      console.log("event.transactionSource", event.transactionSource);
      console.log("event.user", event.user);
    });
  });

  gateway.transaction.find(transactionId, (err, transaction) => {
    console.log("\n =========Transaction.Find result object========= \n", transaction);
  });

  gateway.transaction.refund(transactionId, (err, result) => {
    if (result.success) {
      console.log("refund successful: ", result.message);
      console.log("\n =========Refund result object========= \n", result.statusHistory);
      console.log(JSON.stringify(result, null, 4));
    } else {
      console.log("refund failed: ", result.message);
    }

    res.render('responseTemplate', {
      serverApiRequest: 'Refund',
      id: transactionId,
      result: "Refund result: " + result.success + '\n' + result.message + '\n' + JSON.stringify(result, null, 4)
    });
  });


});

module.exports = router;