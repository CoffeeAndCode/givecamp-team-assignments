const config = require('../config');

const preassignedToTeams = Object.keys(config.teams).reduce((people, teamName) => {
  return people.concat(config.teams[teamName].team.map(email => email.toLowerCase()));
}, []);

module.exports = preassignedToTeams.concat(config.floaters.map(email => email.toLowerCase()));
