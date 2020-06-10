(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common']);

	app.controller('BodyController',['$scope','$window','$timeout','$interval',function($scope,$window,$timeout,$interval){
		
		$scope.page = {
			idx : 3
		};
		
		//펜션 리스트
		$scope.pensionList = [
			{
				title : '다크엔젤',
				root : '/img/pension/room1/',
				img : [
					'1.jpg',
					'2.jpg',
					'3.jpg',
					'4.jpg',
					'5.jpg',
					'6.jpg',
					'7.jpg',
					'8.jpg',
					'9.jpg',
					'10.jpg',
					'11.jpg',
					'12.jpg',
					'13.jpg',
					'14.jpg'
				]
			},
			{
				title : '화이트샤인',
				root : '/img/pension/room2/',
				img : [
					'1.jpg',
					'2.jpg',
					'3.jpg',
					'4.jpg',
					'5.jpg',
					'6.jpg',
					'7.jpg',
					'8.jpg',
					'9.jpg',
					'10.jpg',
					'11.jpg',
					'12.jpg',
					'13.jpg'
				] 
			},
			{
				title : '핑크레이디',
				root : '/img/pension/room3/',
				img : [
					'1.jpg',
					'2.jpg',
					'3.jpg',
					'4.jpg',
					'5.jpg',
					'6.jpg',
					'7.jpg',
					'8.jpg',
					'9.jpg',
					'10.jpg',
					'11.jpg',
					'12.jpg'
				] 
			},
			{
				title : '라임오렌지/블루밍',
				root : '/img/pension/room4/',
				img : [
					'1.jpg',
					'2.jpg',
					'3.jpg',
					'4.jpg',
					'5.jpg',
					'6.jpg',
					'7.jpg',
					'8.jpg',
					'9.jpg',
					'10.jpg',
					'11.jpg',
					'12.jpg',
					'13.jpg',
					'14.jpg',
					'15.jpg'
				] 
			},
			{
				title : '산들바람',
				root : '/img/pension/room5/',
				img : [
					'1.jpg',
					'2.jpg',
					'3.jpg',
					'4.jpg',
					'5.jpg',
					'6.jpg',
					'7.jpg',
					'8.jpg',
					'9.jpg',
					'10.jpg',
					'11.jpg'
				] 
			}
		];
		
		//펜션
		$scope.pension = {
			idx : 0,
			roomIdx : 0,
			total : $scope.pensionList.length,
			click : function(idx){ this.idx = idx;},
			clickRoom : function(idx){ this.roomIdx = idx; this.idx = 0;},
			prev : function(){
				if(0 < this.idx){
					this.idx--;
				}else{
					this.idx = $scope.pensionList[this.roomIdx].img.length - 1;
				}
			},
			next : function(){
				if($scope.pensionList[this.roomIdx].img.length > (this.idx + 1)){
					this.idx++;
				}else{
					this.idx = 0;
				}
			}
		};
		$scope.pensionInterval;
		$scope.pensionIntervalStart = function(){
			$scope.pensionInterval = $interval(function(){
				$scope.pension.next();
			},3000);
		}
		$scope.pensionIntervalStop = function(){
			$interval.cancel($scope.pensionInterval);
		};
		$scope.pensionIntervalStart();
		
	}]);
})(window,window.angular);