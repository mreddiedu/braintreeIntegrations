var express = require('express');
var router = express.Router();
var braintree = require('braintree');

var customerID = '109961427'; //specify transactionId here
var customerSearchResult = [];

router.get('/', function (req, res, next) {

  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: 'mzwf7bv4zc2bjccb',
    publicKey: 'kc2qfb4zt7g86s57',
    privateKey: '9632cee15f46df181b4042f743682f18'
  });

  var nonceFromTheClient = req.body.paymentMethodNonce;

  const stream = gateway.customer.search((search) => {
    search.id().is(customerID);
  }, (err, response) => {
    response.each((err, customer) => {
      var obj = JSON.stringify(customer, null, 4);
      customerSearchResult.push(obj);
      
      console.log("\n ==========Search Customer======== \n", JSON.stringify(customer, null, 4), "\n");
    });
  });

  res.render('responseTemplate', {
    serverApiRequest: 'Customer Search',
    id: customerID,
    result: customerSearchResult
  });
});

module.exports = router;