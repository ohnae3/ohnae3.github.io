(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval',function($scope,$window,$timeout,$interval){
		
		$scope.page = {
			idx : 4
		};
		
		
		
	}]);
})(window,window.angular);