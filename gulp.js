/**********Gulp Cconfiguration file*************/
//create a gulp instance
var gulp = require('gulp');
//create a browser sync instance.
var bs = require('browser-sync').create();
//create an instance of browsersync reload method
var reload = bs.reload;

gulp.task('browser-sync', function() {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
});
// Default task
gulp.task('default', ['watch', 'browser-sync']);
// Watch files for changes
gulp.task('watch', ['browser-sync'], function() {
    // Watch HTML files
    gulp.watch('*.html', reload);
    // Watch css files
    gulp.watch('assets/css/*', reload);
    // Watch JS files
    gulp.watch('assets/js/*', reload);
    // Watch image files
    gulp.watch('assets/images/*', reload);
});
