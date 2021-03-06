(function(window, angular, undefined){
	'use strict';
	var app = angular.module('directive',['common']);


	app.directive('kaisaHeader',[function(){
		return {
			template: '<div>'+
				'<div id="nav" data-ng-click="window.nav()"></div>'+
				'<div id="header" class="{{constant.title}}">'+
					'<div class="wrap">'+
						'<h1><a href="/"><img data-ng-src="{{image.host}}/img/common/logo_{{constant.title}}.png" alt=""></a></h1>'+
					'</div>'+
				'</div>'+
			'</div>',
			replace: true,
			link: function($scope, el, attrs){
			}
		}
	}]);

	app.directive('kaisaMenu',[function(){
		return {
			template: '<div id="menu" data-ng-class="{fix : window.scrollTop >= 100}">'+
				'<div class="menu_wrap">'+
					'<div class="wrap swipeMenuWrap">'+
						'<ul>'+
							'<li data-ng-repeat="i in ui.menuList" data-ng-class="{on : page.idx == $index}"><a data-ng-href="{{commonLink({url:i.url,href:true})}}"><span>{{i.title}}</span><strong>{{i.title}}</strong></a></li>'+
							// '<li><a href="http://pf.kakao.com/_xnKBLxb/chat"><span>카카오 상담</span><strong>카카오 상담</strong></a></li>'+
						'</ul>'+
					'</div>'+
				'</div>'+
			'</div>',
			replace: true,
			link: function($scope, el, attrs){
			}
		}
	}]);

	app.directive('kaisaMap',['$timeout',function($timeout){
		return {
			template: '<div id="contactUs">'+
				'<div class="wrap">'+
					'<h2>찾아오시는 길</h2>'+
					'<div id="map"></div>'+
				    '<ul>'+
					'<li><strong>주소:</strong> 경기도 가평군 가평읍 금대리 305-6 {{constant.titleName}}수상레저</li>'+
					'<li><strong>도로명:</strong> 경기도 가평군 가평읍 북한강변로 536 {{constant.titleName}}수상레저</li>'+
					'<li class="txt_guide"><strong>가평역</strong> 무료 픽업 및 드롭서비스 해드립니다.</li>'+
					'</ul>'+
				'</div>'+
			'</div>',
			replace: true,
			link: function($scope, el, attrs){
				$timeout(function(){
					window.initMap = function(){
						var uluru = {
							lat : 37.774083,
							lng : 127.535045
						};
						var map = new google.maps.Map(document.getElementById('map'), {
							zoom : 15,
							gestureHandling: 'cooperative',
							center : uluru
						});
						var marker = new google.maps.Marker({
							position : uluru,
							map : map
						});
					}
					angular.element(el).append('<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCk-HkVIpP_6oUhCU1-zTWzTSHxGksIA8o&callback=initMap"></script>');
				},10);
			}
		}
	}]);
	
	app.directive('kaisaCsInfo',[function(){
		return {
			template: '<div id="csInfo">'+
			    '<div class="wrap">'+
			      '<div class="layout3">'+
			        '<div class="cont">'+
			          '<img data-ng-src="{{image.host}}/img/main/icon_cs.png" alt="" />'+
			          '<h4>고객센터</h4>'+
			          '<p class="title">{{cs.telNm1}}</p>'+
			          '<p>{{cs.telNo1}}</p>'+
			          '<p class="title" data-ng-show="cs.telNo2">{{cs.telNo2}}</p>'+
			          '<p data-ng-show="cs.telNm2">{{cs.telNm2}}</p>'+
			        '</div>'+
			      '</div>'+
			      '<div class="layout3">'+
			        '<div class="cont">'+
			          '<h4>계좌안내</h4>'+
			          '<img data-ng-src="{{image.host}}/img/main/icon_bank.png" alt="" />'+
			          '<p class="title">{{cs.bankNm}}</p>'+
			          '<p>{{cs.bankNo}}</p>'+
			        '</div>'+
			      '</div>'+
			      '<div class="layout3">'+
			        '<div class="cont">'+
			          '<a href="http://pf.kakao.com/_xnKBLxb/chat"><img data-ng-src="{{image.host}}/img/main/icon_kakao.png" alt="" /></a>'+
			          '<h4>카카오톡상담</h4>'+
			          '<p class="title">가평 엣지 수상레져를</br>추가해주세요.</p>'+
			        '</div>'+
			      '</div>'+
			    '</div>'+
			  '</div>',
			replace: true,
			link: function($scope, el, attrs){
			}
		}
	}]);

	app.directive('kaisaFooter',[function(){
		return {
			template: '<div id="footer">'+
				'<div class="wrap">'+
					'<h1><a href="/"><img data-ng-src="{{image.host}}/img/common/logo_edge.png" alt=""></a></h1>'+
					'<p>'+
					'대표전화: 010-4202-2864<br>'+
					'주소: 경기도 가평군 가평읍 금대리 305-6 {{constant.titleName}}수상레저 ,<br>'+
					'도로명: 경기도 가평군 가평읍 북한강변로 536 {{constant.titleName}}수상레저<br>'+
					'대표전화: 010-5678-2904 |  현장 운영시간: 09:00~18:30 | 대표자명 : 장성환 |  사업자번호: 452-03-00895<br>'+
					'Email: <a href="mailto:cwhkorea@naver.com">cwhkorea@naver.com</a><br>'+
					'Copyright © 2017 Mobydick. All Rights Reserved<a href="http://ohnae3.cafe24.com/bbs/login.php?url=http%3A%2F%2F'+location.host+'" target="_blank">.</a>'+
					'</p>'+
				'</div>'+
			'</div>',
			replace: true,
			link: function($scope, el, attrs){
			}
		}
	}]);

	app.directive('onlyNumber',['kaisaRegex',function(kaisaRegex){ //only-number="false" => '.-'
	    return {
	    	require: 'ngModel',
	        link: function($scope, element, attrs, ctrl) {
	        	ctrl.$parsers.push(function (inputValue) {
	                var transformedInput = inputValue ? ((attrs.onlyNumber == 'true') ? inputValue.replace(/[^\d]/g,'') : inputValue.replace(/[^\d.-]/g,'')) : null;
	                if (transformedInput != inputValue) {
	                	ctrl.$setViewValue(transformedInput);
	                	ctrl.$render();
	                }
	                return transformedInput;
	            });
	        }
	    };
	}]);
	app.directive('icoHelp',[function(){
    	return {
    		replace : true,
    		link: function($scope, el, attrs){
    			el.on('mouseover',function(e){
    				$scope.help.active = true;
    				$scope.help.html = el.find('.html').html();
    				$scope.help.style = {
    					left : e.pageX,
    					top : e.pageY
    				};
    				$scope.$apply();
    			});
    			el.on('mouseout',function(e){
    				$scope.help.active = false;
    				$scope.$apply();
    			});
    		}
    	}
    }]);
	app.directive('ngSrc',[function () {
		return {
			scope : false,
			link: function($scope, el, attrs){
				if(attrs.ngSrc && attrs.ngSrc.search($scope.image.host) < 0){
					console.log('%c ' + attrs.ngSrc + ' %c ( {{image.host}} 를 넣어주세요. )','color:#ffc382;','color:#ff9625;');
				}
				if(!attrs.loader){
					return false;
				}
				el.hide().parent().append('<div class="imgLoader"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');
				var loopCount = 0;
				el.on('error', function() {
					loopCount++;
					if(loopCount > 1){
						el.off('error');
					}
					el.attr('src', $scope.image.host + $scope.image.noImage);
					el.parent().find('.imgLoader').fadeOut(500);
				});
				if(attrs.ngSrc == null || attrs.ngSrc == ''){
					el.attr('src', $scope.image.host + $scope.image.noImage);
				}
				el.load(function(){
					setTimeout(function(){
						el.fadeIn(500).parent().find('.imgLoader').remove();
					},500);
				});
			}
		}
	}]);
	
})(window, window.angular);