var express = require('express');
var router = express.Router();
var braintree = require('braintree');

var customerID = '109961427'; //specify customerID here

router.get('/', function (req, res, next) {

  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: 'mzwf7bv4zc2bjccb',
    publicKey: 'kc2qfb4zt7g86s57',
    privateKey: '9632cee15f46df181b4042f743682f18'
  });


  gateway.customer.find(customerID, function (err, customer) {
    if (!err) {
      console.log("\n ==========Find Customer======== \n", JSON.stringify(customer, null, 4), "\n");
    } else {
      console.error("Customer Find Error: ", err);
    }

    res.render('responseTemplate', {
      serverApiRequest: 'Customer Find',
      id: customerID,
      result: !err == true ? JSON.stringify(customer, null, 4) : err
    });
  });

});

module.exports = router;