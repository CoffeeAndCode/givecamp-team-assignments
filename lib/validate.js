const assignedEmails = require('./assignedEmails');
const colors = require('colors');
const config = require('../config');

module.exports = function(attendees, headers) {
  const attendeeEmails = attendees.map(attendee => attendee[headers.indexOf('Email')].toLowerCase());
  const missingAttendees = assignedEmails.filter(attendee => !attendeeEmails.includes(attendee.toLowerCase()));

  if (missingAttendees.length) {
    missingAttendees.forEach(attendee => {
      console.error(colors.red(` - ${attendee} is pre-assigned, but not on the registration list`));
    });
  } else {
    console.log(' - no concerns');
  }
  console.log();
}
