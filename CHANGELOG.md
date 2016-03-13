# gulp-messenger
### gulp plugin for browser, command line notification and logging!

[![Build Status](https://travis-ci.org/mikeerickson/gulp-messenger.svg?branch=master)](https://travis-ci.org/mikeerickson/gulp-messenger) [![Dependency Status](https://gemnasium.com/mikeerickson/gulp-messenger.svg)](https://gemnasium.com/mikeerickson/gulp-messenger) [![npm](https://img.shields.io/npm/dm/localeval.svg)]() [![npm](https://img.shields.io/badge/mocha-passed-green.svg)]()


## Changelog
- 0.13.0
    - Added `strict mode` check before enabling orange

- 0.12.0
    - Added `logTimestampFormat` option, accepts momentjs format
    - Default logTimestampFormat ( YYYY-MM-DD HH:mm:ss Z)

- 0.11.1
    - Fixed msg.note (ORANGE) color output to properly close color buffer when msg.note output displayed
  
- 0.11.9
    - Repurposed msg.note method to use default color of orange (color constant added in 0.10.0)
      msg.note('This will appear in orange');

- 0.10.0
    - Added new `orange` color which is default color for console.note routing
    - If you wish to use orange in any other output, the correct ASCI command to use

      var COLOR_ORANGE = "\033[38;5;214m";
      var COLOR_RESET  = "\033[m";
      msg.log(COLOR_ORANGE + 'Hello World!' + COLOR_RESET);

      * Note: The orange color is using 256 palette so it may not appear identical across !terminals
      * I have tested on OSX, Windows, CentOS 6/7 and Ubuntu 12/14
      
- 0.9.0
    - When executing `msg` command, supplying object as only parameter, it will use .dump command, displaying pretty output
      - If you dont want to use `dump` command for object output, disable `useDumpForObjects` options
    - Added mew `useDumpForObjects` option property to control default output option for simple objects
- 0.8.0
    - New command `msg.colors` which is an instance of Chalk
- 0.6.2
    - Added `dir` routine (calls `dump` internally)
    - Fixed issues related to passing object data in addition to messages (regression)
- 0.5.0
    - Lots of fixes internally before be pushed to public consumption
      - Added `chalk` instance ( msg.chalk... )
      - Added `chalkline` instance ( msg.chalkline... )
      - Added `dump` method ( msg.dump )
      - Updated `line` method 
      
- 0.2.0 
    - Fixed issues with properly display object literals
    - Added `version` method (returns current package version)
    
- 0.1.0 
    - Added support for passing standard data as parameters 2..n
    - Added support for using `console.` instead of `msg` etc.
    - Enhanced package to support all `console` methods (eg console.log, console.error, etc)

- 0.0.43 Added new `header` entry point
    - Added msg.header method
      Displays message default text underline (doesn't have its own color)

- 0.0.42 Added new `log` entry point
    - Added msg.log method 
    
- 0.0.41 Bug Fixes
    - Fixed issue with line printing feature (was not actually use line)
    - Refreshed all plugin dependencies


- 0.0.40 Regression Fixes
    - Fixed regression issue introduced in 0.0.30 causing logs with ojbect as message parameter
    
- 0.0.35 Bug Fixes

- 0.0.34
    - Internal (development level) additions
      * Todo and Test tasks support option of opening report file when completed
      
- 0.0.33
    - Workflow Refinements
      * gulpfile, tasks, etc
      
- 0.0.32
    - exposed msg.line method
      msg.line({character, numChars});
       * character (default =)
       * numChars  (default 80)
       
- 0.0.31
    - Fixed results when using msg.Time/time.  It was not echoing current time as it should
    
- 0.0.30 Logging To File
    - Fixed issue when logging to `logger` file instance
    
- 0.0.28 Bug Fixes
    - Fixed issue with `timestamp` option not properlly including timestamp

- 0.0.27 Bug Fix
    - Fixed a regression issue when using messenger commands in gulp pipeline
    
- 0.0.24 Small Fixes
    - fixed issue when supplied message is an 'object' causing an error when parsing tokens
    
- 0.0.22 Test Refactoring
    - Refactored tests 

- 0.0.21 Added options
    - Added option `boldVariables` to set display of merged variables
    - Added option `logToConsole` to control if messages are sent to console
    - Added option `logToFile` to control is messages are sent to log
    - Added option `rotateLog` to control log files to have current date appended to filename

- 0.0.20 Added .debug command
    - Added msg.debug (msg.Debug) and supported text color
    
