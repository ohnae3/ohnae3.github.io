!function(e,t,n){"use strict";t.module("api",["baseConstant"]).service("kaisaApi",["constant",function(e){var t=location.protocol+"//ohnae3.cafe24.com",n=e.extension.api;this.skiList=t+"/api/ski/list.php"+n,this.skiReservation=t+"/api/ski/reservation.php"+n,this.pensionList=t+"/api/pension/list.php"+n,this.pensionReservation=t+"/api/pension/reservation.php"+n,this.roomList=t+"/api/pension/roomList.php"+n}])}(window,window.angular),function(e,t,n){"use strict";var i=["directive","filter","util","url","api","baseConstant","storage"],o=t.module("common",i).config(["$httpProvider","$locationProvider","$compileProvider",function(e,t,n){e.defaults.useXDomain=!0,e.defaults.withCredentials=!0,e.defaults.headers.common["X-Requested-With"]="XMLHttpRequest",e.defaults.headers.common["Access-Control-Allow-Origin"]="*",e.interceptors.push("httpInterceptor"),n.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/),t.html5Mode({enabled:!1,requireBase:!1,rewriteLinks:!1})}]);o.service("commonParam",["kaisaParam",function(e){var t=this,n=["ver","lang","ch"];for(var i in n)e.getParam(n[i])&&(t[n[i]]=e.getParam(n[i]))}]),o.factory("httpInterceptor",["$rootScope","commonParam","$q","$httpParamSerializerJQLike",function(e,t,n,i){var o=0,a=0;return e.loading={active:!1,error:!1,first:!1,target:null,status:200,message:null},{request:function(n){return o++,e.loading.active=!0,n.url&&-1!=n.url.search("api")&&(n.url=n.url+(-1!=n.url.search(/\?/)?"&":"?")+i(t)),n},requestError:function(e){return console.debug("request error"),n.reject(e)},response:function(t){return a++,o==a&&(e.loading.first=!0,e.loading.active=!1),t},responseError:function(e){return n.reject(e)}}}]),o.controller("KaisaController",["$rootScope","commonParam","$window","$scope","$location","$compile","$http","$timeout","kaisaUrl","kaisaParam","constant","kaisaApi","kaisaStorage","$httpParamSerializerJQLike",function(n,i,o,a,s,r,c,l,u,p,d,m,g,h){a.jsonpParam=function(e){return"?callback=JSON_CALLBACK&"+h(e)},a.grid=new Array,a.constant=d,a.image=d.image;var f={isIe:!1,isIe8:!1,isIe9:!1,userAgent:e.navigator.userAgent};(f.userAgent.indexOf("MSIE ")>0||f.userAgent.match(/Trident.*rv\:11\./))&&(f.isIe=!0,("Mozilla/4.0"==f.userAgent.substring(0,11)||f.userAgent.indexOf("MSIE 9.0")>0)&&(f.isIe9=!0),document.addEventListener||(f.isIe8=!0)),a.browser=f;var v={mobile:!1,android:!1,tablet:!1,ios:!1,ipad:!1};if(a.device=v,a.commonParam=i,a.searchParam={params:{}},a.xhrConfig={headers:{"Content-Type":"application/x-www-form-urlencoded"}},a.jsonpParam=function(e){return"?callback=JSON_CALLBACK&"+h(e)},a.ui={menuStatus:!1,menuToggle:function(){console.log(this.menuStatus),this.menuStatus?this.menuStatus=!1:this.menuStatus=!0},menuList:[{title:"엣지스키",url:"main"},{title:"예약게시판",url:"reservation"},{title:"요금/이용안내",url:"info"},{title:"펜션안내",url:"pension"},{title:"근처펜션",url:"nearPension"}]},a.commonLink=function(e){if(void 0===u[e.url])return console.log("%c "+e.url+" %c ( 존재하지 않는 링크값입니다. )","color:#52c74f;","color:#469a44;"),!1;"object"!=typeof e&&(e=new Object);var t=h($.extend({},a.commonParam,e.param)),n=u[e.url]+(t?"?":"")+t;return e.reset&&(n=u[e.url]),e.href?n:(location.href=n,!0)},a.popup={active:!1,option:{},optionDefault:{dim:!0,dimClick:!0,target:null},open:function(e){this.option=$.extend({},this.optionDefault,e),this.active=!0;var n=this.option.target.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase();t.element("#popupContent").empty().append(r(t.element("<div "+n+"></div>"))(a))},close:function(e){("dim"!=e.target||a.popup.option.dimClick)&&(this.option=this.optionDefault,this.active=!1)}},a.cs={bankCd:"ibk",bankNm:"기업은행 (이강식)",bankNo:"010-9902-2875",telNm1:"대표전화",telNo1:"010-4202-2864",telNm2:"",telNo2:""},a.alert={active:!1,option:{},optionDefault:{type:"text",style:{},confirm:!1,title:null,message:null,focus:null,button:{ok:"확인",cancel:"취소"},callback:null,cancelCallback:null,override:!1,target:null},open:function(e){this.option=$.extend({},this.optionDefault,e),this.active=!0,t.element(document).on("keypress.alert",function(e){13==e.which&&(null!=a.alert.option.callback?(a.alert.option.callback(),a.alert.close()):a.alert.close(),a.$apply(),t.element(document).off("keypress.alert"),e.preventDefault(),e.stopPropagation())})},close:function(e){this.option=this.optionDefault,this.active=!1,t.element(document).off("keypress.alert")}},a.help={active:!1,html:"",open:function(){this.active=!0},close:function(){this.active=!1}},a.loading=n.loading,n.$watch("loading",function(e){a.loading=e,419==e.status&&(a.commonLink("login",{returnURL:location.href},"move"),a.loading.active=!1),200!=e.status&&(console.debug("error : "+e.status),a.loading.active=!1),e.first&&a.historyChecker();try{if(e.message.search("SQLSTATE[23000]")){var t=e.message.substring(e.message.match("for key '").index+9,e.message.match("_UNIQUE").index),n=e.message.substring(e.message.match("Duplicate entry '").index+17,e.message.match("' for key").index);a.alert.open({message:'"'+t+'" 컬럼에  "'+n+'"값이 중복됩니다.'})}}catch(e){}},!0),l(function(){a.loading.first=!0},100),a.historyChecker=function(){a.pageInfo.samePage&&l(function(){a.pageInfo.scrollPosition()},100)},a.pageInfo={scrollTop:"0",href:location.href,data:{},samePage:!1,scrollPosition:function(){e.scrollTo(0,this.scrollTop)}},a.pageInfoSession=g.getSessionStorage("pageInfo","json"),a.pageInfoSession)for(a.pageInfoSession[1].href==location.href&&l(function(){t.element("body").scrollTop(a.pageInfoSession[1].scrollTop)},0);a.pageInfoSession.length>2;)a.pageInfoSession.pop();o.addEventListener("beforeunload",function(){a.pageInfo.scrollTop=document.body.scrollTop,a.pageInfoSession&&a.pageInfoSession.unshift(a.pageInfo),g.setSessionStorage("pageInfo",a.pageInfoSession,"json")}),a.window={width:t.element(o).width(),height:t.element(o).height(),heightContainer:t.element("#container").height(),scrollTop:t.element(o).scrollTop(),nav:function(){this.scrollTop<=150?t.element("body,html").animate({scrollTop:a.window.heightContainer}):t.element("body,html").animate({scrollTop:0})}},t.element(o).on("resize",function(){a.$apply(function(){a.window.width=t.element(o).width(),a.window.height=t.element(o).height()})}),t.element(o).on("scroll",function(){a.$apply(function(){a.window.scrollTop=t.element(o).scrollTop()})}),e.scope=a}])}(window,window.angular),function(e,t,n){"use strict";t.module("baseConstant",[]).factory("constant",["$http","$filter",function(e,t){return{dateVersion:t("date")(new Date,"yyyyMMddHHmm").substring(0,11),version:"0.0.1",host:"",dev:!location.host.match("localhost"),title:location.host.match("mobydic")?"mobydic":"edge",titleName:location.host.match("mobydic")?"모비딕":"엣지",keywords:"Mobydic 수상레저",description:"Mobydic 수상레저",favicon:"/img/favicon.ico",domain:"",cdomain:"",image:{noImage:"/img/common/noImage.png",host:"",XL:"_1040",L:"_256",M:"_130",S:"_90"},extension:{api:"",data:".data",link:""},dateFormat:"yyyy-MM-dd hh:mm:ss"}}])}(window,window.angular),function(e,t,n){"use strict";var i=t.module("directive",["common"]);i.directive("kaisaHeader",[function(){return{template:'<div><div id="nav" data-ng-click="window.nav()"></div><div id="header" class="{{constant.title}}"><div class="wrap"><h1><a href="/"><img data-ng-src="{{image.host}}/img/common/logo_{{constant.title}}.png" alt=""></a></h1></div></div></div>',replace:!0,link:function(e,t,n){}}}]),i.directive("kaisaMenu",[function(){return{template:'<div id="menu" data-ng-class="{fix : window.scrollTop >= 100}"><div class="menu_wrap"><div class="wrap swipeMenuWrap"><ul><li data-ng-repeat="i in ui.menuList" data-ng-class="{on : page.idx == $index}"><a data-ng-href="{{commonLink({url:i.url,href:true})}}"><span>{{i.title}}</span><strong>{{i.title}}</strong></a></li></ul></div></div></div>',replace:!0,link:function(e,t,n){}}}]),i.directive("kaisaMap",["$timeout",function(n){return{template:'<div id="contactUs"><div class="wrap"><h2>찾아오시는 길</h2><div id="map"></div><ul><li><strong>주소:</strong> 경기도 가평군 가평읍 금대리 305-6 {{constant.titleName}}수상레저</li><li><strong>도로명:</strong> 경기도 가평군 가평읍 북한강변로 536 {{constant.titleName}}수상레저</li><li class="txt_guide"><strong>가평역</strong> 무료 픽업 및 드롭서비스 해드립니다.</li></ul></div></div>',replace:!0,link:function(i,o,a){n(function(){e.initMap=function(){var e={lat:37.774083,lng:127.535045},t=new google.maps.Map(document.getElementById("map"),{zoom:15,gestureHandling:"cooperative",center:e});new google.maps.Marker({position:e,map:t})},t.element(o).append('<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCk-HkVIpP_6oUhCU1-zTWzTSHxGksIA8o&callback=initMap"><\/script>')},10)}}}]),i.directive("kaisaCsInfo",[function(){return{template:'<div id="csInfo"><div class="wrap"><div class="layout3"><div class="cont"><img data-ng-src="{{image.host}}/img/main/icon_cs.png" alt="" /><h4>고객센터</h4><p class="title">{{cs.telNm1}}</p><p>{{cs.telNo1}}</p><p class="title" data-ng-show="cs.telNo2">{{cs.telNo2}}</p><p data-ng-show="cs.telNm2">{{cs.telNm2}}</p></div></div><div class="layout3"><div class="cont"><h4>계좌안내</h4><img data-ng-src="{{image.host}}/img/main/icon_bank.png" alt="" /><p class="title">{{cs.bankNm}}</p><p>{{cs.bankNo}}</p></div></div><div class="layout3"><div class="cont"><a href="http://pf.kakao.com/_xnKBLxb/chat"><img data-ng-src="{{image.host}}/img/main/icon_kakao.png" alt="" /></a><h4>카카오톡상담</h4><p class="title">가평 엣지 수상레져를</br>추가해주세요.</p></div></div></div></div>',replace:!0,link:function(e,t,n){}}}]),i.directive("kaisaFooter",[function(){return{template:'<div id="footer"><div class="wrap"><h1><a href="/"><img data-ng-src="{{image.host}}/img/common/logo_edge.png" alt=""></a></h1><p>대표전화: 010-4202-2864<br>주소: 경기도 가평군 가평읍 금대리 305-6 {{constant.titleName}}수상레저 ,<br>도로명: 경기도 가평군 가평읍 북한강변로 536 {{constant.titleName}}수상레저<br>대표전화: 010-5678-2904 |  현장 운영시간: 09:00~18:30 | 대표자명 : 장성환 |  사업자번호: 452-03-00895<br>Email: <a href="mailto:cwhkorea@naver.com">cwhkorea@naver.com</a><br>Copyright © 2017 Mobydick. All Rights Reserved<a href="http://ohnae3.cafe24.com/bbs/login.php?url=http%3A%2F%2F'+location.host+'" target="_blank">.</a></p></div></div>',replace:!0,link:function(e,t,n){}}}]),i.directive("onlyNumber",["kaisaRegex",function(e){return{require:"ngModel",link:function(e,t,n,i){i.$parsers.push(function(e){var t=e?"true"==n.onlyNumber?e.replace(/[^\d]/g,""):e.replace(/[^\d.-]/g,""):null;return t!=e&&(i.$setViewValue(t),i.$render()),t})}}}]),i.directive("icoHelp",[function(){return{replace:!0,link:function(e,t,n){t.on("mouseover",function(n){e.help.active=!0,e.help.html=t.find(".html").html(),e.help.style={left:n.pageX,top:n.pageY},e.$apply()}),t.on("mouseout",function(t){e.help.active=!1,e.$apply()})}}}]),i.directive("ngSrc",[function(){return{scope:!1,link:function(e,t,n){if(n.ngSrc&&n.ngSrc.search(e.image.host)<0&&console.log("%c "+n.ngSrc+" %c ( {{image.host}} 를 넣어주세요. )","color:#ffc382;","color:#ff9625;"),!n.loader)return!1;t.hide().parent().append('<div class="imgLoader"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');var i=0;t.on("error",function(){i++,i>1&&t.off("error"),t.attr("src",e.image.host+e.image.noImage),t.parent().find(".imgLoader").fadeOut(500)}),null!=n.ngSrc&&""!=n.ngSrc||t.attr("src",e.image.host+e.image.noImage),t.load(function(){setTimeout(function(){t.fadeIn(500).parent().find(".imgLoader").remove()},500)})}}}])}(window,window.angular),function(e,t,n){"use strict";var i=t.module("filter",[]);i.filter("trustHtml",["$sce",function(e){return function(t){return t?e.trustAsHtml(t.replace(/\n/g,"<br>")):""}}]),i.filter("unique",[function(){return function(e,n){if(t.isArray(e)&&t.isString(n)){for(var i=[],o={},a=0;a<e.length;a++){var s=e[a][n];t.isUndefined(o[s])&&(o[s]=!0,i.push(s))}return i}return e}}])}(window,window.angular),function(e,t,n){"use strict";t.module("storage",[]).service("kaisaStorage",[function(){this.setSessionStorage=function(e,t,n){try{"json"==n&&(t=JSON.stringify(t)),sessionStorage.setItem(e,t)}catch(e){}},this.getSessionStorage=function(e,t){var n=null;try{n=sessionStorage.getItem(e),"json"==t&&(n=JSON.parse(n))}catch(e){n=-1}return n},this.removeSessionStorage=function(e){sessionStorage.removeItem(e)},this.setLocalStorage=function(e,t,n){try{"json"==n&&(t=JSON.stringify(t)),localStorage.setItem(e,t)}catch(e){}},this.getLocalStorage=function(e,t){var n=null;try{n=localStorage.getItem(e),"json"==t&&(n=JSON.parse(n))}catch(e){n=-1}return n},this.removeLocalStorage=function(e){localStorage.removeItem(e)},this.setCookie=function(e,t,n,i){var o=new Date,a=new Date(o.getFullYear(),o.getMonth(),o.getDate()+n),s=e+"="+escape(t)+"; path=/ ";void 0!==n&&(s+=";expires="+a.toGMTString()+";"),document.cookie=s},this.getCookie=function(e){var t,e=e+"=",n=document.cookie,i=n.indexOf(e),o="";return-1!=i&&(i+=e.length,t=n.indexOf(";",i),-1==t&&(t=n.length),o=n.substring(i,t)),unescape(o)},this.removeCookie=function(e){var t=new Date(0);document.cookie=e+"=; path=/; expires="+t+";"}}])}(window,window.angular),function(e,t,n){"use strict";t.module("url",["baseConstant"]).service("kaisaUrl",["constant",function(e){var t=""!=e.host?"http://"+e.host:"",n=(""!=e.host&&e.host,e.extension.link);this.main=t+"/"+n,this.reservation=t+"/reservation"+n,this.qna=t+"/qna"+n,this.info=t+"/info"+n,this.pension=t+"/pension"+n,this.nearPension=t+"/nearPension"+n}])}(window,window.angular),function(e,t,n){"use strict";var i=t.module("util",[]);i.service("kaisaRegex",[function(){this.blankAll=/^\s+|\s+$/g,this.blank=/[\s]/g,this.mix=/^(?=.*[a-zA-Z])(?=.*[`~!@#$%^*+=-?:;.,|\\\{\}\[\]\(\)\/])(?=.*[0-9]).{6,15}$/,this.img=/([^\s]+(?=\.(jpg|gif|png))\.\2)/,this.duStr=/(\w)\1\1/,this.ptNum=/(012)|(123)|(234)|(345)|(456)|(567)|(678)|(789)/,this.num=/[0-9]/g,this.eng=/[a-z]/gi,this.spe=/[~!@#$%^&*()_+{}":?><\]\[';\/.,`|\\\-=]/g}]),i.service("kaisaUtil",["kaisaRegex",function(e){this.validatePassword=function(t,n){var i=n.search(e.num),o=n.search(e.eng),a=n.search(e.spe),s={success:!0,message:""};return e.blankAll.test(n)||e.blank.test(n)?(console.debug("공백은 사용할 수 없습니다."),s.success=!1,s):-1!=n.search(e.duStr)?(console.debug("동일한 문자를 3번 이상 반복 할 수 없습니다."),s.success=!1,s):e.ptNum.test(n)?(console.debug("3개 이상 연속 된 숫자를 나열 할 수 없습니다."),s.success=!1,s):i<0&&o<0||o<0&&a<0||a<0&&i<0?(console.debug("영문, 숫자, 특수문자 중 2종류 이상을 사용하여 패스워드를 생성해주세요."),s.success=!1,s):n.length<6?(console.debug("6자리 이상 입력하세요."),s.success=!1,s):s}}]),i.service("kaisaParam",["$window","$location",function(t,n){this.getParam=function(t){var n={};e.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(e,t,i){var o=i.indexOf("#");n[t]=o>-1?i.substring(0,o):i});return decodeURIComponent(n[t]?n[t]:"")},this.goParam=function(e,t){e=escape(e),t=escape(t);for(var n,i=document.location.search.substr(1).split("&"),o=i.length;o--;)if(n=i[o].split("="),n[0]==e){n[1]=t,i[o]=n.join("=");break}o<0&&(i[i.length]=[e,t].join("=")),document.location.search=i.join("&")};n.search()}])}(window,window.angular);