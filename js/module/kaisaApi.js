(function(window, angular, undefined) {
	'use strict';
	var app = angular.module('api', ['baseConstant']);

	app.service('kaisaApi', ['constant',function(constant) {
		var apiUrl = location.protocol + '//' + 'admin.mobydic.co.kr',
			ext = constant.extension.api;
		
		this.skiList = apiUrl + '/api/ski/list.php' + ext;
		this.skiReservation = apiUrl + '/api/ski/reservation.php' + ext;
		
		this.pensionList = apiUrl + '/api/pension/list.php' + ext;
		this.pensionReservation = apiUrl + '/api/pension/reservation.php' + ext;
		
		//test
		this.roomList = apiUrl + '/api/pension/roomList.php' + ext;
    }]);
})(window, window.angular);