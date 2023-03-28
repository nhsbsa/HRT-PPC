// External dependencies
const express = require('express');

const router = express.Router();

// Add your routes here - above the module.exports line

router.get(/copy2021-handler/, function (req, res) {
    if (req.query.contact === "email")  {
     res.redirect('email');
   } else {
     res.redirect('/v1/experimental/check-your-answers-post');
   }
  });

  router.get(/continue-handler/, function (req, res) {
    if (req.query.continue === "yes")  {
     res.redirect('/v2/dob');
   } else {
     res.redirect('/v1/experimental/user-journey/outside-england');
   }
  });

  router.get(/continue-postcode/, function (req, res) {
    if (req.query.continue === "yes")  {
     res.redirect('/v2/dob');
   } else {
     res.redirect('/v2/outside-england');
   }
  });

  router.get(/continue-v1/, function (req, res) {
    if (req.query.continue === "yes")  {
     res.redirect('dob');
   } else {
     res.redirect('outside-england');
   }
  });

  router.get(/continue-v3/, function (req, res) {
    if (req.query.continue === "yes")  {
     res.redirect('where-you-collect');
   } else {
     res.redirect('chosen-not-to-buy');
   }
  });
  router.get(/address-continue/, function (req, res) {
    if (req.query.continue === "yes")  {
     res.redirect('dob');
   } else {
     res.redirect('chosen-not-to-buy');
   }
  });

  router.get(/inside-england/, function (req, res) {
    if (req.query.country === "england")  {
     res.redirect('/v2/dob?');
   } else {
     res.redirect('/v1/experimental/user-journey-unhappy/continue-warning');
   }
  });

  router.get(/postcode-handler/, function (req, res) {
    if (req.query.location === "england")  {
     res.redirect('/v2/dob');
   } else {
     res.redirect('/v2/continue-warning');
  }
  });

  router.get(/postcode-v1/, function (req, res) {
    if (req.query.location === "england")  {
     res.redirect('dob');
   } else {
     res.redirect('continue-warning');
  }
  });
  router.get(/postcode-v3/, function (req, res) {
    if (req.query.location === "england")  {
     res.redirect('dob');
   } else {
     res.redirect('do-you-want-to-continue');
  }
  });

  router.get(/ppc-handler/, function (req, res) {
    if (req.query.certificate === "ppc")  {
     res.redirect('https://services.nhsbsa.nhs.uk/buy-prescription-prepayment-certificate/start');
   } else {
     res.redirect('/v2/start')
   }
  });

  router.get(/ppc-v2/, function (req, res) {
    if (req.query.certificate === "ppc")  {
     res.redirect('https://services.nhsbsa.nhs.uk/buy-prescription-prepayment-certificate/start');
   } else {
     res.redirect('start')
   }
  });
  router.get(/ppc-v3/, function (req, res) {
    if (req.query.certificate === "ppc")  {
     res.redirect('https://services.nhsbsa.nhs.uk/buy-prescription-prepayment-certificate/start');
   } else {
     res.redirect('start')
   }
  });

  router.get(/copy-handler/, function (req, res) {
    if (req.query.contact === "email")  {
     res.redirect('email');
   } else {
     res.redirect('check-your-answers-post');
   }
  });

  router.get(/handler-email/, function (req, res) {
    if (req.query.contact === "email")  {
     res.redirect('check-your-answers');
   } else {
     res.redirect('check-your-answers-print');
   }
  });

  router.get(/copy-email/, function (req, res) {
    if (req.query.contact === "email")  {
     res.redirect('check-your-answers');
   } else {
     res.redirect('check-your-answers-post');
   }
  });


  //router.get(/medicine-covered/, function (req, res) {
    //if (req.query.contact === "medicine")  {
     //res.redirect('where-you-collect');
   //} else {
    // res.redirect('email');
   //}
  //});


  router.get(/medicine-continue/, function (req, res) {
    if (req.query.continue === "yes")  {
     res.redirect('where-you-collect');
   } else {
     res.redirect('medicine-not-covered');
   }
  });

  router.get(/handler-2/, function (req, res) {
    if (req.query.continue === "yes")  {
     res.redirect('where-you-collect');
   } else {
     res.redirect('medicine-not-covered-2');
   }
  });

  router.get(/some-medicine-handler/, function (req, res) {
    if (req.query.continue === "yes")  {
     res.redirect('where-you-collect');
   } else if (req.query.continue === "no") {
     res.redirect('medicine-not-covered-2');
   }else if (req.query.continue === "some") {
    res.redirect('some-medicine-covered');
  }
  });




  router.post('/v9/checkbox', (req, res) => {

    // This creates an array of the values checked from the checkbox options
    const contact = req.session.data['contact'];
  
    if (contact == 'hrt') {
      res.redirect('hrt-needed'); // Send user to email result
    } else if (contact == 'all') {
      res.redirect('all-needed'); // Send user to phone result
    } else if (contact.includes('hrt', 'all')) {
      res.redirect('both-needed'); // All items are checked
    } 
  });



  

  router.get(/ppc-or-hrt/, function (req, res) {
    if (req.query.example === "yes")  {
     res.redirect('hrt-needed');
   } else {
     res.redirect('all-needed');
   }
  });


  router.get(/prescription-number/, function (req, res) {
    if (req.query.prescriptions === "1")  {
     res.redirect('one');
   } else if (req.query.prescriptions === "2") {
     res.redirect('two');
   }else if (req.query.prescriptions === "3") {
    res.redirect('three');
  }else if (req.query.prescriptions === "4") {
    res.redirect('four');
  }
  });
 

  router.get(/different-exemption/, function (req, res) {
    if (req.query.exemption === "no")  {
     res.redirect('cannot-confirm-entitlement');
   } else {
     res.redirect('check-personal-details');
   }
  });

  //router.get(/choose-ppc/, function (req, res) {
  //if (req.query.cert === "ppc")  {
    //res.redirect('https://services.nhsbsa.nhs.uk/buy-prescription-prepayment-certificate/start');
  //} else if (req.query.cert === "hrt-ppc")  { 
    //res.redirect('/v1/experimental/user-journey/start');
  //}
 //});
 


module.exports = router;
