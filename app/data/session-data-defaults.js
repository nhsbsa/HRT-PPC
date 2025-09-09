
//
// GET MEDICATIONS
//
function _getMedications(){
 
  const excelToJSON = require('convert-excel-to-json');
  const json = excelToJSON({
    sourceFile: 'app/data/medications.xlsx'
  });

  const medications = [ { 'text': 'Please select', 'value': '' } ];

  if( json ){

      Object.keys(json).forEach(function(key){
  
          const arr = json[key];
    
          if( arr && Array.isArray(arr) ){

            arr.forEach(function( row, i ){
    
              if( i > 0 ){

                if( row.A && row.A.trim() !== '' ){

                  const obj = {};
                  const extras = [];
                  
                  Object.keys(row).forEach(function(rowKey){
                      if( rowKey === 'A' ){
                          obj.text = row[rowKey];
                      } else if (rowKey === 'B' ) { 
                          obj.genericName = row[rowKey];
                      } else {
                          extras.push(row[rowKey]);
                      }
                   });
                   
                   if( extras.length > 0 ){
                      obj.attributes = {};
                      obj.attributes['data-extra'] = '<br /><span class="nhsuk-body-s">'+extras.join('<br />')+'</span>'
                   }

                  medications.push( obj );

                }

              }

            });

          }

      });

  }

  return medications;

}

//
// DATA
//
module.exports = {

    debug: 'false',

    NHSPrescriptionCost: '£9.90',
    HRTPPCCost: '£19.80',

    phaseBannerTagText: 'BETA',
    phaseBannerFeedbackLink: 'https://online1.snapsurveys.com/Interview/77e67933-70d0-410f-b972-c748a95fa0cc',

    addressMethod: 'select', // Either 'radios' or 'select'
    aToZMethod: 'single', // Either 'standard' or 'single' 

    aToZ: 'all', // Used in aToZMethod 'single' mode

    medications: _getMedications()

}