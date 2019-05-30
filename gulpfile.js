var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass'), function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("scss/*.scss", gulp.series('sass'))
    gulp.watch(["*.html", "js/*.js"]).on('change', browserSync.reload);

});

gulp.task('default',gulp.series('sass'), function(){
    // do nothing;
    return null;
});



gulp.task('default', ['serve']);

// THIS IS BROKEN AND IM FRUSTRATED
// wipe this from the earth and start from scratch with something like this: https://github.com/gulpjs/gulp/blob/master/docs/recipes/minimal-browsersync-setup-with-gulp4.md
// another day. This is old anyways 