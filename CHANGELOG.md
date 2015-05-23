# gulp-messenger
### gulp plugin for browser, command line notification and logging!

[![Build Status](https://travis-ci.org/mikeerickson/gulp-messenger.svg?branch=master)](https://travis-ci.org/mikeerickson/gulp-messenger) [![Dependency Status](https://gemnasium.com/mikeerickson/gulp-messenger.svg)](https://gemnasium.com/mikeerickson/gulp-messenger) [![npm](https://img.shields.io/npm/dm/localeval.svg)]() [![npm](https://img.shields.io/badge/mocha-passed-green.svg)]()


## Changelog

- 0.0.24 Small Fixes
    - fixed issue when supplied message is an 'object' causing an error when parsing tokens
    
- 0.0.22 Test Refactoring
    - Refactored tests 

- 0.0.21 Added options
    - Added option `boldVariables` to set display of merged variables
    - Added option `logToConsole` to control if messages are sent to console
    - Added option `logToFile` to control is messages are sent to log
    - Added option `rotateLog` to control log files to have current date appeneded to filename

- 0.0.20 Added .debug command
    - Added msg.debug (msg.Debug) and supported text color
    
