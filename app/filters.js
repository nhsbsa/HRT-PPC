module.exports = function (env) { /* eslint-disable-line no-unused-vars */
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  const filters = {};

  //
  // DEBUG DATA FUNCTION
  //
  filters.debugData = function( data ){

    let debug = ( data.debug === true || data.debug === 'true' ) ? true : false;
    let html = '';

    if( debug ){
      html = '<div class="nhsuk-grid-row"><div class="nhsuk-grid-column-two-thirds">';
      html += '<div class="nhsuk-form-group"><textarea class="nhsuk-textarea" rows="5" disabled>' + JSON.stringify(data) + '</textarea></div>';
      html += '</div></div>';
    }

    return html;

  };

  //
  // GENERATE MEDICATION LIST ROWS FUNCTION
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
  // ALTER DATE BY NUMBER OF MONTHS FUNCTION
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
  // ALTER DATE BY NUMBER OF DAYS FUNCTION
  //
  filters.alterTodaysDateByNumberOfDays = function( dayOffset ){

    let today = new Date();
    today.setDate(today.getDate() + dayOffset);

    // Manually format the date to avoid leading zeros (day, month, year)
    return [ today.getDate(), today.getMonth() + 1, today.getFullYear()].join(' '); 

  };

  //
  // DWP ADDRESS PATTERN GET RESULTS STATUS FUNCTION
  //
  filters.dwpAddressPatternGetResultsStatus = function( results, postcode, buildingNumberOrName ){

    let html = '';

    postcode = postcode.trim();
    buildingNumberOrName = buildingNumberOrName.trim();

    const finalSentence = 'You can <a href="dwp-address-pattern">search again</a> or <a href="dwp-address-pattern-manual">enter the address manually</a>.';
    const finalLink = '<a href="dwp-address-pattern">Search again</a>';

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

  /* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters;
};
