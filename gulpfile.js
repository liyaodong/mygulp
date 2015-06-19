var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    react = require('gulp-react'),
    livereload = require('gulp-livereload');

gulp.task('styles', function() {
  return gulp.src('src/css/**/*.scss')
    .pipe(concat('main.scss'))
    .pipe(sass({ style: 'expanded'}))
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css/'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('react', function () {
  return gulp.src('src/jsx/**/*.jsx')
    .pipe(react())
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(gulp.dest('dist/jsx/'));
});

gulp.task('scripts', function() {
  return gulp.src([
      // TODO: put you script file to here
      'src/js/app.js'
    ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images/'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function() {
  return gulp.src(['dist/css', 'dist/js', 'dist/images'], {read: false})
    .pipe(clean());
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});

gulp.task('watch', function() {
  livereload.listen();

  gulp.watch('src/css/**/*.scss', ['styles']);

  gulp.watch('src/js/**/*.js', ['scripts']);

  gulp.watch('src/images/**/*', ['images']);
});
