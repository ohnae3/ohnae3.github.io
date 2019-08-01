(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval',function($scope,$window,$timeout,$interval){

		$scope.page = {
			idx : 0,
			popup : true
		};

		//메인비주얼
		$scope.visualList = [
			{url : '/img/main/visual3.jpg'},
			//{url : '/img/main/visual1.jpg'},
			{url : '/img/main/visual4.jpg'},
			//{url : '/img/main/visual21.png'},
			{url : '/img/main/visual22.png'}
			//{url : '/img/main/visual5.jpg'},
			//{url : '/img/main/visual2.jpg'}
		];
		$scope.visual = {
			idx : 0,
			total : $scope.visualList.length,
			click : function(idx){ this.idx = idx; },
			prev : function(){(0 < this.idx) ? this.idx-- : this.idx = this.total - 1;},
			next : function(){(this.total > this.idx + 1) ? this.idx++ : this.idx = 0;}
		};
		$scope.visualInterval;
		$scope.visualIntervalStart = function(){
			$scope.visualInterval = $interval(function(){
				$scope.visual.next();
			},2000);
		}
		$scope.visualIntervalStop = function(){
			$interval.cancel($scope.visualInterval);
		};
		$scope.visualIntervalStart();

		//놀이기구
		$scope.playList = [
			{url : '/img/play/play25.png'},
			{url : '/img/play/play15.png'},
			{url : '/img/play/play16.png'},
			{url : '/img/play/play13.png'},
			{url : '/img/play/play14.png'},
			{url : '/img/play/play15.png'},
			{url : '/img/play/play16.png'},
			{url : '/img/play/play17.png'},
			{url : '/img/play/play18.png'},
			{url : '/img/play/play19.png'},
			{url : '/img/play/play20.png'},
			{url : '/img/play/play21.png'},
			{url : '/img/play/play22.png'},
			{url : '/img/play/play23.png'},
			{url : '/img/play/play24.png'},
			{url : '/img/play/play1.png'},
			{url : '/img/play/play2.png'},
			{url : '/img/play/play3.png'},
			{url : '/img/play/play4.png'},
			{url : '/img/play/play5.png'},
			{url : '/img/play/play6.png'},
			{url : '/img/play/play7.png'},
			{url : '/img/play/play8.png'},
			{url : '/img/play/play9.png'},
			{url : '/img/play/play10.png'},
			{url : '/img/play/play11.png'},
			{url : '/img/play/play12.png'}
		];
		$scope.play = {
			idx : 0,
			total : $scope.playList.length,
			click : function(idx){ this.idx = idx; },
			prev : function(){(0 < this.idx) ? this.idx-- : this.idx = this.total - 1;},
			next : function(){(this.total > this.idx + 1) ? this.idx++ : this.idx = 0;}
		};
		$scope.playInterval;
		$scope.playIntervalStart = function(){
			$scope.playInterval = $interval(function(){
				$scope.play.next();
			},3000);
		}
		$scope.playIntervalStop = function(){
			$interval.cancel($scope.playInterval);
		};
		$scope.playIntervalStart();

		//주변시설
		$scope.facList = [
			{url : '/img/fac/fac12.png'},
			{url : '/img/fac/fac11.png'},
			{url : '/img/fac/fac10.png'},
			{url : '/img/fac/fac0.png'},
			{url : '/img/fac/fac9.png'},
			//{url : '/img/fac/fac1.png'},
			{url : '/img/fac/fac2.png'},
			{url : '/img/fac/fac3.png'},
			//{url : '/img/fac/fac4.png'},
			//{url : '/img/fac/fac5.png'},
			{url : '/img/fac/fac6.png'},
			{url : '/img/fac/fac7.png'},
			{url : '/img/fac/fac8.png'}
		];
		$scope.fac = {
			idx : 0,
			total : $scope.facList.length,
			click : function(idx){ this.idx = idx; },
			prev : function(){(0 < this.idx) ? this.idx-- : this.idx = this.total - 1;},
			next : function(){(this.total > this.idx + 1) ? this.idx++ : this.idx = 0;}
		};
		$scope.facInterval;
		$scope.facIntervalStart = function(){
			$scope.facInterval = $interval(function(){
				$scope.fac.next();
			},4000);
		}
		$scope.facIntervalStop = function(){
			$interval.cancel($scope.facInterval);
		};
		$scope.facIntervalStart();

	}]);
})(window,window.angular);