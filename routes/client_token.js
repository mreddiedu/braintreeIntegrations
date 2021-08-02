var express = require('express');
var router = express.Router();
const braintree = require("braintree");
var clientToken = null;

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "mzwf7bv4zc2bjccb",
    publicKey: "kc2qfb4zt7g86s57",
    privateKey: "9632cee15f46df181b4042f743682f18"
});

gateway.clientToken.generate({}, (err, response) => {
    clientToken = response.clientToken
});

router.get('/', function (req, res, next) {
    res.send(clientToken);
});

module.exports = router;