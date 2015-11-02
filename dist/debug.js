var gulp     = require('gulp');
var console  = require('../index');


console.init({
  logToFile:    true,
  timestamp:    false,
  showPipeFile: false
});

var family = {father: 'Mike Erickson', mother: 'Kira Erickson'};

gulp.task('debug', function(){

  console.error('mike erikcson');
  console.error('family data', family);

  return gulp.src('simple.js')
    .pipe(console.flush.success('*','success test in gulp','*'))
    .pipe(console.flush.error('=','test in gulp'))
    .pipe(console.flush.info('=','test in gulp','$'))
    .pipe(console.flush.warn('test in gulp'));

});
