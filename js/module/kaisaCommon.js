(function(window, angular, undefined){
	'use strict';
	/**
	 * Container/IoC
	 * Dependency Injection module (플러그인 사용금지, 모듈단위로 분리하기 쉽게 코딩한다.)
	 */
	var moduleArr = ['directive','filter','util','url','api','baseConstant','storage'];
	var admin = false;
	if(admin){
		//moduleArr.push('grid');
	}
	var app = angular.module('common',moduleArr).config(['$httpProvider','$locationProvider','$compileProvider', function($httpProvider,$locationProvider,$compileProvider){
		$httpProvider.defaults.useXDomain = true;
		//$compileProvider.debugInfoEnabled(false);
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        $httpProvider.interceptors.push('httpInterceptor');
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/); //for href : unsafe
		$locationProvider.html5Mode({
           enabled : false, //for ie9 이하 (!browser.isIe9) -> 갤럭시 탭 error -> false
           requireBase : false,
           rewriteLinks : false
        });
    }]);
	/**
	 * @param ver : pc,mobile
	 * @param lang : kor
	 * @param ch : 유입 채널 정보
	 * 공통 파라메터는 발생 시 유실되지 않는다.
	 */
	app.service('commonParam', ['kaisaParam',function(kaisaParam) {
		var self = this;
		var commonParamArray = ['ver','lang','ch'];
		for(var i in commonParamArray){
			if(kaisaParam.getParam(commonParamArray[i])){
				self[commonParamArray[i]] = kaisaParam.getParam(commonParamArray[i]);
			}
		}
	}]);
	/**
	 * 공통 로딩
	 * 공통 API 파라메터 처리
	 * 공통 에러처리 (TODO 600 세션 에러)
	 */
	app.factory('httpInterceptor',['$rootScope','commonParam','$q','$httpParamSerializerJQLike',function($rootScope,commonParam,$q,$httpParamSerializerJQLike) {
		var requestCount = 0, responseCount = 0;
		$rootScope.loading = {
			active : false,
			error : false,
			first : false,
			target : null,
			status : 200,
			message : null
		}
		return {
			request : function(request){
				requestCount++;
				$rootScope.loading.active = true;
				if(request.url && request.url.search('api') != -1){
					request.url = request.url + ((request.url.search(/\?/) != -1) ? '&' : '?') +  $httpParamSerializerJQLike(commonParam);
				}
				return request;
			},
			requestError : function(error) {
				console.debug('request error');
				return $q.reject(error);
			},
			response : function(response){
				responseCount++;
				if(requestCount == responseCount){
					$rootScope.loading.first = true;
					$rootScope.loading.active = false;
				}
				return response;
			},
			responseError : function(error) {
				//$rootScope.loading.message = error.data.message;
				//$rootScope.loading.status = error.status;
				return $q.reject(error);
			}
		};
	}]);
	app.controller('KaisaController',['$rootScope', 'commonParam' ,'$window','$scope','$location','$compile','$http','$timeout','kaisaUrl','kaisaParam','constant','kaisaApi','kaisaStorage','$httpParamSerializerJQLike',
	                          function($rootScope ,  commonParam  , $window , $scope , $location , $compile , $http , $timeout , kaisaUrl , kaisaParam , constant , kaisaApi , kaisaStorage , $httpParamSerializerJQLike){

		/*if(location.protocol == 'https:'){
			location.href = 'http://' + location.hostname + location.pathname + location.search; //ssl 사용페이지 없음
		}*/

		$scope.jsonpParam = function(param){
			return '?callback=JSON_CALLBACK&' + $httpParamSerializerJQLike(param); //jsonp 는 param 을  object 로 담을 수 없다
		};

		/**
		 * for 어드민
		 */
		$scope.grid = new Array();
		/**
		 * 상수, 환경변수
		 */
		$scope.constant = constant;
		/**
		 * 이미지
		 */
		$scope.image = constant.image;
		/**
		 * browser info
		 */
		var browser = {
			isIe : false,
			isIe8 : false,
			isIe9 : false,
			userAgent : window.navigator.userAgent
		};
		if(browser.userAgent.indexOf('MSIE ') > 0 || !!browser.userAgent.match(/Trident.*rv\:11\./)){
			browser.isIe = true;
			if(browser.userAgent.substring(0,11) == 'Mozilla/4.0' || browser.userAgent.indexOf('MSIE 9.0') > 0){
				browser.isIe9 = true;
			}
			if(!document.addEventListener){
				browser.isIe8 = true;
			}
		};
		$scope.browser = browser;
		/**
		 * device info TO-DO
		 */
		var device = {
			mobile : false,
			android : false,
			tablet : false,
			ios : false,
			ipad : false
		};
		$scope.device = device;
		/**
		 * commonParam , searchParam , http POST format
		 */
		$scope.commonParam = commonParam;
		$scope.searchParam = {
			params : {}
		};
		$scope.xhrConfig = {
			headers: {
			    'Content-Type': 'application/x-www-form-urlencoded'
			  //'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' //(post form-data not works)
			}
        };
		$scope.jsonpParam = function(param){
			return '?callback=JSON_CALLBACK&' + $httpParamSerializerJQLike(param); //jsonp 는 param 을  object 로 담을 수 없다
		};
		$scope.menu = [
			{title:'모비딕', url:'main'},
			{title:'예약게시판', url:'reservation'},
			{title:'1:1문의', url:'qna'},
			{title:'요금안내', url:'info'},
			{title:'펜션안내', url:'pension'},
			{title:'근처펜션', url:'nearPension'}
		];
		/**
		 * @param param : {
		 *     url : kaisaUrl 에 있는 링크값과 매치해야 한다.
		 *     query : object 로 파라메터(쿼리스트링)를 받는다.
		 *     href : data-ng-href 를 사용할때 링크를 리턴해준다.
		 *     reset : 공통 파라메터를 지운다. (TODO storage 제거)
		 * }
		 * @return data-ng-href & data-ng-click
		 */
		$scope.commonLink = function(o){
			if(typeof kaisaUrl[o.url] == 'undefined'){ //잘못 된 링크는 화면 console 에 알려준다.
				console.log('%c ' + o.url + ' %c ( 존재하지 않는 링크값입니다. )','color:#52c74f;','color:#469a44;')
				return false;
			}
			if(typeof o != 'object'){
				o = new Object();
			}
			var param = $httpParamSerializerJQLike($.extend({}, $scope.commonParam, o.param));
			var link = kaisaUrl[o.url] + ((param) ? '?' : '') + param;
			if(o.reset){
				link = kaisaUrl[o.url];
			}
			if(o.href){
				return link;
			}else{
				location.href = link;
				return true;
			}
		};
		/**
		 * popup : 레이어 팝업 (option extend)
		 * TODO param 처리
		 */
		$scope.popup = {
			active : false,
			option : {},
			optionDefault : {
				dim : true,
				dimClick : true,
				target : null
			},
			open : function(option){
				this.option = $.extend({}, this.optionDefault, option);
				this.active = true;

				var directiveName = this.option.target.replace(/([a-z])([A-Z])/g,'$1-$2').toLowerCase();

				angular.element('#popupContent').empty().append($compile(angular.element('<div '+directiveName+'></div>'))($scope));
			},
			close : function(option){
				if(option.target == 'dim' && !$scope.popup.option.dimClick){
					return;
				}
				this.option = this.optionDefault;
				this.active = false;
			}
		};
		$scope.cs = {
			bankNm : '농협 (최원호)',
			bankNo : '301-0215-2956-21',
			telNm1 : '대표전화',
			telNo1 : '010-5678-2904',
			telNm2 : '',
			telNo2 : '',
		};
		/**
		 * alert 경고 메세지 레이어 (option extend)
		 */
		$scope.alert = {
			active : false,
			option : {},
			optionDefault : {
				type : 'text',
				style : {},
				confirm : false,
				title : null,
				message : null,
				focus : null,
				button : {
					ok : '확인' ,
					cancel : '취소'
				},
				callback : null,
				cancelCallback : null,
				override : false,
				target : null
			},
			open : function(option){
				this.option = $.extend({}, this.optionDefault, option);
				this.active = true;
				angular.element(document).on('keypress.alert',function(e){
				    if (e.which == 13) {
				    	if($scope.alert.option.callback != null){
							$scope.alert.option.callback();
							$scope.alert.close();
						}else{
							$scope.alert.close();
						}
				    	$scope.$apply();
				    	angular.element(document).off('keypress.alert');
				    	e.preventDefault();
				    	e.stopPropagation();
				    }
				});
			},
			close : function(option){
				this.option = this.optionDefault;
				this.active = false;
				angular.element(document).off('keypress.alert');
			}
		};
		/**
		 * help 말풍선 레이어
		 */
		$scope.help = {
			active : false,
			html : '',
			open : function(){
				this.active = true;
			},
			close : function(){
				this.active = false;
			}
		};
		/**
		 * 공통 로딩
		 * TODO 이미지 loading
		 */
		$scope.loading = $rootScope.loading;
		$rootScope.$watch('loading', function(loading){
			$scope.loading = loading;
			if(loading.status == 419){ // session error
        		$scope.commonLink('login',{returnURL : location.href},'move');
        		$scope.loading.active = false;
        	}
			if(loading.status != 200){
        		console.debug('error : ' + loading.status);
        		$scope.loading.active = false;
        	}
			if(loading.first){
				$scope.historyChecker();
			}
			try {
				if(loading.message.search("SQLSTATE[23000]")){
					var column = loading.message.substring(loading.message.match("for key '").index + 9,loading.message.match("_UNIQUE").index);
					var value = loading.message.substring(loading.message.match("Duplicate entry '").index + 17,loading.message.match("' for key").index);
					$scope.alert.open({message:'"' + column + '" 컬럼에  "' + value + '"값이 중복됩니다.'});
				}

			} catch (e) {
			}
        },true);
		/*
		 * Temp
		 * */
		$timeout(function(){
			$scope.loading.first = true;
		},100);
		/**
		 * history API controller
		 */
		$scope.historyChecker = function(){
			if($scope.pageInfo.samePage){
				$timeout(function(){
					$scope.pageInfo.scrollPosition();
				},100);
			}
		}
		$scope.pageInfo = {
			scrollTop: '0',
			href : location.href,
			data : {},
			samePage : false,
			scrollPosition : function(){
				window.scrollTo(0,this.scrollTop);
			}
		};
		$scope.pageInfoSession = kaisaStorage.getSessionStorage('pageInfo','json');
		if($scope.pageInfoSession){
			if($scope.pageInfoSession[1].href == location.href){
				$timeout(function(){
					angular.element('body').scrollTop($scope.pageInfoSession[1].scrollTop);
				},0);
			}
			while ($scope.pageInfoSession.length > 2) {
				$scope.pageInfoSession.pop();
			}
		};
		$window.addEventListener('beforeunload', function() {
			$scope.pageInfo.scrollTop = document.body.scrollTop;
			if($scope.pageInfoSession){
				$scope.pageInfoSession.unshift($scope.pageInfo);
			}
			kaisaStorage.setSessionStorage('pageInfo',$scope.pageInfoSession,'json');
		});

		/**
		 * 공통 이벤트 관리
		 */
		$scope.window = {
			width : angular.element($window).width(),
			height : angular.element($window).height(),
			scrollTop : angular.element($window).scrollTop(),
			nav : function(){
				if(this.scrollTop <= 150){
					angular.element('body,html').animate({scrollTop : $scope.window.height });
				}else{
					angular.element('body,html').animate({scrollTop : 0});
				}
			}
		};
		angular.element($window).on('resize',function(){
			$scope.$apply(function(){
				$scope.window.width = angular.element($window).width();
				$scope.window.height = angular.element($window).height();
			});
		});
		angular.element($window).on('scroll',function(){
			$scope.$apply(function(){
				$scope.window.scrollTop = angular.element($window).scrollTop();
			});
		});
	}]);
})(window,window.angular);