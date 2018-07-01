(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);
	
	app.controller('BodyController',['$scope','$filter','kaisaApi','$httpParamSerializerJQLike','$http','dateFilter','kaisaParam',function($scope,$filter,kaisaApi,$httpParamSerializerJQLike,$http,dateFilter,kaisaParam){
		
		$scope.page = {
			idx : 2
		};
		
	}]);
})(window,window.angular);