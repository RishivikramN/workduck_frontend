//Parses the numeric date into date object
export function parseTime( input ) {
    var date = new Date();
    var time = input.match( /(\d+)(?::(\d\d))?\s*(p?)/ );
    date.setHours( parseInt( time[1]) + (time[3] ? 12 : 0) );
    date.setMinutes( parseInt( time[2]) || 0 );
    return date;
 }
