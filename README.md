# GiveCamp Team Assignments

This Node.js command line application will return a list of teams and their
members based on criteria set in the `config.js` file and a CSV data export
from EventBrite for the event.

## Installation

You will need Node v6+ installed on your machine. Check out
[https://nodejs.org](https://nodejs.org/) for the latest installation instructions.

Once Node is installed, change to the project directory and run `npm install`.

## Usage

The application will look for a file called `attendees.csv` for attendee information
and `config.js` for the configuration to run the application with. If both
are present, and setup, you can run `npm start` to run the command.

It will first validate that all of the emails listed in `config.js` are registered
volunteers in the `attendees.csv` file. _You may have to manually look people up
and use their registration email in the `config.js` file._ If someone cannot
be found, a red error message with their email address is shown on the screen.

After validation, some statistical information is displayed on the screen
showing how many unassigned volunteers there are and how many fit different
special categories.
