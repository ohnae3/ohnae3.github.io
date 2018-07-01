(function(window, angular, undefined){
	'use strict';
	var app = angular.module('KaisaApp',['common','datePicker']);
	
	app.controller('BodyController',['$scope','$filter','kaisaApi','$httpParamSerializerJQLike','$http','dateFilter','kaisaParam','kaisaStorage',function($scope,$filter,kaisaApi,$httpParamSerializerJQLike,$http,dateFilter,kaisaParam,kaisaStorage){
		
		$scope.roomList = kaisaStorage.getSessionStorage('roomList','json');
		$scope.getRoomList = function() {
			$http.jsonp(kaisaApi.roomList + $scope.jsonpParam({})).success(function(data){
				$scope.roomList = {
					version : $scope.constant.version,
					items : data
				};
				//20180626102355
				kaisaStorage.setSessionStorage('roomList',$scope.roomList,'json');
				console.log('getRoomList success : ', $scope.roomList);
		    }).error(function(data){
		        console.log('getRoomList error : ', data);
		    });
		};
		if(!$scope.roomList){
			$scope.getRoomList();
		}else{
			if($scope.constant.version != $scope.roomList.version){ //sessionStorage refresh
				$scope.getRoomList();
			}
		}
		
		
		$scope.page = {
			idx : 1
		};
		
		/*
		 * date
		 * */
		$scope.date = {
			start : null,
			end : null
		}
		
		/*
		 * TEST date
		 * */
		$scope.option = {
			time : [
				{id: '7', name: '7시'},
				{id: '8', name: '8시'},
				{id: '9', name: '9시'},
				{id: '10', name: '10시'},
				{id: '11', name: '11시'},
				{id: '12', name: '12시'},
				{id: '13', name: '13시'},
				{id: '14', name: '14시'},
				{id: '15', name: '15시'},
				{id: '16', name: '16시'},
				{id: '17', name: '17시'},
				{id: '18', name: '18시'}
		    ]
		};
		
		//model
		$scope.RESERVATION = {
			NAME: '최재호',
            NO : '4',
			DATE: '',
			TIME: '7',
			PERSONNEL: '2',
			PHONE: '',
			EMAIL: '',
			NOTICE: '비고',
			PASSWORD: '',
			PASSWORD2: '',
			CAPTCHA: ''
		};

		$scope.date.startDate = $filter('date')(new Date(),'yyyy-MM-dd')
		
		//예약 날짜
		$scope.$watch('reservationDate.start.date', function(val){
			if(val){
				$scope.date.startDate = $filter('date')(val,'yyyy-MM-dd');
				$scope.RESERVATION.DATE = $filter('date')(val,'yyyy-MM-dd');
			}
        },true);
		
		// 입력필드 상태값
		$scope.formVaild = {
			NAME: false,
			PASSWORD: false
		};
		
		/*$http.jsonp(kaisaApi.skiReservation + $scope.jsonpParam($scope.RESERVATION)).success(function(data){
	        console.log(data);
	    }).error(function(data){
	        console.log('API error');
	    });*/
		
		
		//예약하기
		$scope.reservation = function() {
			$http.jsonp(kaisaApi.skiReservation + $scope.jsonpParam($scope.RESERVATION)).success(function(data){
		        console.log(data);
		    }).error(function(data){
		        console.log('API error');
		    });
		};
		
		
		
		
		
	}]);
})(window,window.angular);