var gulp = require('gulp'),
	  wiredep = require('wiredep').stream,
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minCss = require('gulp-minify-css'),
	 sass = require('gulp-sass');

gulp.task('html', function () {
  var assets = useref.assets();

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe(gulpif('*.js',uglify()))
    .pipe(gulpif('*.css',minCss()))
    .pipe(assets.restore())
    .pipe(gulp.dest('dist'));
});

gulp.task('bower', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({
     	directory : "app/bower_components"
    }))
    .pipe(gulp.dest('./app'));
});

gulp.task('sass', function () {
  gulp.src('./app/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./app/sass/*.scss', ['sass']);
});

gulp.task('watch', function(){
	gulp.watch('bower.json', ['bower']);
});