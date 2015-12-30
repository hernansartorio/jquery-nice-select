var gulp = require('gulp'),
    rename = require('gulp-rename')
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');
    
gulp.task('compress', function() {
  gulp.src('js/jquery.nice-select.js')
    .pipe(uglify({preserveComments: 'license'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('js'))
});

gulp.task('sass', function () {
  gulp.src('scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
  gulp.watch('js/*.js', ['compress']);
  gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('default', ['compress', 'sass']);