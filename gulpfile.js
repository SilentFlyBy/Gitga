const gulp = require('gulp');
const typescript = require('gulp-typescript');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const concatCss = require('gulp-concat-css');
const jest = require('jest-cli');
const tslint = require('gulp-tslint');
const ts = require('gulp-typescript');

const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const path = require('path');

const webpackConfig = require('./webpack.config.js');
const jestConfig = require('./jest.config.js');
const tsConfig = require('./tsconfig.json');

const buildDirName = "dist";
const buildDir = path.join(__dirname, buildDirName);

gulp.task('test:lint', function() {
    gulp.src('src/**/*.ts*')
    .pipe(tslint())
    .pipe(tslint.report({
        emitError: false
    }));
});

gulp.task('test:app', function() {
    gulp.src('tests/**/*.test.{js, ts, jsx, tsx}')
    .pipe(jest());
});

gulp.task('build:typescript', function() {
    return gulp.src('src/**/*.ts*')
    .pipe(ts(tsConfig.compilerOptions))
});

gulp.task('build:less', function() {
    return gulp.src(['src/**/*.less', 'node_modules/bootstrap-less/bootstrap/bootstrap.less'])
    .pipe(less())
    .pipe(concatCss("bundle.css"))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(buildDir));
});

gulp.task("build:renderer", function(cb) {
    return gulp.src('src/browser/index.tsx')
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(buildDir));
});

gulp.task("build", ["build:renderer", "build:less"]);
gulp.task("serve", ["build", "watch"]);
gulp.task("test", ["test:lint", "test:app"]);