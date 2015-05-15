# gulp-messenger [![NPM version](https://badge.fury.io/js/gulp-msg.svg)](http://badge.fury.io/js/gulp-msg)

> gulp plugin for command line notification

## Install with [npm](npmjs.org)

```sh
npm install gulp-msg
```

## Usage

```js
var msg = require('gulp-messenger');

msg.Info('-', 'Notice!', '*');
msg.Info   ('style: <%= name %>', {name: 'info'});
msg.Success('style: <%= name %>', {name: 'success'});
msg.Warning('style: <%= name %>', {name: 'warning'});
msg.Error  ('style: <%= name %>', {name: 'error'});
msg.Note   ('style: <%= name %>', {name: 'note'});
msg.Time   ('style: <%= name %>', {name: 'time'});
```

![screenshot](https://github.com/tamtakoe/gulp-msg/raw/master/example.png)

## API
#### info, success, warning, error, note, time

For example `info`
Use `msg.info` for each file into the stream

```js
gulp.src('src/**/*')
    .pipe(msg.info('Notice!')); //'Notice!' for each file
```

Use `msg.flush.info` at the and of the stream

```js
gulp.src('src/**/*')
    .pipe(msg.flush.info('Notice!')); //'Notice!' at the and of stream
```

Use `msg.Info` from the outside of the stream

```js
msg.Info('Notice!'); //'Notice!' in node.js application
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
msg.Info('--', 'Notice!', '*')
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
msg.Info('Enviroment: <%= env.NODE_ENV %>. Foo: <%= foo %>', {foo: bar})
//Enviroment: dev. Foo: bar
```


## License

Copyright (c) 2015 Mike Erickson
Released under the MIT license

***