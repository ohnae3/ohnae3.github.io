(function(window, angular, undefined) {
	'use strict';
	var app = angular.module('url', ['baseConstant']);
	/**
	 * 각 업무카테고리별 '/' 제거 후 카멜표기법으로 값을 생성
	 */
	app.service('kaisaUrl', ['constant',function(constant) {
		var protocol = (constant.host != '') ? 'http://' + constant.host : '',
			protocol_SSL = (constant.host != '') ? 'http://' + constant.host : '', //test https
			ext = constant.extension.link;
		
		this.main = protocol + '/' + ext;
		this.reservation = protocol + '/reservation' + ext;
		this.qna = protocol + '/qna' + ext;
		//this.reservation = 'javascript:alert("페이지 준비중입니다.")';
		this.info = protocol + '/info' + ext;
		this.pension = protocol + '/pension' + ext;
		this.nearPension = protocol + '/nearPension' + ext;
		
		//this.reservation = protocol_SSL + '/reservation' + ext;
    }]);
})(window, window.angular);