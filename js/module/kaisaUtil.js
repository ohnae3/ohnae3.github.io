(function(window, angular, undefined) {
	'use strict';
	var app = angular.module('util', []);
	//regular expression
	app.service('kaisaRegex', [function() {
		this.blankAll = /^\s+|\s+$/g; //공백만 입력 되어 있을 경우
		this.blank = /[\s]/g; //중간 공백
		this.mix = /^(?=.*[a-zA-Z])(?=.*[`~!@#$%^*+=-?:;.,|\\\{\}\[\]\(\)\/])(?=.*[0-9]).{6,15}$/; //영문, 숫자, 특수문자 혼합 확인 정규식
		this.img = /([^\s]+(?=\.(jpg|gif|png))\.\2)/; // jpg, gif 또는 png 확장자
		this.duStr = /(\w)\1\1/; //문자 중복
		this.ptNum =  /(012)|(123)|(234)|(345)|(456)|(567)|(678)|(789)/; //연속 숫자 페턴
		this.num = /[0-9]/g; // 숫자, 전역
		this.eng = /[a-z]/gi; // 알파벳, 대소문자 무시, 전역
		this.spe = /[~!@#$%^&*()_+{}":?><\]\[';/.,`|\\\-=]/g; // 모든 특수문자
	}]);
	app.service('kaisaUtil', ['kaisaRegex', function(kaisaRegex) {
		/**
		 * password check
		 */
		this.validatePassword = function($scope, val) {
			var num = val.search(kaisaRegex.num),
				eng = val.search(kaisaRegex.eng),
				spe = val.search(kaisaRegex.spe);
			var result = {
				success: true,
				message: ''
			};
			if (kaisaRegex.blankAll.test(val) || kaisaRegex.blank.test(val)) {
				console.debug('공백은 사용할 수 없습니다.');
				result.success = false;
				return result;
			}
			else if (val.search(kaisaRegex.duStr) != -1) {
				console.debug('동일한 문자를 3번 이상 반복 할 수 없습니다.');
				result.success = false;
				return result;
			}
			else if (kaisaRegex.ptNum.test(val)) {
				console.debug('3개 이상 연속 된 숫자를 나열 할 수 없습니다.');
				result.success = false;
				return result;
			}
			else if ((num < 0 && eng < 0) || (eng < 0 && spe < 0) || (spe < 0 && num < 0) ) {
				console.debug('영문, 숫자, 특수문자 중 2종류 이상을 사용하여 패스워드를 생성해주세요.');;
				result.success = false;
				return result;
			}
			else if (val.length < 6) {
				console.debug('6자리 이상 입력하세요.');
				result.success = false;
				return result;
			}
			return result;
		};
	}]);
	//Parameter
	app.service('kaisaParam', ['$window','$location',function($window,$location) {
		this.getParam = function(n) {
			var vars = {},parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(m,key,value) {
				var hashExist = value.indexOf('#');
				if(hashExist > -1){
					vars[key] = value.substring(0,hashExist);
				}else{
					vars[key] = value;
				}
			});
			return decodeURIComponent(vars[n]?vars[n]:'');
		};
		this.goParam = function(key, value){
		    key = escape(key); value = escape(value);
		    var kvp = document.location.search.substr(1).split('&');
		    var i=kvp.length; var x; while(i--){
		        x = kvp[i].split('=');
		        if (x[0]==key)
		        {
		            x[1] = value;
		            kvp[i] = x.join('=');
		            break;
		        }
		    }
		    if(i<0) {kvp[kvp.length] = [key,value].join('=');}
		    document.location.search = kvp.join('&');
		}
		var params = $location.search();
    }]);
})(window, window.angular);