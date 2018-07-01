(function(window, angular, undefined) {
	'use strict';
	var app = angular.module('filter', []);
	app.filter('trustHtml',['$sce', function($sce) {
    	return function(value) {
    		return value ? $sce.trustAsHtml(value.replace(/\n/g,'<br>')) : '';
    	}
    }]);
	//유니크 items
	app.filter('unique', [function(){
        return function(data, propertyName) {
            if (angular.isArray(data) && angular.isString(propertyName)) {
            	var results = [];
            	var keys = {};
            	for (var i = 0; i < data.length; i++) {
            		var val = data[i][propertyName];
            		if (angular.isUndefined(keys[val])) {
            			keys[val] = true;
            			results.push(val);
            		}
            	}
            	return results;
            } else {
            	return data;
            }
        }
    }]);
})(window, window.angular);