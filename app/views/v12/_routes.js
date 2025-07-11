// External dependencies
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post(/is-medicine-covered-3-radios-new/, function( req, res ){
  req.session.data = {};
  res.redirect('is-medicine-covered-3-radios');
});

router.post(/name-new/, function( req, res ){
  const redirect = ( req.session.data.returnToCYA === 'true' ) ? 'check-your-answers?returnToCYA=false' : 'postcode';
  res.redirect( redirect );
});

router.post(/get-certificate-by-email-new/, function( req, res ){
  const extra = ( req.session.data.certificateByEmailOrPost === 'no' ) ? '-print' : '';
  const redirect = ( req.session.data.returnToCYA === 'true' ) ? 'check-your-answers'+extra+'?returnToCYA=false' : 'check-your-answers'+extra;
  res.redirect( redirect );
});

//
// MEDICATION LIST
//
router.get(/check-medicine-list/, function( req, res ){

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

  res.redirect( 'autocomplete' );

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

module.exports = router;