//Original Code source: https://developers.braintreepayments.com/start/tutorial-hosted-fields-node#add-the-route-code-to-routes/checkout.js

var express = require('express');
var router = express.Router();
var braintree = require('braintree');

router.post('/', function (req, res, next) {

  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: 'mzwf7bv4zc2bjccb',
    publicKey: 'kc2qfb4zt7g86s57',
    privateKey: '9632cee15f46df181b4042f743682f18'
  });

  var nonceFromTheClient = req.body.paymentMethodNonce;
  var deviceDataFromTheClient = req.body.deviceData;

  gateway.customer.find("scribd_01", function (err, customer) {
    if (!err) {
      console.log("\n ==========Create Customer from nonce======== \n", JSON.stringify(customer, null, 4), "\n");
    } else {
      console.error(err);
    }
  });

  gateway.paymentMethod.create({
    customerId: "scribd_01",
    paymentMethodNonce: nonceFromTheClient,
    token: "gtrqbyw",
    options: {
      verifyCard: true
    }
  }, (err, result) => {
    console.log("\n ==========Payment Method Create======== \n", JSON.stringify(result, null, 4), "\n");
   });


  /*
    gateway.paymentMethod.update("gtrqbyw", {
      paymentMethodNonce: nonceFromTheClient,
      billingAddress: {
        streetAddress: "1 E Main St",
        extendedAddress: "Suite 3",
        locality: "Los Angelos",
        region: "CA"
      },
      options: {
        verifyCard: true
      }
    }, (err, result) => {
      console.log("\n ==========Updating Payment Method from nonce======== \n", JSON.stringify(result, null, 4), "\n");
    });
    */

  /*
  gateway.customer.create({
    firstName: "Scribd",
    lastName: "Tester1",
    company: "Braintree",
    email: "jen@example.com",
    phone: "312.555.1234",
    fax: "614.555.5678",
    website: "www.example.com",
    paymentMethodNonce: nonceFromTheClient,
    creditCard: {
      options: {
        verifyCard: true
      }
    }
  }, (err, result) => {
    console.log("\n ==========Creating Customer Begins======== \n");
    console.log("nonceFromTheClient: ", nonceFromTheClient);
    result.success;
    // true
    console.log(JSON.stringify(result, null, 4));
    customer_result = result;
    customer_id = result.customer.id;
    // e.g. 494019
  });
  */

  /*
  //Testing Webhooks
  sampleNotification = gateway.webhookTesting.sampleNotification(
    braintree.WebhookNotification.Kind.GrantedPaymentMethodRevoked,
    "myId001"
  );
  gateway.webhookNotification.parse(
    sampleNotification.bt_signature,
    sampleNotification.bt_payload,
    (err, webhookNotification) => {
      console.log("[Webhook Received " + webhookNotification.timestamp + "] | Kind: " + webhookNotification.kind); // Sun Jan 1 00:00:00 UTC 2012

      // Example values for webhook notification properties
      console.log(webhookNotification.revokedPaymentMethodMetadata); // Sun Jan 1 00:00:00 UTC 2012
      // "myId"
    }
  );
  */

  /*
    gateway.paymentMethod.create({
      customerId: "239023690",
      paymentMethodNonce: nonceFromTheClient
    }, (err, result) => { 
      console.log("\n ==========Create Customer from nonce======== \n", JSON.stringify(result, null, 4), "\n");
    });
  */


  /*
    gateway.transaction.find("m5t8r6vt", (err, transaction) => {
      console.log("\n ==========Find Transaction Begins======== \n");
      transaction.statusHistory.forEach((event) => {
        console.log(event.amount);
        console.log(event.status);
        console.log(event.timestamp);
        console.log(event.transactionSource);
        console.log(event.user);
      });
      console.log("\n ==========Find Transaction Ends======== \n");
    });
    */

  /*
  gateway.paymentMethod.revoke(
    "bmmsjcr",
    (err, result) => {
      if(result) {
        console.log("\n ==========Payment Method Revoke Sucess======== \n", JSON.stringify(result, null, 4), "\n");
      } else {
        console.log("\n ==========Payment Method Revoke Failed======== \n", JSON.stringify(err, null, 4), "\n");
      }
      
    }
   );
  */

  /*
    gateway.transaction.sale({
      amount: "1000.00",
      paymentMethodToken: "bmmsjcr",
      options: {
        submitForSettlement: true,
      },
      deviceData: req.body.device_data
    }, function(err, result) { 

    });
    */


  //ACH
  /*
  gateway.paymentMethod.create({
    customerId: "123",
    paymentMethodNonce: nonceFromTheClient,
    options: {
      usBankAccountVerificationMethod: braintree.UsBankAccountVerification.VerificationMethod.NetworkCheck  // or MicroTransfers or IndependentCheck
    }
  }, function (err, result) {
    console.log("Check for successful verification....")
    if(err) {
      console.log("ACH Vaulting the payment method error: ", err);
    }
    if (result.success) {
     
      const usBankAccount = result.paymentMethod;
      const verified = usBankAccount.verified;
      const responseCode = usBankAccount.verifications[0].processorResponseCode;
      const paymentMethodToken = usBankAccount.token;

      console.log("ACH Bank verification Status: ", verified, '\n', "responseCode: ", responseCode, '\n', "paymentMethodToken: ", paymentMethodToken);
      
      //Create transaction from payment method tokens
      gateway.transaction.sale({
        amount: "10.00",
        paymentMethodToken: paymentMethodToken,
        deviceData: deviceDataFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
        if (result.success) {
          // See result.transaction for details
          console.log("Sale transaction id: ", result.transaction.id, '\n', "Processor Response: ", result.transaction.processorResponseText);
          console.log("\n =========Braintree result object========= \n", result.statusHistory);
          var arr = result.statusHistory;
            console.log(JSON.stringify(arr, null, 4));
 
          console.log("=========END=========");
        } else {
          // Handle errors
        }
      
      
      
      });
    }
    
  }); */



  // //To create subscription
  // var i, planID_HOLDER;

  // for (i = 1; i < 30; i++) {
  //   if(i == 5 || i == 15 || i == 20 || i == 25) {
  //     planID_HOLDER = "recurring_billing_plan_" + i;
  //     console.log(planID_HOLDER + "Created");
  //     gateway.subscription.create({
  //       paymentMethodToken: "m85ww9g",
  //       planId: planID_HOLDER
  //     }, (err, result) => {
  //       if (result) {
  //         console.log("subcription:");
  //         res.send(result);
  //       } else {
  //         res.status(500).send(error);
  //       }
  //     }); 
  //   }
  // }

  // Use the payment method nonce here


  // Create a new transaction 


  /*
  var newTransaction = gateway.transaction.sale({
    //merchantAccountId: 'digitalcashwanderlandINR', //specify merchantAccountId for presentment currencies. 
    amount: '111.00',
    taxAmount: '10.00',
    // lineItems: {
    //   // kind: 'credit',
    //   // name: 'test_transaction',
    //   // quantity: '1.00',
    //   // taxAmount: '10.00', 
    //   // totalAmount: '110.00',
    //   // unitAmount: '100.00'
    // },
    paymentMethodNonce: nonceFromTheClient,
    // "customer": {
    //   "id": "a_customer_id"
    // },
    customFields: {
      line_of_business: "Citation"
    },
    purchaseOrderNumber: '1234567890',
    options: {
      //storeInVaultOnSuccess: true,
      // This option requests the funds from the transaction
      // once it has been authorized successfully
      submitForSettlement: true
    }
  }, function (error, result) {

    // true

    if (result) {
      console.log("\n =========Braintree Transaction.Sale Result Object========= \n", JSON.stringify(result, null, 4));
      console.log('gateway.transaction.sale API call for nonce: ' + nonceFromTheClient + ' is completed');
      res.send(result);
    } else {
      res.status(500).send(error);
    }
  });*/
});

module.exports = router;