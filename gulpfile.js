const gulp = require('gulp');
const typescript = require('gulp-typescript');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const concatCss = require('gulp-concat-css');
const tslint = require('gulp-tslint');
const ts = require('gulp-typescript');
const mocha = require('gulp-mocha');
const electron = require('electron-connect').server.create();

const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const path = require('path');

const webpackConfig = require('./webpack.config.js');
const tsConfig = require('./tsconfig.json');

const buildDirName = "dist";
const buildDir = path.join(__dirname, buildDirName);

gulp.task('serve', function() {
    gulp.start('build');
    gulp.start('watch');

    electron.start();

    gulp.watch('dist/**/*', electron.reload);
    gulp.watch('src/main.js', electron.restart);
});

gulp.task('watch:less', function() {
    gulp.watch('src/browser/less/**/*.less', ['build:less']);
});

gulp.task('watch:renderer', function() {
    gulp.watch('src/**/*.{ts,tsx}', ['build:renderer']);
});

gulp.task('test:lint', function() {
    return gulp.src('src/**/*.ts*')
    .pipe(tslint())
    .pipe(tslint.report({
        emitError: false
    }));
});

gulp.task('test:app', function() {
    return gulp.src('test/**/*.test.ts')
    .pipe(mocha({
        reporter: 'list',
        require: ['ts-node/register']
    }));
});

gulp.task('build:typescript', function() {
    return gulp.src('src/**/*.ts*')
    .pipe(ts(tsConfig.compilerOptions))
});

gulp.task('build:less', function() {
    return gulp.src(['src/browser/less/gitga.less', 'node_modules/bootstrap-less/bootstrap/bootstrap.less'])
    .pipe(less())
    .pipe(concatCss("bundle.css"))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(buildDir));
});

gulp.task("build:renderer", function(cb) {
    const config = webpackConfig;
    config.mode = "production";

    return gulp.src('src/browser/index.tsx')
    .pipe(webpackStream(config, webpack))
    .pipe(gulp.dest(buildDir));
});

gulp.task("build", ["build:renderer", "build:less"]);
gulp.task("test", ["test:lint", "test:app"]);
gulp.task("watch", ["watch:renderer", "watch:less"]);