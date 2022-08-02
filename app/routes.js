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
     res.redirect('/v2/start');
   } else {
     res.redirect('/v2/outside-england');
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

  router.get(/ppc-handler/, function (req, res) {
    if (req.query.certificate === "ppc")  {
     res.redirect('https://services.nhsbsa.nhs.uk/buy-prescription-prepayment-certificate/start');
   } else {
     res.redirect('/v2/start')
   }
  });

  router.get(/copy-handler/, function (req, res) {
    if (req.query.contact === "email")  {
     res.redirect('email');
   } else {
     res.redirect('check-your-answers-post');
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
