module.exports = function (env) { /* eslint-disable-line no-unused-vars */
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  const filters = {};

  //
  // PROCESS FULL NAME FILTER
  //
  filters.processFullName = function( monthOffset ){
  
    const firstName = ( this.ctx.data.firstName ) ? this.ctx.data.firstName.trim() : 'Jane';
    const lastName = ( this.ctx.data.lastName ) ? this.ctx.data.lastName.trim() : 'Smith';

    return firstName + ' ' + lastName;
    
  };

  //
  // PROCESS DATE FILTER
  //
  filters.processDate = function( date, daysOffset ){

    daysOffset = ( !Number.isNaN( parseInt( daysOffset ) ) ) ? parseInt( daysOffset ) : 0;

    let today = new Date();

    if( date && date.day && date.month && date.year ){
      today = new Date( parseInt(date.year), parseInt(date.month) - 1, parseInt(date.day) );
      if( Number.isNaN( today.getTime() ) ){
        today = new Date();
      }
    }

    today.setDate(today.getDate() + daysOffset);

    return today.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

  };

  //
  // PROCESS ADDRESS FILTER
  //
  filters.processAddress = function(){

    let address = ( this.ctx.data.address ) ? this.ctx.data.address : '152 Pilgrim Street, Newcastle Upon Tyne, NE1 6SN';
    return address.split(', ').join('<br />');

  };

  //
  // GENERATE A TO Z TABS FILTER
  //
  filters.generateAToZTabs = function(){

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const items = [];

    letters.forEach( function( letter ){

      const obj = {};

      obj.label = letter;
      obj.id = letter;
      obj.panel = {
        html : 'Content for letter ' + letter
      }

      items.push( obj );


    });

    return items;

  }

  //
  // GENERATE MEDICATION LIST A TO Z FILTER
  // This code doesn't sort alphabetically, you'll have to do that yourself in the Excel spreadsheet
  //
  filters.generateMedicationListAToZ = function( medications, type ){

    medications = ( Array.isArray( medications ) ) ? medications : [];
    type = ( ['standard','single' ].indexOf(type) > -1 ) ? type : 'standard';

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const aToZ = this.ctx.data.aToZ;

    let html = '';

    // Generate A-Z list
    html += '<nav class="nhsuk-u-margin-bottom-4 nhsuk-u-margin-top-4" id="nhsuk-nav-a-z" role="navigation" aria-label="A to Z Navigation">';
    html += '<ol class="nhsuk-list nhsuk-u-clear nhsuk-u-margin-0" role="list">';

    letters.forEach(function( letter ){

        const href = ( type === 'single' ) ? '?aToZ=' + letter + '&aToZOpen=true#nhsuk-nav-a-z' : '#' + letter;
        const selected = ( type === 'single' && aToZ === letter ) ? ' selected' : '';

        html += '<li class="nhsuk-u-margin-bottom-0 nhsuk-u-float-left nhsuk-u-margin-right-1">';
        html += '<a class="nhsuk-u-font-size-22 nhsuk-u-padding-2 nhsuk-u-display-block' + selected + '" href="' + href + '">' + letter + '</a>';
        html += '</li>';

    });

    html += '</ol>';
    html += '</nav>';

    // Generate cards
    letters.forEach(function( letter ){

      if( type === 'standard' || aToZ === 'all' || aToZ === letter ){

        // Card
        html += '<div class="nhsuk-card nhsuk-card--feature" id="'+letter+'">';
        html += '<div class="nhsuk-card__content nhsuk-card__content--feature">';
        html += '<h2 class="nhsuk-card__heading nhsuk-card__heading--feature nhsuk-u-font-size-24">'+letter+'</h2>';

        const items = [];
        medications.forEach(function( medication ){
          if( medication.text.charAt(0).toLowerCase() === letter.toLowerCase() ){
            const extras = ( medication.attributes && medication.attributes['data-extra'] ) ? medication.attributes['data-extra'] : '';
            if( medication.text !== 'Please select' ){
              let innerHTML = '<tr><td>'+medication.text+'</td>';
              if( extras ){
                if( type === 'single' ){
                  innerHTML += '<td><p class="nhsuk-body-s nhsuk-u-margin-bottom-0">'+extras.substring(6)+'</p></td>';
                } else {
                  innerHTML += '<td>'+extras.substring(6)+'</td>';
                }
              }
              innerHTML += '</tr>';
              innerHTML = innerHTML.split('<span class="nhsuk-body-s">').join('').split('</span>').join('').split('<br />').join('<br /><br />');

              items.push( innerHTML );
            }
          }
        });

        if( items.length === 0 ){
          html += '<ul class="nhsuk-list nhsuk-list--border"><li>There are currently no HRT medicines covered</li></ul>';
        } else {
          html += '<table class="nhsuk-table">';
          html += '<thead role="rowgroup" class="nhsuk-table__head"><tr role="row"><th role="columnheader" class="" scope="col">Product name</th><th role="columnheader" class="" scope="col">Generic drug name</th></tr></thead>';
          html += '<tbody>';
          html += items.join('');
          html += '</tbody>';
          html += '</table>';
        }

      
        html += '</div>';
        html += '</div>';

        
        
        if( type === 'single' && aToZ !== 'all' ){
          
          // Show all medicines
          html += '<div class="nhsuk-back-to-top">';
          html += '<a class="nhsuk-back-to-top__link" href="?aToZ=all&aToZOpen=true#nhsuk-nav-a-z">Show all medicines</a>';
          html += '</div>';

        } else {

          // Back to top
          html += '<div class="nhsuk-back-to-top">';
          html += '<a class="nhsuk-back-to-top__link" href="#nhsuk-nav-a-z">Back to top</a>';
          html += '</div>';
          
        }
        

      }
  
    });

    return html;

  }


  //
  // GENERATE MEDICATION LIST ROWS FILTER
  //
  filters.generateMedicationListRows = function( medicationList ){

    const rows = [];

    let medications = this.ctx.data.medications;

    const noOfMedications = medications.length;

    medicationList = medicationList.split('|');
    medicationList.forEach(function( medication ){

      const arr = [];
      arr.push( { 'text': medication } );

      let tag = '<strong class="nhsuk-tag nhsuk-tag--red">Not covered</strong>';

      for( let i = 0; i < noOfMedications; i++ ){
        if( medications[i].text === medication ){

          tag = '<strong class="nhsuk-tag nhsuk-tag--green">Covered</strong>';
          if( medications[i].attributes ){
            arr.push( { 'html' : medications[i].attributes['data-extra'].substr(6) } );
          }
          
        }
        
      }

      if( arr.length === 1 ){
        arr.push( { 'text': '' } );
      }

      arr.push( { 'html': tag} );

      rows.push( arr );

    });

    return rows;

  };

  //
  // ALTER DATE BY NUMBER OF MONTHS FILTER
  //
  filters.alterTodaysDateByNumberOfMonths = function( monthOffset ){

    let today = new Date();
    var d = today.getDate();
    today.setMonth(today.getMonth() + monthOffset);
    if (today.getDate() !== d) {
      today.setDate(0);
    }

    return today.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

  };

  //
  // ALTER DATE BY NUMBER OF DAYS FILTER
  //
  filters.alterTodaysDateByNumberOfDays = function( dayOffset ){

    let today = new Date();
    today.setDate(today.getDate() + dayOffset);

    // Manually format the date to avoid leading zeros (day, month, year)
    return [ today.getDate(), today.getMonth() + 1, today.getFullYear()].join(' '); 

  };

  //
  // DWP ADDRESS PATTERN GET RESULTS STATUS FILTER
  //
  filters.dwpAddressPatternGetResultsStatus = function( results, postcode, buildingNumberOrName ){

    let html = '';

    postcode = ( postcode ) ? postcode.trim() : '';
    buildingNumberOrName = ( buildingNumberOrName ) ? buildingNumberOrName.trim() : '';

    const finalSentence = 'You can <a class="nhsuk-link" href="dwp-address-pattern">search again</a> or <a class="nhsuk-link" href="dwp-address-pattern-manual">enter the address manually</a>.';
    const finalLink = '<a class="nhsuk-link" href="dwp-address-pattern">Search again</a>';

    if( !Array.isArray(results) || results.length === 0  ){

      // No results
      if( postcode ){
        html = '<p class="nhsuk-body">We could not find an address that matches <strong>' + postcode + '</strong>';
        if( buildingNumberOrName ){
          html += ' and <strong>' + buildingNumberOrName + '</strong>';
        }
        html += '. ' + finalSentence + '</p>';
      } else {
        html = '<p class="nhsuk-body">We could not find an address that matches <strong>' + buildingNumberOrName + '</strong>. ' + finalSentence + '</p>';
      }      

    } else if( Array.isArray(results) && results.length > 0 ) {

      // More than one result
      const noOfResults = ( results.length === 1 ) ? '<strong>1</strong> result' : '<strong>'+results.length+'</strong> results';

      if( postcode ){
        html = '<p class="nhsuk-body">' + noOfResults + ' found for <strong>' + postcode + '</strong>';
        if( buildingNumberOrName ){
          html += ' and <strong>' + buildingNumberOrName + '</strong>';
        }
        html += '. ' + finalLink + '</p>';
      } else {
        html = '<p class="nhsuk-body">' + noOfResults + ' found for <strong>' + buildingNumberOrName + '</strong>. ' + finalLink + '</p>'
      } 

    }


    return html;

  };


  //
  // DWP ADDRESS PATTERN GET RESULTS STATUS FILTER
  //
  filters.getResultsStatus = function( results, postcode, buildingNumberOrName ){

    let html = '';

    postcode = (postcode) ? postcode.trim() : '';
    buildingNumberOrName = (buildingNumberOrName) ? buildingNumberOrName.trim() : '';

    const finalSentence = 'You can search again or enter the address manually.';
    const finalLink = '<a class="nhsuk-link" href="postcode">Search again</a>';

    if( !Array.isArray(results) || results.length === 0  ){

      // No results
      if( postcode ){
        html = '<p class="nhsuk-body">We could not find an address that matches <strong>' + postcode + '</strong>';
        if( buildingNumberOrName ){
          html += ' and <strong>' + buildingNumberOrName + '</strong>';
        }
        html += '. ' + finalSentence + '</p>';
      } else if( buildingNumberOrName ) {
        html = '<p class="nhsuk-body">We could not find an address that matches <strong>' + buildingNumberOrName + '</strong>. ' + finalSentence + '</p>';
      } else {
        html = '<p class="nhsuk-body">We could not find an address. ' + finalSentence + '</p>';
      }

    } else if( Array.isArray(results) && results.length > 0 ) {

      // More than one result
      const noOfResults = ( results.length === 1 ) ? '<strong>1</strong> result' : '<strong>'+results.length+'</strong> results';

      if( postcode ){
        html = '<p class="nhsuk-body">' + noOfResults + ' found for <strong>' + postcode + '</strong>';
        if( buildingNumberOrName ){
          html += ' and <strong>' + buildingNumberOrName + '</strong>';
        }
        html += '. ' + finalLink + '</p>';
      } else {
        html = '<p class="nhsuk-body">' + noOfResults + ' found for <strong>' + buildingNumberOrName + '</strong>. ' + finalLink + '</p>'
      } 

    }


    return html;

  };

  //
  // GET ADDRESS SELECT RESULTS FILTER
  //
  filters.getAddressSelectResults = function(){

    let results = ( Array.isArray( this.ctx.data.addressSearchResults ) ) ? this.ctx.data.addressSearchResults : [];
    if ( results.length > 0 ){
      if( results[0].text !== 'Please select' ){
        results.unshift({ text: 'Please select', value: '' });
      }
    }
    return results;

  };
  



  return filters;

};


