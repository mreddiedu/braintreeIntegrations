var express = require('express');
var router = express.Router();
var braintree = require('braintree');

var transactionId = '60rrgr6b'; //specify transactionId here
var void_result = null;

router.get('/', function (req, res, next) {

  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: 'mzwf7bv4zc2bjccb',
    publicKey: 'kc2qfb4zt7g86s57',
    privateKey: '9632cee15f46df181b4042f743682f18'
  });

  gateway.transaction.void(transactionId, (err, result) => {
    if(result.success) {
      console.log("\n =========Void result object========= \n", result.statusHistory);
      void_result = JSON.stringify(result, null, 4);
      console.log(void_result);

      res.render('void', {
        id: transactionId,
        result: void_result
      });
    } else {
      console.log("Void Error: ", result.message)

      res.render('void', {
        id: transactionId,
        result: result.message
      });
    }
  });

  

});

module.exports = router;