'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var del = require('del');

const KAISA = {
	JS : {
		MIN:[
			'js/module/kaisaApi.js',
			'js/module/kaisaCommon.js',
			'js/module/kaisaConstant.js',
			'js/module/kaisaDirective.js',
			'js/module/kaisaFilter.js',
			'js/module/kaisaStorage.js',
			'js/module/kaisaUrl.js',
			'js/module/kaisaUtil.js'
	    ]
	}
};
const DEST = {
	JS: 'js/min'
};
gulp.task('default', ['jsMin','watch'], () => {
    gutil.log('Gulp Watcher is running...');
});
gulp.task('watch', () => {
    let watcher = {
    	jsMin: gulp.watch(KAISA.JS.MIN, ['jsMin'])
    };
    let notify = (event) => {
        gutil.log('File', gutil.colors.yellow(event.path), 'was', gutil.colors.magenta(event.type));
    };
    for(let key in watcher) {
        watcher[key].on('change', notify);
    }
});
gulp.task('jsMin', () => {
    return gulp.src(KAISA.JS.MIN).pipe(concat('kaisa.js')).pipe(uglify()).pipe(gulp.dest(DEST.JS));
});