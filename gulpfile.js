const gulp = require('gulp');
const typescript = require('gulp-typescript');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const concatCss = require('gulp-concat-css');
const jest = require('gulp-jest').default;
const tslint = require('gulp-tslint');

const webpack = require('webpack');
const electron = require('electron-connect').server.create();

const path = require('path');

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
    gulp.src('__tests__/**/*.test.{js, ts}')
    .pipe(jest());
});

gulp.task('build:less', function() {
    return gulp.src(['src/**/*.less', 'node_modules/bootstrap-less/bootstrap/bootstrap.less'])
    .pipe(less())
    .pipe(concatCss("bundle.css"))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(buildDir));
});

gulp.task('watch', function (cb) {
    electron.start();

    gulp.watch('src/**/*.ts*', ['build:renderer']);
    gulp.watch('src/**/*.less', ['build:less']);
  
    gulp.watch('src/main.js', electron.restart);
  
    gulp.watch(['dist/bundle_renderer.js', 'dist/bundle*.css'], electron.reload);
  });

gulp.task("build:renderer", function(cb) {
    const webpackConfig = {
        devtool: 'source-map',
        context: __dirname + "/src",
        entry: "./browser/index.tsx",
        output: {
            filename: "bundle_renderer.js",
            path: buildDir
        },
        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".tsx", ".js", ".json"]
        },
        module: {
            rules: [
                { test: /\.ts(x?)$/, loader: 'ts-loader'}
            ]
        }
    };

    webpack(webpackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build", err);
        cb();
    });
});

gulp.task("build", ["build:renderer", "build:less"]);
gulp.task("serve", ["build", "watch"]);
gulp.task("test", ["test:lint", "test:app"]);