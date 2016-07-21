const assignedEmails = require('./lib/assignedEmails');
const parse = require('csv-parse');
const { readFileSync } = require('fs');
const validate = require('./lib/validate');

parse(readFileSync('attendees.csv'), function(error, attendees) {
  if (error) { throw error; }

  const headers = attendees.shift();
  // lowercase all attendee emails
  attendees = attendees.map(attendee => {
    attendee[headers.indexOf('Email')] = attendee[headers.indexOf('Email')].toLowerCase();
    return attendee;
  });

  console.log('Validation:');
  validate(attendees, headers);

  console.log('Stats:');
  const organizerEmails = attendees.filter(attendee => 'Organizer' === attendee[headers.indexOf('Ticket Type')]).map(organizer => organizer[headers.indexOf('Email')]);
  console.log(` - ${organizerEmails.length} users are organizers`);

  const nonprofitRepEmails = attendees.filter(attendee => 'Non-profit representative' === attendee[headers.indexOf('Ticket Type')]).map(rep => rep[headers.indexOf('Email')]);
  console.log(` - ${nonprofitRepEmails.length} users are non-profit representatives`);

  const unassigned = attendees.filter(attendee => {
    const email = attendee[headers.indexOf('Email')];
    return !assignedEmails.includes(email) &&
      !organizerEmails.includes(email) &&
      !nonprofitRepEmails.includes(email);
  });
  console.log(` - ${unassigned.length} users are unassigned`);

  const copywriters = unassigned.filter(attendee => ['Copywriting', 'Translation'].includes(attendee[headers.indexOf('Other skills')]));
  console.log(` - ${copywriters.length} users are possible copywriters`);

  const foodService = unassigned.filter(attendee => 'Food Service/General Runner' === attendee[headers.indexOf('Type of volunteer')]);
  console.log(` - ${foodService.length} users are possible food service / runners`);

  const socialMedia = unassigned.filter(attendee => 'Social Media' === attendee[headers.indexOf('Type of volunteer')]);
  console.log(` - ${socialMedia.length} users are possible social media`);

  const photography = unassigned.filter(attendee => 'Photo/Videography' === attendee[headers.indexOf('Type of volunteer')]);
  console.log(` - ${photography.length} users are possible photography`);
});
