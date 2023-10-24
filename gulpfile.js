const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixes = require('gulp-autoprefixer');
const scss = require('gulp-sass')(require('sass'));
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();

const clean = () => {
  return del(['dist']);
};

const resources = () => {
  return src('src/resources/**').pipe(dest('dist/assets'));
};

const styles = () => {
  return src('src/styles/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(concat('style.min.cs'))
    .pipe(
      autoprefixes({
        cascade: false,
      }),
    )
    .pipe(scss({ outputStyle: 'compressed', includePaths: ['node_modules'] }))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/styles'))
    .pipe(browserSync.stream());
};

// const styles = () => {
//   return src('src/styles/**/*.css')
//     .pipe(sourcemaps.init())
//     .pipe(concat('main.css'))
//     .pipe(
//       autoprefixes({
//         cascade: false,
//       }),
//     )
//     .pipe(sourcemaps.write())
//     .pipe(
//       cleanCSS({
//         level: 2,
//       }),
//     )
//     .pipe(dest('dist'))
//     .pipe(browserSync.stream());
// };

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(
      htmlMin({
        collapseWhitespace: true,
      }),
    )
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
};

const svgSprites = () => {
  return src('src/images/svg/**/*.svg')
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg',
          },
        },
      }),
    )
    .pipe(dest('dist/images'));
};

const images = () => {
  return src(['src/images/**/*.jpg', 'src/images/**/*.png', 'src/images/svg-js/*.svg', 'src/images/**/*.jpeg'])
    .pipe(image())
    .pipe(dest('dist/images'));
};

const scripts = () => {
  return src(['src/js/components/**/*.js', 'src/js/main.js'])
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['@babel/env'],
      }),
    )
    .pipe(concat('main.min.js'))
    .pipe(
      uglify({
        toplevel: true,
      }).on('error', notify.onError()),
    )
    .pipe(sourcemaps.write())
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
};

const watchFiles = () => {
  browserSync.init({
    host: '192.168.0.104',
    server: {
      baseDir: 'dist',
    },
  });
};

watch('src/**/*.html', htmlMinify);
watch('src/styles/**/*.scss', styles);
// watch('src/styles/**/*.css', styles);
watch('src/images/svg/**/*.svg', svgSprites);
watch('src/js/**/*.js', scripts);
watch('src/resources/**', resources);

exports.styles = styles;
exports.scripts = scripts;
exports.htmlMinify = htmlMinify;
exports.default = series(clean, resources, htmlMinify, scripts, styles, images, svgSprites, watchFiles);
