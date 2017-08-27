var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var pump = require('pump');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var flatten = require('gulp-flatten');
var browserSync = require('browser-sync').create();
// var connect = require('gulp-connect-php');
// var bower = require('gulp-bower');

var reload      = browserSync.reload;
var paths = {
  bowerDir: './bower_components',
  sassDir: './resources/sass',
  jsDir: './resources/js',
  fontDir: './resources/fonts',
  imageDir: './resources/images/',
  rootDir: ['./assets'],
};

// gulp.task('bower', function() {
//     return bower()
//       .pipe(gulp.dest(paths.bowerDir));
// });

gulp.task('icons', function() {
    return gulp.src([
        // paths.bowerDir + '/bootstrap-sass/assets/fonts/bootstrap/**.*',
        // paths.bowerDir + '/font-awesome/fonts/**.*'
      ])
        .pipe(gulp.dest('./public/fonts'));
});

gulp.task('commonJS', function() {
    return gulp.src([
        paths.bowerDir + '/jquery/dist/jquery.min.js',
        paths.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.min.js'
      ])
        .pipe(gulp.dest(paths.rootDir + '/js'));
});

gulp.task('installscript', function() {
  gulp.src('bower_components/**/*.min.js')
    .pipe(flatten())
    .pipe(gulp.dest('assets/js'));
});

gulp.task('installstyle', function() {
  gulp.src(['bower_components/**/*.css'])
  .pipe(flatten())
  .pipe(gulp.dest('assets/css'));
});
 
// gulp.task('compress', function (cb) {
//   pump([
//         gulp.src('resources/js/**/*.js'),
//         uglify(),
//         gulp.dest('assets/js')
//     ],
//     cb
//   );
// });

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./assets"
    });

    gulp.watch("./resources/sass/*.scss", ['sass']);
    gulp.watch("./assets/*.html").on("change", reload);
});

gulp.task('sass', function(){
  return gulp.src('resources/sass/**/*.scss')
    .pipe(sass({
      sourceComments: 'map',
      sourceMap: 'sass',
      outputStyle: 'nested'
    }).on('error', sass.logError))
    // .pipe(minifyCSS())
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
gulp.task('compress-sass', [ 'compress', 'sass' ]);
