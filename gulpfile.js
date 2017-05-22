/**
 * Created by jige on 2016/11/16.
 */
const gulp = require('gulp')
const del = require('del');

const replace = require('gulp-replace');
const changed = require('gulp-changed');
const compass = require('gulp-compass');
const picbase64 = require('gulp-base64');
const minimage = require('gulp-imagemin');
const plumber = require('gulp-plumber');

const webpack = require('gulp-webpack');
const webpackConfig = require('./config/webpack.config');

const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const config = {
    'dist': 'dist/',
    'html': 'src/*.html',
    'disthtml': 'dist/',
    'sass': 'src/sass/**/*.scss',
    'sassfile': 'src/sass',
    'distCss': 'dist/css',
    'simulate':'src/simulates/*.json',
    'distsimulate':'dist/simulates',
    'images':'src/images/{,*/}*.{gif,jpeg,jpg,png,ico}',
    'distImg': 'dist/images',
    'mainJs': 'src/main.js',
    'v':Date.now()
};
//------------------------------mobile端构建------------------------------//
gulp.task('clean', function () {
    return del([config.dist]).then(function(){
        console.log('清除完成!');
    });
});
gulp.task('styles_dev', function () {
    return gulp.src(config.sass)
        .pipe(plumber(function() {
            console.log('There was an compass sass error');
            this.emit('end');
        }))
        .pipe(changed(config.sass))
        .pipe(compass({
            config_file: './config/config.dev.rb',
            css: config.distCss,
            sass: config.sassfile
        }))
        .pipe(gulp.dest(config.distCss))
        .pipe(reload({stream: true}));
});
gulp.task('styles_build', function () {
    return gulp.src(config.sass)
        .pipe(compass({
            config_file: './config/config.build.rb',
            css: config.distCss,
            sass: config.sassfile
        }))
        .pipe(gulp.dest(config.distCss));
});
gulp.task('images_dev', function () {
    return gulp.src(config.images)
        .pipe(gulp.dest(config.distImg))
        .pipe(reload({stream: true}));
});
gulp.task('images_build', function () {
    return gulp.src(config.images)
        .pipe(minimage())
        .pipe(gulp.dest(config.distImg));
});
gulp.task('html', function() {
    gulp.src(config.html)
        .pipe(changed(config.html))
        .pipe(replace('./css/main.css','./css/main.css?v='+config.v))
        .pipe(replace('./main.js','./main.js?v='+config.v))
        .pipe(gulp.dest(config.disthtml))
        .pipe(reload({stream: true}));
});
gulp.task('webpack',function() {
    return gulp.src(config.mainJs)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(config.dist))
        .pipe(reload({stream: true}));
});
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        port: 8888,
        open: false,
    });
    //监听html变化
    gulp.watch(config.html,['html']);
    //监听sass变化
    gulp.watch(config.sass,['styles_dev']);
    //监听images
    gulp.watch(config.simulate,['images_dev']);
});

//mobile构建
gulp.task('watch',['clean'],function () {
    gulp.start(['browserSync','webpack','html','images_dev','styles_dev']);
});
gulp.task('build',['clean'],function () {
    gulp.start(['browserSync','webpack','html','images_build','styles_build']);
});