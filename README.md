# gulp-messenger 

> gulp plugin for command line notification

## Install with [npm](npmjs.org)

```sh
npm install gulp-messenger
```

## Usage

```js
var msg = require('gulp-messenger');

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
#### info, success, warning, error, note, time

For example `info`
Use `msg.info` for each file into the stream

```js
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

### msg.info([before,] message, [after,] [data])

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

***
