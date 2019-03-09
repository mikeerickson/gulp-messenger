# gulp-messenger
### gulp plugin for browser, command line notification and logging!

[![Build Status](https://travis-ci.org/mikeerickson/gulp-messenger.svg?branch=master)](https://travis-ci.org/mikeerickson/gulp-messenger) [![Dependency Status](https://gemnasium.com/mikeerickson/gulp-messenger.svg)](https://gemnasium.com/mikeerickson/gulp-messenger) [![npm](https://img.shields.io/npm/dm/localeval.svg)]() [![npm](https://img.shields.io/badge/mocha-passed-green.svg)]()

View on [npm](https://www.npmjs.com/package/gulp-messenger)


### Install with [npm](npmjs.org)

```sh
npm install gulp-messenger
```

### Usage

```js
var msg = require('gulp-messenger');

msg.init(); // initialize module, otherwise defaults will be used

// this example will enable file logging (see options below)
msg.init({logToFile: true});


// this will disable logging to file and interpolation variables will be font style as message (no bold)
var options = { logToFile: false, boldVariables: false };
msg.init(options);


// You can use titleCase or lower case for msg methods
msg.Info('-', 'Loading...', '*');
msg.log    ('style: <%= name %>', {name: 'info'});     // default color White
msg.Info   ('style: <%= name %>', {name: 'info'});     // default color Cyan
msg.Success('style: <%= name %>', {name: 'success'});  // default color Green
msg.Warning('style: <%= name %>', {name: 'warning'});  // default color Yellow
msg.Error  ('style: <%= name %>', {name: 'error'});    // default color Red
msg.Note   ('style: <%= name %>', {name: 'note'});     // default color Orange
msg.Time   ('style: <%= name %>', {name: 'time'});
msg.Debug  ('style: <%= name %>', {name: 'debug'});
msg.Table  (array|object)
```


### API
#### info/Info, success/Success, warning/Warning, error/Error, note/Note, time/Time, debug/Debug, line/Line

- lowercase methods are to be used in gulp pipeline or outside (same API can be used for both Node, Browser, and Gulp)
- Titlecase methods are to be used outside of gulp (ie Node or browser)

Default Options (supplied to `init` method)

```js
var defOptions = {
    logToFile:          false,
    logTimestampFormat: 'YYYY-MM-DD HH:mm:ss Z',
    logToConsole:       true,
    logPath:            'logs/',
    logFile:            'app.log',
    timestamp:          false,
    rotateLog:          false,
    boldVariables:      true,
    useDumpForObjects:  true
};

logToFile (default: false)
- will log the supplied message to `logger` instance and log to file

logToConsole (default: true)
- will log message to console

logTimestampFormat (default: YYYY-MM-DD HH:mm:ss Z)
- when logging to file, uses momentjs formats

logPath (default: 'logs/' at root level)
- desired path where log files will be stored

logFile (default: 'app.log')
- desired filename where log files will be stored

timestamp (default: false)
- Will include timestamp on consoled messages

rotateLog (default: false)
- will create a new log file each day

boldVariables (default: true)
- when perform interpolation, the actual variable will be bold

useDumpForObjects (default: true)
- when enabled, is passing a single object paramter, msg.dump() will be used instead of standard console output
- when disabled, native msg.xxx will be used (default colors, etc)


```

For example `info`
Use `msg.info` for each file into the stream

```js

msg.Info('This information message logged to console and optionally log file.  Configured by `options` parameter supplied to `msg.init` method');
msg.info('This information message logged to console and optionally log file.  Configured by `options` parameter supplied to `msg.init` method');

or -

// If you using in gulp stream, include the `flush` property as shown here
// All messenger routines (except dump) are supported in the gulp pipleline
gulp.src('src/**/*')
    .pipe(msg.flush.info('Piping Message'));  // 'Piping Message' for each file
```

Use `msg.flush.info` at the and of the stream

```js
gulp.src('src/**/*')
    .pipe(msg.flush.info('Process Completed Successfully')); //'Process Completed Successfully' at the and of stream
```

Use `msg.Info` from the outside of the stream

```js
msg.Info('Application Message'); //'Application Message' in node.js application
```

### msg.version|msg.Version

Returns current module version

### msg.Info([before,] message, [after,] [data])

Show message

#### Parameters

##### before
##### after
Type: `String`

Delimiter before/after the message. Each character is repeated 80 times

#### Usage

```js
msg.Info('--', 'Hello World', '*')
```

##### data
Type: `Object`

Data for message. Inherited values:

<pre>
env           - process.env
file          - vinyl file
file.relative - relative path (extra field)
file.basename - basename (extra field)
duration      - duration of streaming
totalDuration - duration from gulpfile start
</pre>


##### message
Type: `String`

Lodash compatible template (may also use Underscore over Lodash).

#### Usage

```js
msg.Info('Environment: <%= env.NODE_ENV %>. Name: <%= name %>', {name: 'codedungeon'})
//Environment: dev. name: codedungeon
```


### License

Copyright (c) 2015-2016 Mike Erickson
Released under the MIT license


### Credits

gulp-messenger written by Mike Erickson

E-Mail: [codedungeon@gmail.com](mailto:codedungeon@gmail.com)

Twitter: [@codedungeon](http://twitter.com/codedungeon)

Webiste: [codedungeon.org](http://codedungeon.org)

***
