// External dependencies
const express = require('express');

const router = express.Router();

// Add your routes here - above the module.exports line

router.get(/copy2021-handler/, function (req, res) {
    if (req.query.contact === "email")  {
     res.redirect('email');
   } else {
     res.redirect('check-your-answers');
   }
  });

  router.get(/continue-handler/, function (req, res) {
    if (req.query.continue === "yes")  {
     res.redirect('/v1/experimental/nhs-number');
   } else {
     res.redirect('/v1/experimental/user-journey/outside-england');
   }
  });

  router.get(/inside-england/, function (req, res) {
    if (req.query.country === "england")  {
     res.redirect('/v1/experimental/user-journey/nhs-number');
   } else {
     res.redirect('/v1/experimental/user-journey-unhappy/continue-warning');
   }
  });

  

  




module.exports = router;
