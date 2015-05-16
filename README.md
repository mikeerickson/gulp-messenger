# gulp-messenger 

> gulp plugin for command line notification

## Install with [npm](npmjs.org)

```sh
npm install gulp-messenger
```

## Usage

```js
var msg = require('gulp-messenger');

msg.init(); // initialize module, otherwise defaults will be used

// this example will enable file logging
msg.init({logToFile: true});


msg.Info('-', 'Loading...', '*');
msg.Info   ('style: <%= name %>', {name: 'info'});
msg.Success('style: <%= name %>', {name: 'success'});
msg.Warning('style: <%= name %>', {name: 'warning'});
msg.Error  ('style: <%= name %>', {name: 'error'});
msg.Note   ('style: <%= name %>', {name: 'note'});
msg.Time   ('style: <%= name %>', {name: 'time'});
msg.Debug  ('style: <%= name %>', {name: 'debug'});
```


## API
#### info/Info, success/Success, warning/Warning, error/Error, note/Note, time/Time, debug/Debug

- lowercase methods are to bue used in gulp pipeline
- Titlecase methods are to be used outside of gulp (ie node or browser)

Default Options (supplied to `init` method)

```js
var defOptions = {
    logToFile:     false,
    logPath:       'logs/',
    logFile:       'app.log',
    timestamp:     false,
    rotateLog:     false,
    boldVariables: true
};
```

For example `info`
Use `msg.info` for each file into the stream

```js

msg.Info('This information message logged to console and optionally log');

or -

gulp.src('src/**/*')
    .pipe(msg.info('Piping Message')); //'Piping Message' for each file
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

Lodash template.

#### Usage

```js
msg.Info('Enviroment: <%= env.NODE_ENV %>. Name: <%= name %>', {foo: 'codedungeon'})
//Enviroment: dev. name: codedungeon
```


## License

Copyright (c) 2015 Mike Erickson
Released under the MIT license


## Credits

gulp-messenger written by Mike Erickson

E-Mail: [codedungeon@gmail.com](mailto:codedungeon@gmail.com)

Twitter: [@codedungeon](http://twitter.com/codedungeon)

Webiste: [codedungeon.org](http://codedungeon.org)

***
