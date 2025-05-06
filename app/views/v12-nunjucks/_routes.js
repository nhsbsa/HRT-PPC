// External dependencies
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post(/start-redirect/, function (req, res) {
  req.session.data = {};
  res.redirect('is-your-medicine-covered');
});

router.post(/is-your-medicine-covered/, function (req, res) {

    let redirect = 'other-prescription-items';

    switch( req.session.data.medicinesCovered ){
        case 'no':
            redirect = 'medicine-not-covered';
            break;

        case 'some':
            redirect = 'some-medicines-covered';
            break;
    }

    res.redirect(redirect);

});

router.post([/some-medicines-covered/,/filter-ppc/], function( req, res ){
    let redirect = ( req.session.data.stillBuyHRTPPC === 'yes' ) ? 'where-you-collect' : 'chosen-not-to-buy';
    res.redirect( redirect );
});

router.post(/other-prescription-items/, function( req, res ){
    let redirect = ( req.session.data.otherPrescriptionItems === 'yes' ) ? 'filter-ppc' : 'where-you-collect';
    res.redirect( redirect );
});

router.post(/where-you-collect/, function( req, res ){
    let redirect = ( req.session.data.country !== 'england' ) ? 'may-be-entitled' : 'date-of-birth';
    res.redirect( redirect );
});

router.post(/may-be-entitled/, function( req, res ){
    let redirect = ( req.session.data.reallyStillBuyHRTPPC === 'yes' ) ? 'date-of-birth' : 'chosen-not-to-buy';
    res.redirect( redirect );
});

router.post(/date-of-birth/, function( req, res ){
  let redirect = ( req.session.data.returnToCYA === 'true' ) ? 'check-your-answers?returnToCYA=false' : 'name';
  res.redirect( redirect );
});

router.post(/name/, function( req, res ){
  let redirect = ( req.session.data.returnToCYA === 'true' ) ? 'check-your-answers?returnToCYA=false' : 'select/postcode';
  req.session.data.showErrors = false;
  res.redirect( redirect );
});

router.get(/postcode-select-handler/, function( req, res ){
    
    if( !req.session.data.postcode ){
        res.redirect('postcode?showErrors=true');
    } else {
        req.session.data.showErrors = 'false';
    }

    // Prep the variables
    const selectedAddress = ( req.session.data.address ) ? req.session.data.address : '';
    const apiKey = process.env.POSTCODEAPIKEY;
    const regex = RegExp('^([A-PR-UWYZa-pr-uwyz](([0-9](([0-9]|[A-HJKSTUW])?)?)|([A-HK-Ya-hk-y][0-9]([0-9]|[ABEHMNPRVWXY])?)) ?[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2})$', 'i');

    let addressSearchPostcode = req.session.data.postcode.split(' ').join('').toUpperCase();
    addressSearchPostcode = ( regex.test(addressSearchPostcode) ) ? addressSearchPostcode : '';

    const _updateResultsAndRedirect = ( arr ) => {

      ['address','addressLine1','addressLine2','addressTown','addressCounty','addressPostcode'].forEach(function( part ){
         delete req.session.data[part];
      });
      
      req.session.data.addressSearchResults = arr;
      res.redirect('postcode-address');

    };

    const _toTitleCase = ( str ) => {
      return str.replace( /\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); } );
    }

    const _formatAddress = ( address ) => {

      address = (address) ? address : '';

      const formattedAddress = [];
      const addressParts = address.split(', ');
      addressParts.forEach( ( part, i ) => {
        if( i !== (addressParts.length - 1) ){
          formattedAddress.push( _toTitleCase( part ) );
        } else {
          formattedAddress.push( part );
        }
      });

      return formattedAddress.join(', ');

    };

    let baseURL = 'https://api.os.uk/search/places/v1/postcode?postcode=' + encodeURI(addressSearchPostcode);

    console.log( 'POSTCODE: ' + addressSearchPostcode );
    console.log( 'APIKEY: ' + process.env.POSTCODEAPIKEY );
    console.log( 'BASE URL: ' + baseURL );

    // Make the call
    if( baseURL && apiKey ){

      let url = baseURL + '&key=' + apiKey;

      axios.get( url ).then( response => {

        let filteredResults = [];

        if( Array.isArray( response.data.results ) ){

          response.data.results.forEach(function(result){

            let resultPostcode = result.DPA.POSTCODE.split(' ').join('').toUpperCase();

            let obj = { 
              'text' : _formatAddress( result.DPA.ADDRESS ),
              'value' : _formatAddress( result.DPA.ADDRESS )
            };

            if( obj.text === selectedAddress ){
                obj.selected = true;
            }

            filteredResults.push(obj);
        

          });

        }

    
        _updateResultsAndRedirect( filteredResults );

      }).catch( (error) => { console.log( error ); });
    

  } else {

    _updateResultsAndRedirect([]);

  }

});

router.post(/select\/postcode-address/, function( req, res ){
  let redirect = ( req.session.data.returnToCYA === 'true' ) ? '../check-your-answers?returnToCYA=false' : '../nhs-number';
  res.redirect( redirect );
});

router.post(/manual-address/, function( req, res ){
    
  req.session.data.addressMethod = 'manual';
  
  // Clear select address method
  delete req.session.data.addressSearchResults
  delete req.session.data.postcode;

  // Concatenate the address as typed out...
  const addressParts = ['addressLine1','addressLine2','addressTown','addressCounty','addressPostcode'];
  const address = [];

  addressParts.forEach(function( part ){
    if ( req.session.data[part] && req.session.data[part].trim() ){
      address.push( req.session.data[part] );
    }
  });

  req.session.data.address = address.join(', ');
  
  let redirect = ( req.session.data.returnToCYA === 'true' ) ? 'check-your-answers?returnToCYA=false' : 'nhs-number';
  res.redirect( redirect );

});

router.post(/nhs-number/, function( req, res ){
  let redirect = ( req.session.data.returnToCYA === 'true' ) ? 'check-your-answers?returnToCYA=false' : 'your-start-date';
  res.redirect( redirect );
});

router.post(/your-start-date/, function( req, res ){
  let redirect = ( req.session.data.returnToCYA === 'true' ) ? 'check-your-answers?returnToCYA=false' : 'get-certificate-by-email';
  res.redirect( redirect );
});

router.post(/get-certificate-by-email/, function (req, res) {
  res.redirect('check-your-answers');
});

router.post(/check-your-answers/, function (req, res) {
  res.redirect('payment');
});

module.exports = router;
