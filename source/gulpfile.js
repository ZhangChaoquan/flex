var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('imagemin', function(){
  return gulp.src('images/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('../images'));
});

gulp.task('sass', function(){
  gulp.src('styles/main.scss')
      .pipe(sass())
      .pipe(prefix())
      .pipe(gulp.dest('../styles'));
});

gulp.task('copy-assets', function(){
  gulp.src('*.html')
      .pipe(gulp.dest('../'));
});

gulp.task('watch', function(){
  gulp.watch(['*.html'],['copy-assets']);
  gulp.watch(['styles/*.scss'],['sass']);
  gulp.watch(['images/*'],['imagemin']);
});

gulp.task('default', ['sass', 'copy-assets', 'imagemin','watch']);