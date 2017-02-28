var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open = require('open');

var app = {
    srcPath: 'src/',
    devPath: 'build/', //整合后文件目录
    prdPath: 'dist/' //生产部署目录
};

gulp.task('lib', function() {
    gulp.src('bower_components/**/*.js')
        .pipe(gulp.dest(app.devPath + 'vendor'))
        .pipe(gulp.dest(app.prdPath + 'vendor'))
        .pipe($.connect.reload());
});
// 命令行输入gulp lib
// 读取bower_components文件夹下所有js文件，拷贝到devPath和prdPath

gulp.task('html', function() {
    gulp.src(app.srcPath + '**/*.html')
        .pipe(gulp.dest(app.devPath))
        .pipe(gulp.dest(app.prdPath))
        .pipe($.connect.reload());
});

gulp.task('json', function() {
    gulp.src(app.srcPath + 'data/**/*.json')
        .pipe(gulp.dest(app.devPath + 'data'))
        .pipe(gulp.dest(app.prdPath + 'data'))
        .pipe($.connect.reload());
});

gulp.task('less', function() {
    gulp.src(app.srcPath + 'style/index.less')
        .pipe($.plumber())
        .pipe($.less()) //编译less
        .pipe(gulp.dest(app.devPath + 'css'))
        .pipe($.cssmin()) //压缩less
        .pipe(gulp.dest(app.prdPath + 'css'))
        .pipe($.connect.reload());
});

gulp.task('js', function() {
    gulp.src(app.srcPath + 'script/**/*.js')
        .pipe($.plumber()) //在编译过程中不会因错误中止服务
        .pipe($.concat('index.js')) //合并js到index.js
        .pipe(gulp.dest(app.devPath + 'js'))
        .pipe($.uglify()) //压缩js
        .pipe(gulp.dest(app.prdPath + 'js'))
        .pipe($.connect.reload());
});

gulp.task('image', function() {
    gulp.src(app.srcPath + 'image/**/*')
        .pipe(gulp.dest(app.devPath + 'image'))
        .pipe($.imagemin())
        .pipe(gulp.dest(app.prdPath + 'image'))
        .pipe($.connect.reload());
});

gulp.task('build', ['image', 'js', 'less', 'json', 'html', 'lib']);
//合并执行 gulp build

gulp.task('clean', function() {
    gulp.src([app.devPath, app.prdPath])
        .pipe($.clean());
}); //删除build和dist文件夹

gulp.task('serve', ['build'], function() {
    $.connect.server({
        root: [app.devPath],
        livereload: true,
        port: 1234
    });
    open('http://localhost:1234'); //gulp serve  启动服务器

    gulp.watch('bower_components/**/*', ['lib']);
    gulp.watch(app.srcPath + '**/*.html', ['html']);
    gulp.watch(app.srcPath + 'data/**/*.json', ['json']);
    gulp.watch(app.srcPath + 'style/**/*.less', ['less']);
    gulp.watch(app.srcPath + 'script/**/*.js', ['js']);
    gulp.watch(app.srcPath + 'image/**/*', ['image']); //监视源文件自动构建
});

gulp.task('default', ['serve']); //命令行只需要输入gulp自动执行gulp default==>serve