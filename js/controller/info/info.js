(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval',function($scope,$window,$timeout,$interval){
		
		$scope.page = {
				idx : 3
			};

		//물놀이기구
		$scope.policy = [
			{
				url : '/img/play/play18.png',
				category : '물놀이기구',
				title : '2종+제트보트',
				desc : '',
				normalPrice : '',
				salePrice : '35,000',
				discountRate : ''
			},
			{
				url : '/img/play/play6.png',
				category : '물놀이기구',
				title : '3종',
				desc : '',
				normalPrice : '',
				salePrice : '29,000',
				discountRate : ''
			},
			{
				url : '/img/play/play19.png',
				category : '물놀이기구',
				title : '3종 + 제트보트',
				desc : '',
				normalPrice : '',
				salePrice : '45,000',
				discountRate : ''
			},
			{
				url : '/img/play/play4.png',
				category : '물놀이기구',
				title : '5종',
				desc : '',
				normalPrice : '',
				salePrice : '45,000',
				discountRate : ''
			},
			{
				url : '/img/play/play20.png',
				category : '물놀이기구',
				title : '5종 + 제트보트',
				desc : '',
				normalPrice : '',
				salePrice : '59,000',
				discountRate : ''
			},
			{
				url : '/img/play/play2.png',
				category : '물놀이기구',
				title : '무제한놀이기구',
				desc : '',
				normalPrice : '',
				salePrice : '60,000',
				discountRate : ''
			},
			{
				url : '/img/play/play14.png',
				category : '제트보트',
				title : '남이섬 일주',
				desc : '',
				normalPrice : '',
				salePrice : '1인 25,000',
				discountRate : ''
			},
			{
				url : '/img/play/play7.png',
				category : '제트보트',
				title : '남이섬 + 자라섬 일주',
				desc : '',
				normalPrice : '',
				salePrice : '1인 45,000',
				discountRate : ''
			},
			{
				url : '/img/play/play8.png',
				category : '모터보트',
				title : '남이섬 일주',
				desc : '',
				normalPrice : '',
				salePrice : '50,000',
				discountRate : ''
			},
			{
				url : '/img/play/play9.png',
				category : '모터보트',
				title : '남이섬 + 자라섬 일주',
				desc : '',
				normalPrice : '',
				salePrice : '70,000',
				discountRate : ''
			},
			{
				url : '/img/play/play10.png',
				category : '제트보트+놀이기구',
				title : '무제한놀이기구 + 제트보트',
				desc : '',
				normalPrice : '',
				salePrice : '70,000',
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
			{url : '/img/fac/fac1.png'},
			{url : '/img/fac/fac2.png'},
			{url : '/img/fac/fac3.png'},
			{url : '/img/fac/fac4.png'},
			{url : '/img/fac/fac5.png'},
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