var moment = require('moment-timezone');

export class DatesService {
  constructor() {
    console.log('-> DatesService');
  }
  

  // Prepare to display dates in md-datepickers
  // Convert them using Feis timezone
  
  convertMsToDate(ms, feisTz) {
    //console.log('-> ms to date: ms', ms);
    let dateStr = moment.tz(ms, feisTz).format('MMMM D, YYYY');
    //console.log('-> ms to date: date', dateStr);
    return new Date( dateStr );
  }
  

  // Prepare to save dates in db
  // Convert them using Feis timezone
  
  convertDateToMs(date, feisTz) {
    let dateStr = moment(date).format('YYYY-MM-DD');
    //console.log('to db: date', dateStr);
    //console.log('to db: ms', moment.tz( dateStr, feisTz ).valueOf());
    return moment.tz( dateStr, feisTz ).valueOf();
  }
  
}