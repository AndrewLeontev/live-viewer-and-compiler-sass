const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');

gulp.task('scss', () => {
    return gulp
        .src('dev/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass()) //compiling sass to css
        .pipe( // add prefixes to css for other browsers like tis: "-webkit..."
            autoprefixer(['last 15 versions', '>1%', 'ie 8', 'ie 7'], {
                cascade: true
            })
        )
        .pipe(cssnano()) // create min version css
        .pipe(gulp.dest('dist/css')) // output dir for file
        .pipe(browserSync.reload({ stream: true })); // reload page in browser
});

gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        notify: false
    });
});

gulp.task('default', ['browser-sync', 'scss'], () => {
    gulp.watch('dev/scss/**/*.scss', ['scss']); // compiling sass to css and reload page in browser if changed scss file
    gulp.watch('dist/*.html', browserSync.reload); // reload page if changed html
});