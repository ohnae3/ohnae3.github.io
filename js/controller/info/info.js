(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval',function($scope,$window,$timeout,$interval){

		$scope.page = {
				idx : 3
			};



		/**
		 * 무제한+제트보트 45,000
		 * 3시간 무제한+제트보트 35,000
		 * 4시간 무제한+제트보트 40,000
		 * 종일 무제한 39,000
		 * 3시간 무제한 29,000
		 * 4시간 무제한 35,000
		 * 5종(보장형)+제트 42,000
		 * 5종(보장형)+제트 37,000
		 * 제트보트 남이섬일주 15,000
		 * 초보강습 지상교육2회 라이딩2회 50,000
		 * 수상스키 웨이크보드 20,000
		 * 무제한 바베큐 1인 20,000
		 * 닭갈비 1인분 9,000
		 */
		$scope.policy = [
			{
				url : '/img/play/play8.png',
				category : '제트보트',
				title : '무제한+제트보트',
				desc : '',
				normalPrice : '',
				salePrice : '45,000',
				discountRate : ''
			},
			{
				url : '/img/play/play9.png',
				category : '',
				title : '3시간 무제한+제트보트',
				desc : '',
				normalPrice : '',
				salePrice : '35,000',
				discountRate : ''
			},
			{
				url : '/img/play/play10.png',
				category : '',
				title : '4시간 무제한+제트보트',
				desc : '',
				normalPrice : '',
				salePrice : '40,000',
				discountRate : ''
			},
			{
				url : '/img/play/play4.png',
				category : '',
				title : '종일 무제한',
				desc : '',
				normalPrice : '',
				salePrice : '39,000',
				discountRate : ''
			},
			{
				url : '/img/play/play20.png',
				category : '',
				title : '3시간 무제한',
				desc : '',
				normalPrice : '',
				salePrice : '29,000',
				discountRate : ''
			},
			{
				url : '/img/play/play2.png',
				category : '',
				title : '4시간 무제한',
				desc : '',
				normalPrice : '',
				salePrice : '35,000',
				discountRate : ''
			},
			{
				url : '/img/play/play14.png',
				category : '',
				title : '5종(보장형)+제트',
				desc : '',
				normalPrice : '',
				salePrice : '42,000',
				discountRate : ''
			},
			{
				url : '/img/play/play7.png',
				category : '',
				title : '4종(보장형)+제트',
				desc : '',
				normalPrice : '',
				salePrice : '37,000',
				discountRate : ''
			},
			{
				url : '/img/play/play14.png',
				category : '',
				title : '제트보트 남이섬일주',
				desc : '',
				normalPrice : '',
				salePrice : '15,000',
				discountRate : ''
			},
			{
				url : '/img/play/play9.png',
				category : '',
				title : '초보강습 지상교육2회 라이딩2회',
				desc : '',
				normalPrice : '',
				salePrice : '50,000',
				discountRate : ''
			},
			{
				url : '/img/play/play1.png',
				category : '',
				title : '수상스키 웨이크보드',
				desc : '',
				normalPrice : '',
				salePrice : '20,000',
				discountRate : ''
			},
			{
				url : '/img/play/play4.png',
				category : '',
				title : '무제한 바베큐 1인',
				desc : '',
				normalPrice : '',
				salePrice : '20,000',
				discountRate : ''
			},
			{
				url : '/img/play/play5.png',
				category : '',
				title : '닭갈비 1인분',
				desc : '',
				normalPrice : '',
				salePrice : '9,000',
				discountRate : ''
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