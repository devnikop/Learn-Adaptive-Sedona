"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var del = require("del");

gulp.task("css", function() {
  return gulp
    .src("source/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy", function() {
  return gulp
    .src(["source/fonts/**/*.{woff, woff2}", "source/img/**", "source/js/**"], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("html", function() {
  return gulp.src("source/*.html").pipe(gulp.dest("build"));
});

gulp.task("server", function() {
  server.init({
    server: "build/"
  });

  gulp.watch("source/**/*.scss", gulp.series("css", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function(done) {
  server.reload();
  done();
});

gulp.task("build", gulp.series("clean", "copy", "html", "css"));
gulp.task("start", gulp.series("build", "server"));
