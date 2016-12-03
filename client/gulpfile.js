'use strict'

const gulp = require('gulp')
const del = require('del')
const pug = require('gulp-pug')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const runSequence = require('run-sequence')

const babelify = require('babelify')
const browserify = require('browserify')
const es = require('event-stream')
const source = require('vinyl-source-stream')
const rename = require('gulp-rename')

const globals = require('./src/data/globals')

const config = {
    build: './build',
    views: './src/views/**/*',
    sass: './src/styles/main.sass',
    scripts: [
        './src/scripts/index.js',
        './src/scripts/import.js',
        './src/scripts/view-all.js'
    ]
}

gulp.task('clean', function (next) {
    return del(config.build)
})

gulp.task('views', function () {
    return gulp.src(config.views)
        .pipe(pug({
            data: globals
        }))
        .pipe(gulp.dest(config.build))
        .pipe(browserSync.stream())
})

gulp.task('styles', function () {
    return gulp.src(config.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(config.build + '/styles'))
        .pipe(browserSync.stream())
})

gulp.task('scripts', function() {
    // map them to our stream function
    var tasks = config.scripts.map(function(entry) {
        return browserify({
                entries: [entry]
            })
            .transform(babelify, {
                presets: ['latest']
            })
            .bundle()
            .pipe(source(entry))
            .pipe(rename({
                dirname: './scripts',
                extname: '.bundle.js'
            }))
            .pipe(gulp.dest(config.build))
            .pipe(browserSync.stream())
        });
    // create a merged stream
    return es.merge.apply(null, tasks);
});

gulp.task('financials', function () {
    return gulp.src('./src/financial-data/**/*')
        .pipe(gulp.dest('./build/financial-data'))
        .pipe(browserSync.stream())
})

gulp.task('build', function (next) {
    runSequence('clean', ['views', 'styles', 'scripts'], next)
})

gulp.task('default', ['build'], function (next) {
    browserSync.init({
        server: {
            baseDir: './build'
        }
    })

    gulp.watch('./src/financial-data/**/*', ['financials'])
    gulp.watch('./src/styles/**/*.sass', ['styles'])
    gulp.watch('./src/views/**/*', ['views'])
    gulp.watch('./src/scripts/**/*', ['scripts'])
})
