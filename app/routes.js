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
     res.redirect('may-be-entitled');
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

  //
  // CLEAR DATA
  // 
  router.post(/clear-data/,function( req, res ){
    req.session.data = {};
    res.redirect('clear-data?success=true');
  });


  //
  // MEDICATION LIST
  //
  router.post(/check-medication/, function( req, res ){

    let medicationList = req.session.data.medicationList || '';
    let medicationChoice = req.session.data.medicationChoice || '';
    let medicationChoiceNotFound = req.session.data.medicationChoiceNotFound || '';

    if( !medicationChoice && medicationChoiceNotFound ){
        medicationChoice = medicationChoiceNotFound;
    }

    if( medicationChoice ){

      if( medicationList ){
        medicationList = medicationList.split('|');
        if( medicationList.indexOf( medicationChoice ) === -1 ){
          medicationList.push( medicationChoice );
        }
      } else {
        medicationList = [ medicationChoice ];
      }

      // Update and reset
      req.session.data.medicationList = medicationList.join('|');
      req.session.data.medicationChoice = '';

    }

    res.redirect('autocomplete');


  });


//
// DWP ADDRESS PATTERN SEARCH
//
  router.get(/dwp-address-pattern-search/, function (req, res) {

      // Prep the variables
      let addressSearchPostcode = req.session.data.addressSearchPostcode.split(' ').join('').toUpperCase();
      const addressSearchBuildingNumberOrName = req.session.data.addressSearchBuildingNumberOrName || '';
      const apiKey = process.env.POSTCODEAPIKEY;
      const regex = RegExp('^([A-PR-UWYZa-pr-uwyz](([0-9](([0-9]|[A-HJKSTUW])?)?)|([A-HK-Ya-hk-y][0-9]([0-9]|[ABEHMNPRVWXY])?)) ?[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2})$', 'i');
      addressSearchPostcode = ( regex.test(addressSearchPostcode) ) ? addressSearchPostcode : '';

      const updateResults = ( arr ) => {
        req.session.data.addressSearchResults = arr;
      };

      const toTitleCase = ( str ) => {
        return str.replace( /\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); } );
      }

      const formatAddress = ( address ) => {

        const formattedAddress = [];
        const addressParts = address.split(', ');
        addressParts.forEach( ( part, i ) => {
          if( i !== (addressParts.length - 1) ){
            formattedAddress.push( toTitleCase( part ) );
          } else {
            formattedAddress.push( part );
          }
        });

        return formattedAddress.join(', ');

      };

      let baseURL = '';

      if( addressSearchBuildingNumberOrName ){
        baseURL = 'https://api.os.uk/search/places/v1/find?query=' + encodeURI(addressSearchBuildingNumberOrName);
      }

      if( addressSearchPostcode ){
        baseURL = 'https://api.os.uk/search/places/v1/postcode?postcode=' + encodeURI(addressSearchPostcode);
      }

      // Make the call
      if( baseURL && apiKey ){

        let url = baseURL + '&key=' + apiKey;

        axios.get( url ).then( response => {

          let filteredResults = [];

          if( Array.isArray( response.data.results ) ){

            response.data.results.forEach(function(result){

              let resultPostcode = result.DPA.POSTCODE.split(' ').join('').toUpperCase();

              let obj = { 
                'text' : formatAddress( result.DPA.ADDRESS ),
                'value' : formatAddress( result.DPA.ADDRESS )
              };

              if( addressSearchPostcode ){

                if( addressSearchPostcode.indexOf(resultPostcode) === 0 ){

                  let bnon = addressSearchBuildingNumberOrName.toUpperCase();

                  // WE HAVE A POSTCODE
                  if( result.DPA.BUILDING_NAME ){

                    if( result.DPA.SUB_BUILDING_NAME ){
                      if( result.DPA.SUB_BUILDING_NAME.indexOf(bnon) > -1 ){
                        filteredResults.push(obj);
                      }
                    } else {
                      if( result.DPA.BUILDING_NAME.indexOf(bnon) > -1 ){
                        filteredResults.push(obj);
                      }
                    }
            
                  } else if( result.DPA.BUILDING_NUMBER ) {
                      if( result.DPA.BUILDING_NUMBER.indexOf(bnon) > -1 ){
                        filteredResults.push(obj);
                      }
                  }
                
                }

              } else {

                // WE DON'T HAVE A POSTCODE, ALLOW ANYTHING 
                filteredResults.push(obj);

             }

            });

          }

          updateResults( filteredResults );
          res.redirect('dwp-address-pattern-results');


        }).catch( (error) => { console.log( error ); });
      

    } else {

      updateResults([]);
      res.redirect('dwp-address-pattern?showErrors=true');

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
