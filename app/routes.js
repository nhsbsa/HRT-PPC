// External dependencies
const express = require('express');
const router = express.Router();

const axios = require('axios');

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

  router.get(/medicine-handler/, function (req, res) {
    if (req.query.continue === "yes")  {
     res.redirect('filter-other-prescription');
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

  router.get(/get-a-ppc-instead/, function (req, res) {
    if (req.query.continue === "yes")  {
     res.redirect('filter-ppc');
   } else {
     res.redirect('where-you-collect');
   }
  });



  router.get(/dwp-address-pattern-search/, function (req, res) {

      // Clear the storage variable
      req.session.data.addressSearchResults = [];

      // Prep the variables
      let addressSearchPostcode = req.session.data.addressSearchPostcode;
      let addressSearchBuildingNumberOrName = req.session.data.addressSearchBuildingNumberOrName || '';
      let apiKey = process.env.POSTCODEAPIKEY;

      const regex = RegExp('^([A-PR-UWYZa-pr-uwyz](([0-9](([0-9]|[A-HJKSTUW])?)?)|([A-HK-Ya-hk-y][0-9]([0-9]|[ABEHMNPRVWXY])?)) ?[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2})$', 'i');

      if( !regex.test(addressSearchPostcode) ){
          addressSearchPostcode = '';
      }

      let query = '';

      if( addressSearchBuildingNumberOrName ){
        query = addressSearchBuildingNumberOrName;
      }

      if( addressSearchPostcode ){
        query = ( query ) ? query + ', ' + addressSearchPostcode : addressSearchPostcode;
      }

      // Make the call
      if( query && apiKey ){

        query = encodeURI(query);

        let url = 'https://api.os.uk/search/places/v1/find?query=' + query + '&key=' + apiKey;

        console.log( url );

        req.session.data.testVar = process.env.TEST_VAR + '!!!';

        axios.get( url )
                .then(response => {

                    req.session.data.addressSearchResults = JSON.stringify(response);

                    /*
                    // Extract and map the addresses from the API response
                    var anotherAddresses = response.data.results.map(result => result.DPA.ADDRESS);

                    // Format the addresses in title case
                    const titleCaseAddresses = anotherAddresses.map(anotherAddress => {
                        const parts = anotherAddress.split(', ');
                        const formattedParts = parts.map((part, index) => {
                            if (index === parts.length - 1) {
                                // Preserve postcode (SW1A 2AA) in uppercase
                                return part.toUpperCase();
                            }
                            return part
                                .split(' ')
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                .join(' ');
                        });
                        return formattedParts.join(', ');
                    });

                    // Store the formatted addresses in the session data
                    req.session.data.addressSearchResults = titleCaseAddresses;
                    */

                })
                .catch(error => {
                    // Error
                    req.session.data.addressSearchError = error;
                });

      }

      res.redirect('dwp-address-pattern-results');

  });

  //router.get(/choose-ppc/, function (req, res) {
  //if (req.query.cert === "ppc")  {
    //res.redirect('https://services.nhsbsa.nhs.uk/buy-prescription-prepayment-certificate/start');
  //} else if (req.query.cert === "hrt-ppc")  { 
    //res.redirect('/v1/experimental/user-journey/start');
  //}
 //});
 


module.exports = router;
