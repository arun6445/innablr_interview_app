var gulp = require('gulp');
var zip = require('gulp-zip');
var del = require('del');
var install = require('gulp-install');
var runSequence = require('run-sequence');
var jasmine = require('gulp-jasmine');
var istanbul = require('gulp-istanbul');

gulp.task('clean', function () {
    return del(['./dist', './lambda.zip']);
});

gulp.task('js', function () {
    return gulp.src(['*.js'])
        .pipe(gulp.dest('dist/src/'));
});




gulp.task('node-mods', function () {
    return gulp.src('./package.json')
        .pipe(gulp.dest('dist/'))
        .pipe(install({production: true}));
});

gulp.task('zip', function () {
    return gulp.src(['dist/**/*', '!dist/package.json'])
        .pipe(zip('lambda.zip'))
        .pipe(gulp.dest('./'));
});

gulp.task('pre-test', function () {
  return gulp.src(['*.js', './controllers/*.js', './services/*.js'])
    // Covering files
    .pipe(istanbul())
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function() {
    return gulp.src('./tests/*.spec.*')
        .pipe(jasmine())
        .pipe(istanbul.writeReports())
});

gulp.task('int-test', function(){
    return gulp.src('./tests/manual_integration_test.js')
        .pipe(jasmine())
});

gulp.task('build', function (callback) {
    return runSequence(
        ['clean'],
        ['js', 'config','node-mods'],
        ['zip'],
        callback
    );
});

gulp.task('default', function (callback) {
    return runSequence(
        ['test'],
        ['clean'],
        ['js', 'config', 'controllers', 'query', 'services', 'node-mods'],
        ['zip'],
        callback
    );
});
