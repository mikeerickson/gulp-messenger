//  GULP MESSENGER
// =============================================================================

// this is required to support .orange color
// eventually want to restore "use strict" waiting on chalk

var VERSION      = require('./package.json').version;

var chalk        = require('chalk');
var is           = require('is_js');
var mkdirp       = require('mkdirp');
var moment       = require('moment');
var path         = require("path");
var prettyHrtime = require('pretty-hrtime');
var through      = require('through2');
var chalkline    = require('./lib/chalkline');
var Table        = require('easy-table');
var Purdy        = require('purdy');
var bowser       = require('bowser');
var sprintf      = require("sprintf-js").sprintf;
var _            = require('lodash');
_.mixin(require('lodash-deep'));

var winston      = null;

if(bowser.name.length === 0) {
  var winston      = require('winston');
}

// MODULE CONSTANTS
// =============================================================================

var VALUE_REGEXP        = /<%=\s*([^\s]+)\s*%>/g;
var COLOR_ORANGE        = chalk.red();
var COLOR_RESET         = chalk.white();
var COLOR_CODES_REGEXP  = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;




/*eslint-disable */
if(! isStrictMode() ) {
  COLOR_ORANGE          = '\033[38;5;214m';
  COLOR_RESET           = '\033[m';
}
/*eslint-enable */

function isStrictMode() {
  return (typeof this === 'undefined');
}

// SETUP DEFAULT OPTIONS
// =============================================================================

var defOptions = {
  logToFile:          false,
  logToConsole:       true,
  logTimestampFormat: 'YYYY-MM-DD HH:mm:ss Z',
  logPath:            'logs/',
  logFile:            'app.log',
  timestamp:          false,
  rotateLog:          false,
  boldVariables:      true,
  showPipeFile:       true,
  useDumpForObjects:  true,
  lineLength:         80,
  chalklineBox:       '\u2584' // '\u2588'
};

// unicode blocks -- http://graphemica.com/blocks/block-elements
// SETUP CHALKLINE
chalkline.options({block: defOptions.chalklineBox});


// SETUP WINSTON
// =============================================================================
// Initialize logger, additional settings will be created in `init` method

var logger = null;
if ( bowser.name.length === 0) {
  var logger = new (winston.Logger)({level: 'debug'});
}

// MODULE DEFINITION (used by module.exports below)
// =============================================================================

var messenger = {
  orange: function(msg) {
    if( !is.undefined(msg) ) {
      return COLOR_ORANGE + msg + COLOR_RESET;
    }
    return COLOR_ORANGE;
  },
  init:       init(),
  setOptions: setOptions(),
  name:       'gulp-messenger',
  info:       new Message('info'),
  log:        new Message('info'),
  success:    new Message('success'),
  warning:    new Message('warning'),
  warn:       new Message('warning'),
  error:      new Message('error'),
  note:       new Message('note'),
  table:      new Message('table'),
  time:       new Message('time'),
  debug:      new Message('debug'),
  line:       new Message('line'),
  header:     new Message('header'),
  dir:        function() {
    Purdy.apply(Purdy, arguments);
  },
  purdy:      function() {
    Purdy.apply(Purdy, arguments);
  },
  dump:       function() {
    Purdy.apply(Purdy, arguments);
  },
  version:    function() {
    return VERSION;
  },
  chalkline:  chalkline,
  chalk:      chalk,
  colors:     chalk,
  flush: {
    info:    message('info', true),
    log:     message('info', true),
    success: message('success', true),
    warning: message('warning', true),
    warn:    message('warning', true),
    error:   message('error', true),
    note:    message('note', true),
    table:   message('table', true),
    time:    message('time', true),
    debug:   message('debug', true),
    line:    message('line', true),
    header:  message('header',true),
    chalkline: chalkline,
    dir: function() {
      Purdy.apply(Purdy, arguments);
    },
    purdy: function() {
      Purdy.apply(Purdy, arguments);
    },
    dump: function(){
      Purdy.apply(Purdy, arguments);
    }
  },
  Info:       new Message('info'),
  Log:        new Message('info'),
  Success:    new Message('success'),
  Warning:    new Message('warning'),
  Warn:       new Message('warning'),
  Error:      new Message('error'),
  Note:       new Message('note'),
  Time:       new Message('time'),
  Debug:      new Message('debug'),
  Line:       new Message('line'),
  Header:     new Message('header'),
  Table:      new Message('table'),
  Purdy:     function() {
    Purdy.apply(Purdy, arguments);
  },
  Dump:      function() {
    Purdy.apply(Purdy, arguments);
  },
  Version:   function() {
    return VERSION;
  }
};

// MODULE ENTRY POINTS
// =============================================================================

function message(style, useFlush) {
  var totalStart    = process.hrtime();

  return function() {
    var args     = getArgs(arguments);
    var lastFile = {};
    var start    = process.hrtime();

    function transform(file, enc, callback) {
      lastFile = file;

      if (!useFlush) {
        args.data.file          = _.clone(file);
        args.data.file.relative = path.relative(file.base, file.path);
        args.data.file.basename = path.basename(file.path);
        args.data.duration      = prettyHrtime(process.hrtime(start));
        args.data.totalDuration = prettyHrtime(process.hrtime(totalStart));
        notify(style, args.before, args.message, args.after, args.data);
      }
      callback(null, file);
    }

    function flush(callback) {
      if (useFlush) {

        // not sure how this is going to be used as we are clearing .data below
        args.data.file          = _.clone(lastFile);
        args.data.duration      = prettyHrtime(process.hrtime(start));
        args.data.totalDuration = prettyHrtime(process.hrtime(totalStart));

        // gulp pipeline specific
        defOptions.timestamp = true; // timestamp always true when in pipeline
        args.data = {};              // no data available in gulp pipeline

        // this is only appropriate adjustment to message (to include the filename)
        var msg = args.message;
        if (defOptions.showPipeFile) {
          msg += ' [' + lastFile.relative + '] ';
        }

        notify(style, args.before, msg, args.after, args.data);
      }
      callback();
    }

    return through.obj(transform, flush);
  };
}

function Message(style) {
  return function() {
    var args = getArgs(arguments);
    if((is.object(args.message)) && (arguments.length === 1) && (defOptions.useDumpForObjects)) {
      /* jshint -W064 */
      if(style === 'table') {
        console.log(Table.print(args.message));
      }
      else {
        Purdy(args.message);
      }
    } else {
      notify(style, args.before, args.message, args.after, args.data);
    }
  };

}


// MODULE PRIVATE METHOD
// =============================================================================

function init(options) {

  var added = false;

  return function(options) {

    var isBrowser = bowser.name.length > 0;

    if(is.not.undefined(options)) {
      defOptions = _.defaults(options, defOptions);
    }

    if(defOptions.logPath[defOptions.logPath.length] !== '/') {
      defOptions.logPath += '/';
    }

    if(! isBrowser) {
      // create log path if it doesn't already exist
      mkdirp(defOptions.logPath);

      defOptions.logFilename = defOptions.logPath + defOptions.logFile;
      if ( defOptions.rotateLog ) {
        logger.add(winston.transports.DailyRotateFile,{
          filename: defOptions.logFilename,
          timestamp: function() {
            return moment().format(defOptions.logTimestampFormat);
          }
        });
      } else {
        if( ! added ) {
          added = true;
          logger.add(winston.transports.File,{
            filename: defOptions.logFilename,
            timestamp: function() {
              return moment().format(defOptions.logTimestampFormat);
            }
          });
        }
      }
    } else {
      console.warn('Logging Disabled On Browser');
    }

    // only do this once regardless so outside browser check
    defOptions.logInitialized = true;

    // update chalkine in the event supplied block or length
    chalkline.options({block: defOptions.chalklineBox});

  };
}

function notify(style, before, message, after, data) {

debugger;

  var text, variable;
  var result = '';
  var tokens;

  // 2015.05.28 - added bounds check, exposed when adding *.line() routine
  if( is.undefined(message) ) { message = ''; }

  debugger;

  if ( (is.not.object(message)) && (is.not.number(message)) ) {
    tokens = message.split(VALUE_REGEXP);
  } else {
    tokens = message;
  }

  switch (style) {
    case "info":
    case 'log':
      text     = chalk.cyan;
      variable = chalk.cyan.bold;
      break;
    case "success":
      text     = chalk.green;
      variable = chalk.green.bold;
      break;
    case "warning":
      text     = chalk.yellow;
      variable = chalk.yellow.bold;
      break;
    case "error":
      text     = chalk.red;
      variable = chalk.red.bold;
      break;
    case "note":
      text     = COLOR_ORANGE;
      variable = chalk.white;
      break;
    case "table":
      text     = chalk.white;
      variable = chalk.white;
    case "time":
      text     = chalk.magenta;
      variable = chalk.magenta.bold;
      break;
    case "debug":
      text     = chalk.grey.dim;
      variable = chalk.grey.dim.bold;
      break;
    case "line":
      text     = chalk.green;
      variable = chalk.green.bold;
      break;
    case "header":
      text     = chalk.white.underline;
      variable = chalk.white;
      break;
    default:
      text     = chalk.gray;
      variable = chalk.white;
      break;
  }

// if we don't have bold variables (for merging), set variable to text color
  if( ! defOptions.boldVariables ) {
    variable = text;
    if ( text === chalk.gray ) {
      variable = chalk.white;
    }
  }

  for (var i = 0; i < tokens.length; i++) {
    if (i%2) {
      result += variable(_.deepGet(data, tokens[i]) || '');
    } else {
      if ( text === COLOR_ORANGE) {
        result = text + tokens[i] + COLOR_RESET;
      } else {
        result += text(tokens[i] || '');
      }
    }
  }

// if the supplied message is an object, return object (string) as result
  if(! result.length ) {
    result = tokens;
  }

  function setConsole(data) {

    var callData = {};
    if ( is.not.undefined(data) ) {
      callData = data;
    }
    var hCurrentTime = moment().format('HH:mm:ss');

    if (( defOptions.logToConsole ) && ( style !== 'line')){
      if ( defOptions.timestamp || (style === 'time')) {
        if ( style === 'time') {
          console.log('[' + chalk.grey(hCurrentTime) + '] ' + hCurrentTime);
        } else {
          if ( result ) {
            if( Object.keys(arguments[0]).length === 2 ) {
              console.log('[' + chalk.grey(hCurrentTime) + '] ' + result, arguments[0]);
            } else {
              console.log('[' + chalk.grey(hCurrentTime) + '] ' + result);
            }
          }
        }
      } else {

        if ( is.object(callData)) {
          if ( Object.keys(callData).length > 0 ) {
            if(is.array(callData)) {
              callData.splice(0,0,result);
              console.log.apply(console, callData);
            }
          } else {
            console.log(result);
          }
        } else {
          console.log(result, callData);
        }
      }
    }

    // if we are outputting a line, just spit out what we got using `lineLength`
    if ( style === 'line') {
      setLine(result);
    }

  }

  function setLine(line) {

    if (!line) { return; }

    var result = '';
    for (var i = 0; i < defOptions.lineLength; i++) {
      result += line;
    }
    if ( defOptions.logToConsole ) {
      // we have to handle orange separately
      if(typeof(text) === 'function') {
        console.log(text(result));
      } else {
        console.log(COLOR_ORANGE + result + COLOR_RESET);
      }
    }
  }

  function logToFile(style, result) {

    // make sure we received text, otherwise bail
    if ( ! is.string(result) ) { return; }

    // don't bother logging if we have no message
    if ( result.length === 0  ) { return; }

    // strip out all the color codes, etc. from message before logging
    var msg = result.replace(COLOR_CODES_REGEXP,'');

    // secondary check to make sure we have logging enabled
    if (defOptions.logToFile) {
      switch (style) {
        case 'error':
          logger.error(msg); break;
        case 'warning':
        case 'warn':
          logger.warn(msg); break;
        case 'success':
          logger.info(msg); break;
        case 'debug':
          logger.log('debug', msg); break;
        case 'note':
        case 'info':
        case 'log':
        case 'default':
          logger.info(msg); break;
        case 'table':
          return false;
      }
    }

  }

  setLine(before);
  setConsole(data);
  setLine(after);

  // don't bother logging if it is disabled, save some processor fumes
  (defOptions.logToFile) ? logToFile(style, result) : '';

}

function getArgs(args) {

  var msg = '';
  if(args.length > 0 ) {
    var msg = args[0];
    if(is.string(msg)) {
      if ( msg.indexOf('%s') > 0 ) {
        // we are processing via sprintf
        var params = Array.prototype.slice.call(args);
        params.shift();
        return {
          before: '',
          message: msg,
          after: '',
          data: params
        }
      }
    }
  }
  var result = {
    before:  args[0],
    message: args[1],
    after:   args[2] || null,
    data:    args[3] || {}
  };

  if(args.length === 1) {
    result.before = '';
    result.message = args[0];
    result.after = '';
  }

  if(args.length === 2) {
    result.before = args[0];
    result.message = args[1];
    result.after = '';
  }

  if( is.not.undefined(args[1]) ) {
    if(is.not.string(args[1])) {
      result.before  = null;
      result.message = args[0];
      result.after   = null;
      result.data    = args[1];
      // result.data    = args;
    } else if (is.not.string(args[2])) {
      result.before  = args[0];
      result.message = args[1];
      result.after   = null;
      result.data    = args[2];
    }
  }
  if( is.undefined(result.data) ) {
    result.data = {};
    result.data.file = '';
  }

  //result.data = _.merge({env: process.env}, result.data);
  return result;
}

function setOptions(options) {

  var added = true;

  return function(options) {

    if(is.not.undefined(options)) {
      defOptions = _.defaults(options, defOptions);
    }

    if(defOptions.logPath[defOptions.logPath.length] !== '/') {
      defOptions.logPath += '/';
    }

    // create log path if it doesn't already exist
    mkdirp(defOptions.logPath);

    defOptions.logFilename = defOptions.logPath + defOptions.logFile;
    if ( defOptions.rotateLog ) {
      logger.add(winston.transports.DailyRotateFile,{filename: defOptions.logFilename});
    } else {
      if( !added ) {
        added = true;
        logger.add(winston.transports.File,{filename: defOptions.logFilename});
      }
    }
    defOptions.logInitialized = true;
  };
}

// MODULE EXPORT
// =============================================================================

module.exports = messenger;
