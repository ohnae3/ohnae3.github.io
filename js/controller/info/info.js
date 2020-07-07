(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval',function($scope,$window,$timeout,$interval){

		$scope.page = {
			idx : 2
		};

		/**
		 종일 무제한+제트보트 40000
		 3시간 무제한 29000
		 3시간 무제한+제트보트 35000
		 오전 무제한 23000
		 오후 무제한 33000
		 종일 무제한 35000
		 놀이기구3종+제트보트 29000
		 놀이기구5종+제트보트 39000
		 오전무제한+제트보트 33000
		 오후무제한+제트보트 43000
		 제트보트1회 15000
		 입장권 9000
		 무제한바베큐 20000
		 */
		$scope.policy = [
			{
				url : '/img/play/play8.png',
				title : '종일 무제한+제트보트', salePrice : '40000'
			},
			{
				url : '/img/play/play9.png',
				title : '3시간 무제한', salePrice : '29000'
			},
			{
				url : '/img/play/play10.png',
				title : '3시간 무제한+제트보트', salePrice : '35,000'
			},
			{
				url : '/img/play/play4.png',
				title : '오전 무제한', salePrice : '23000'
			},
			{
				url : '/img/play/play20.png',
				title : '오후 무제한', salePrice : '33000'
			},
			{
				url : '/img/play/play2.png',
				title : '종일 무제한', salePrice : '35000'
			},
			{
				url : '/img/play/play14.png',
				title : '놀이기구3종+제트보트', salePrice : '29000'
			},
			{
				url : '/img/play/play7.png',
				title : '놀이기구5종+제트보트', salePrice : '39000'
			},
			{
				url : '/img/play/play14.png',
				title : '오전무제한+제트보트', salePrice : '33000'
			},
			{
				url : '/img/play/play9.png',
				title : '오후무제한+제트보트', salePrice : '43000'
			},
			{
				url : '/img/play/play1.png',
				title : '제트보트1회', salePrice : '15000'
			},
			{
				url : '/img/play/play4.png',
				title : '입장권', salePrice : '9000'
			},
			{
				url : '/img/play/play5.png',
				title : '무제한바베큐', salePrice : '20000'			
			}
		];

		//놀이기구
		$scope.playList = [
			{url : '/img/play/play25.png'},
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
			{url : '/img/play/play12.png'},
			{url : '/img/play/play13.png'},
			{url : '/img/play/play14.png'},
			{url : '/img/play/play15.png'},
			{url : '/img/play/play16.png'},
			{url : '/img/play/play17.png'},
			{url : '/img/play/play18.png'},
			{url : '/img/play/play19.png'},
			{url : '/img/play/play20.png'}
		];
		$scope.play = {
			idx : 0,
			total : $scope.playList.length,
			click : function(idx){ this.idx = idx; },
			prev : function(){(0 < this.idx) ? this.idx-- : this.idx = this.total - 1;},
			next : function(){(this.total > this.idx + 1) ? this.idx++ : this.idx = 0;}
		};

		//주변시설
		$scope.facList = [
			{url : '/img/fac/fac12.png'},
			{url : '/img/fac/fac10.png'},
			{url : '/img/fac/fac11.png'},
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

	}]);
})(window,window.angular);