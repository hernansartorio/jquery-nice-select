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
    .pipe(autoprefixer({ browsers: ['> 1%', 'last 3 versions'] }))
    .pipe(gulp.dest('css'));
    
  gulp.src('scss/nice-select.scss')
    .pipe(autoprefixer({ browsers: ['> 1%', 'last 3 versions'] }))
    .pipe(rename({suffix: '-prefixed', prefix: '_'}))
    .pipe(gulp.dest('scss'));
});

gulp.task('watch', function() {
  gulp.watch('js/*.js', ['compress']);
  gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('default', ['compress', 'sass']);