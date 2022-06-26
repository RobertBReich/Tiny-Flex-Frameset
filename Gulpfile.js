var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rimraf = require('gulp-rimraf');
var minify = require('gulp-minify');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');

var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var merge = require('merge-stream');

var markdown = require('gulp-markdown');
var injectPartials = require('gulp-inject-partials');
const stripCssComments = require('gulp-strip-css-comments');
var removeEmptyLines = require('gulp-remove-empty-lines');

/*
var imagemin = require('gulp-imagemin');
var imageminMozjpeg = require('imagemin-mozjpeg');
var imageminPngquant = require('imagemin-pngquant');
var imageminGiflossy = require('imagemin-giflossy');
var imageminSvgo = require('imagemin-svgo');

var browserSync = require('browser-sync').create();
*/

gulp.task('html', function () {

    gulp.src([
            '!./src/_*/', //exclude folders starting with '_'
            '!./src/sass',
            '!./src/_*/**/*',
            './src/**/*.html'],
        {base: './src/'})
        .pipe(htmlmin({collapseWhitespace: false}))

        .pipe(injectPartials({

            // removeTags: true // for production
        }))

        .pipe(gulp.dest('./dist/'));
});


gulp.task('serve', function () {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch('src/js/**/*.js', ['jsmerge']).on('change', browserSync.reload);
    gulp.watch('src/sass/**/*.scss', ['sasscompile']).on('change', browserSync.reload);
    gulp.watch("src/**/*.html", ['html']).on('change', browserSync.reload);
    gulp.watch("src/_html-partials/*.md", ['markdown']).on('change', browserSync.reload);

});

// Markdown.md stuff
gulp.task('markdown', function () {
    gulp.src('src/_html-partials/*.md')
        .pipe(markdown())
        .pipe(rename({
            extname: ".html"
        }))
        .pipe(gulp.dest('src/_html-partials/'));
});

gulp.task('partials', function () {

    gulp.src('src/**/*.html')
        .pipe(injectPartials({

            // removeTags: true // for production
        }))
        // .pipe(rename({
        //     suffix: '.partialized'
        // }))
        .pipe(gulp.dest('dist/'));

});

gulp.task('sasscompile', function () {

    gulp.src('src/sass/rr-flex/*.*')
        .pipe(sass())
        //.pipe(autoprefixer())
        .pipe(stripCssComments())
        .pipe(removeEmptyLines())

        .pipe(rename({
            basename: 'rr-flex'
        })        )
        
        .pipe(gulp.dest('dist/css/'))
        .pipe(cleanCSS())
        .pipe(minify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css/'))
        //.pipe(browserSync.stream());
});

// JS
gulp.task('jsclear', function () {
    return gulp.src('./js/scripts.js')
        .pipe(rimraf());
});

gulp.task('jsmerge', ['jsclear'], function () {
    gulp.src([
        /*
         Für mehr Kontrolle über die Reihenfolge
         sollte man hier die zu kompilierenden files auflisten
         */
        '!gulpfile.js',
        'src/js/_global-functions.js',
        'src/js/*.js'

    ])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('dist/js/'));

    gulp.src([
        /*
         Für mehr Kontrolle über die Reihenfolge
         sollte man hier die zu kompilierenden files auflisten
         */
        '!gulpfile.js',
        'src/js/vendor/*.js',
        'src/js/vendor/prism.js'
    ])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.stream());
});



gulp.task('default', ['html' , 'sasscompile' ]);




