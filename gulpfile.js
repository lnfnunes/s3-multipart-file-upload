'use strict'

let clean = require('gulp-clean')

let uglify = require('gulp-uglifyjs')

let gulp = require('gulp')

let descriptor = require('./package.json')

let config = require('./package.json')

let mainNpmFiles = require('gulp-main-npm-files')()

config.path = {
  src: mainNpmFiles.concat([
    './src/main/**/*.js'
  ]),
  dist: './dist/'
}

gulp.task(
  `clean`,
  function () {
    return gulp
      .src(config.path.dist, {read: false})
      .pipe(clean())
  }
)

gulp.task(
  `build`, [`clean`],
  function () {
    return gulp
      .src(config.path.src)
      .pipe(uglify(descriptor.name + '.min.js'))
      .pipe(gulp.dest(config.path.dist))
  }
)

gulp.task(
  `watch`, function () {
    return gulp
      .watch(`${config.path.src}**/*.*`, [
        `${config.name}/build`
      ])
  }
)

gulp.task('default', ['build'])
