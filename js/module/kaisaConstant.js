(function(window, angular, undefined) {
	'use strict';
	var app = angular.module('baseConstant', []);
	app.factory('constant', ['$http','$filter',function($http,$filter) {
		return {
			dateVersion : $filter('date')(new Date(),'yyyyMMddHHmm').substring(0,11), //10분단위로 클라이언트 캐시 삭제
			version : '0.0.1', //version 업데이트시 클라이언트 캐시 삭제
			host : '',
			dev : (location.host.match('localhost')) ? false : true,
			title : (location.host.match('mobydic')) ? 'mobydic' : 'edge',
			titleName : (location.host.match('mobydic')) ? '모비딕' : '엣지',
			//minRoot : (gulpYn) ? '/min/' : '/', 
			keywords : 'Mobydic 수상레저',
			description : 'Mobydic 수상레저',
			favicon : '/img/favicon.ico',
			domain : '',
			cdomain : '',
			image : {
				noImage : '/img/common/noImage.png',
				host : '', //location.protocol + '//' + 'kaisa.co.kr' , 
				XL : '_1040',
				L : '_256',
				M : '_130',
				S : '_90'
			},
			extension : {
				api : '', //.api
				data : '.data',
				link : ''
			},
			dateFormat : 'yyyy-MM-dd hh:mm:ss'
		}
    }]);
})(window, window.angular);