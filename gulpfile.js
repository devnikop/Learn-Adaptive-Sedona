"use strict";

const gulp = require("gulp");
const rename = require("gulp-rename");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const server = require("browser-sync").create();
const del = require("del");
const flatten = require("gulp-flatten");

gulp.task("css", function() {
  return gulp
    .src("src/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("js", function() {
  return gulp.src("src/index.js").pipe(gulp.dest("build/"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy", function() {
  return gulp
    .src(["src/fonts/**/*.{woff,woff2}", "src/js/**"], {
      base: "src"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("image", function() {
  return gulp
    .src("src/**/*.{svg,png,jpeg,jpg}")
    .pipe(imagemin([imagemin.jpegtran({ progressive: true })]))
    .pipe(flatten())
    .pipe(gulp.dest("build/images"));
});

gulp.task("webp", () => {
  return gulp
    .src("src/**/*.{png,jpeg,jpg}")
    .pipe(webp())
    .pipe(flatten())
    .pipe(gulp.dest("build/images"));
});

gulp.task("html", function() {
  return gulp.src("src/*.html").pipe(gulp.dest("build"));
});

gulp.task("server", function() {
  server.init({
    server: "build/",
    notify: false
  });

  gulp.watch("src/**/*.scss", gulp.series("css"));
  gulp.watch("src/*.html", gulp.series("html", "refresh"));
  gulp.watch("src/*.js", gulp.series("js", "refresh"));
  gulp.watch(
    "src/**/*.{svg,webp,png,jpeg,jpg}",
    gulp.series("image", "refresh")
  );
});

gulp.task("refresh", function(done) {
  server.reload();
  done();
});

gulp.task(
  "build",
  gulp.series("clean", "copy", "image", "webp", "html", "css", "js")
);
gulp.task("start", gulp.series("build", "server"));
