var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cache = require('gulp-cache'),
    cmq = require('gulp-combine-media-queries'),
    cssmin = require('gulp-cssmin'),
    del = require('del'),
    header = require('gulp-header'),
    imagemin = require('gulp-imagemin'),
    jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish'),
    jsvalidate = require('gulp-jsvalidate'),
    pkg = require('./package.json'),
    rename = require('gulp-rename'),
    rjs = require('gulp-requirejs'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass'),
    scsslint = require('gulp-scsslint'),
    sourcemaps = require('gulp-sourcemaps'),
    svg2png = require('gulp-svg2png'),
    uglify = require('gulp-uglify');

var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @copyright 2015 <%= pkg.author %>',
  ' */',
  ''
].join('\n');

var src = pkg.path + 'assets/src/';
var dist = pkg.path + 'assets/dist/';
var vendor = pkg.path + 'assets/vendor/';

function robots(env)
{
  gulp.task('robots:' + env, ['delete:robots'], function()
  {
    gulp.src('robots-' + env + '.txt')
      .pipe(rename('robots.txt'))
      .pipe(gulp.dest(pkg.path));
  });
};

function env(env)
{
  gulp.task(env, ['build'], function()
  {
    robots(env);
  });
}

gulp.task('delete:dist', function(callback)
{
  del([dist], callback);
});

gulp.task('delete:robots', function(callback)
{
  del([pkg.path + 'robots.txt'], callback);
});

gulp.task('styles', function()
{
  gulp.src(src + 'styles/**/*.scss')
    .pipe(scsslint({
      config: '.scss-lint.yml'
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(autoprefixer(['last 3 version']))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist + 'styles'))
    .pipe(cmq({
        log: false
    }))
    .pipe(cssmin({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest(dist + 'styles'));
});

gulp.task('scripts', function()
{
  gulp.src(src + 'scripts/**/*.js')
    .pipe(jsvalidate())
    .pipe(jscs())
    .pipe(jshint())
    .pipe(jshint.reporter(jshintStylish))
    .pipe(gulp.dest(dist + 'scripts'))
    .pipe(uglify())
    .pipe(gulp.dest(dist + 'scripts'));
});

gulp.task('rjs', function()
{
    rjs({
      baseUrl: src + 'scripts',
      name: 'main',
      out: 'main.build.js'
    })
    .pipe(uglify())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest(dist + 'scripts'));
});

gulp.task('svg', function()
{
  gulp.src(src + 'images/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest(dist + 'images'));
});

gulp.task('images', function()
{
  gulp.src(src + 'images/*')
    .pipe(cache(imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(dist + 'images'));
});

gulp.task('default', ['styles', 'scripts', 'svg', 'images'], function()
{
  gulp.watch(src + 'styles/**/*.scss', ['styles']);
  gulp.watch(src + 'scripts/**/*.js', ['scripts']);
  gulp.watch(src + 'images/*.svg', ['svg']);
  gulp.watch(src + 'images/*', ['images']);
});

gulp.task('build', ['delete:dist'], function(callback)
{
  runSequence('styles', 'scripts', 'rjs', 'svg', 'images', callback);
});

env('testing');
env('staging');
env('production');
