/// <binding BeforeBuild='scripts' />
var gulp = require('gulp'),
	browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream'),
	sourcemaps = require('gulp-sourcemaps'),
    reactify = require('reactify')
;
	
gulp.task('scripts', function () {
    var b = browserify({
        entries: './typescript/index.js',
        debug: true,
        transform: [reactify]
    });

    b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./www/scripts/'));
});

gulp.task('default', ['scripts']);
