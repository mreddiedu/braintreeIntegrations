var express = require('express');
var router = express.Router();
const braintree = require("braintree");
var customer_id = null;
var customer_result = null;

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

    gateway.customer.create({
        //id: "customer_123", // specify customer ID
        firstName: "Jen",
        lastName: "Smith",
        company: "Braintree",
        email: "jen@example.com",
        phone: "312.555.1234",
        fax: "614.555.5678",
        website: "www.example.com"
      }, (err, result) => {
        result.success;
        // true
        customer_result = JSON.stringify(result, null, 4);
        console.log("==============Create Customer Result==============", customer_result); 
        result.customer.id;
        // e.g. 494019

        //render result
        res.render('create_customer', {
            id: result.customer.id,
            result: customer_result
        })

      });

      

/*
    gateway.customer.create({
        firstName: "Scribd",
        lastName: "Tester1",
        company: "Braintree",
        email: "jen@example.com",
        phone: "312.555.1234",
        fax: "614.555.5678",
        website: "www.example.com"
    }).then(result => {
        result.success;
        // true
        customer_result = JSON.stringify(result, null, 4);
        customer_id = result.customer.id;
        // e.g. 494019
    }).then( () => {
        res.render('create_customer', {
            id: customer_id,
            result: customer_result
        })
    });
    */

});

module.exports = router;