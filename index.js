const assignedEmails = require('./lib/assignedEmails');
const parse = require('csv-parse');
const { readFileSync } = require('fs');
const validate = require('./lib/validate');

parse(readFileSync('attendees.csv'), function(error, attendees) {
  if (error) { throw error; }

  console.log('Validation:');
  const headers = attendees.shift();
  validate(attendees, headers);

  console.log('Stats:');
  const unassigned = attendees.filter(attendee => {
    return !assignedEmails.includes(attendee[headers.indexOf('Email')].toLowerCase());
  });
  console.log(` - ${unassigned.length} users are unassigned`);

  const copywriters = unassigned.filter(attendee => ['Copywriting', 'Translation'].includes(attendee[headers.indexOf('Other skills')]));
  console.log(` - ${copywriters.length} users are possible copywriters`);

  const foodService = unassigned.filter(attendee => 'Food Service/General Runner' === attendee[headers.indexOf('Type of volunteer')]);
  console.log(` - ${foodService.length} users are possible food service / runners`);
});
