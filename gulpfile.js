// Load Gulp
var gulp    = require('gulp'),
    gutil   = require('gulp-util'),
    gls = require('gulp-live-server'),
    plugins = require('gulp-load-plugins')();


// Start Watching: Run "gulp"
gulp.task('default', ['watch']);


gulp.task('serve', function() {
    //serve with default settings
    var server = gls.static('./', 3000);
    server.start();

    //use gulp.watch to trigger server actions(notify, start or stop)
    gulp.watch(['build/**/*.css', 'build/**/*.html'], server.notify);
});


// Less to CSS: Run manually with: "gulp build-css"
gulp.task('build-css', function() {
    return gulp.src('assets/less/BEM__grid.less')
        .pipe(plugins.plumber())
        .pipe(plugins.less())
        .on('error', function (err) {
            gutil.log(err);
            this.emit('end');
        })
        .pipe(plugins.autoprefixer(
            {
                browsers: [
                    '> 1%',
                    'last 2 versions',
                    'firefox >= 4',
                    'safari 7',
                    'safari 8',
                    'IE 8',
                    'IE 9',
                    'IE 10',
                    'IE 11'
                ],
                cascade: false
            }
        ))
        //.pipe(plugins.cssmin())
        .pipe(gulp.dest('build')).on('error', gutil.log);
});

// Default task
gulp.task('watch', function() {
    gulp.watch('assets/less/**/*.less', ['build-css']);
});