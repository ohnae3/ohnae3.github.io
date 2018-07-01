(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common','datePicker']);
	
	app.controller('BodyController',['$scope','$filter','kaisaApi','$httpParamSerializerJQLike','$http','dateFilter','kaisaParam',function($scope,$filter,kaisaApi,$httpParamSerializerJQLike,$http,dateFilter,kaisaParam){
		
		$scope.page = {
			idx : 1
		};
		
	}]);
})(window,window.angular);