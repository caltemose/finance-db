'use strict'

const gulp = require('gulp')
const del = require('del')
const pug = require('gulp-pug')
const sass = require('gulp-sass')
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create()
const runSequence = require('run-sequence')

const globals = require('./src/data/globals')

const config = {
    build: './build',
    views: './src/views/**/*',
    sass: './src/styles/main.sass',
    scripts: './src/scripts/index.js'
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

gulp.task('scripts', function () {
    return gulp.src(['src/scripts/index.js', 'src/scripts/import.js'])
        .pipe(babel({
            presets: ['latest']
        }))
        .pipe(gulp.dest(config.build + '/scripts'))
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

    gulp.watch('./src/styles/**/*.sass', ['sass'])
    gulp.watch('./src/views/**/*', ['views'])
    gulp.watch('./src/scripts/**/*', ['scripts'])
})
