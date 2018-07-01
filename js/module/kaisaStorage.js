(function(window, angular, undefined) {
	'use strict';
	var app = angular.module('storage', []);
	app.service('kaisaStorage',[function() {
		/**
		 * sessionStorage (tab 단위)
		 */
		this.setSessionStorage = function(key, value, type) {
			try {
				if (type == 'json') {
					value = JSON.stringify(value);
				}
				sessionStorage.setItem(key, value);
			} catch (e) {
			}
		};
		this.getSessionStorage = function(key, type) {
			var value = null;
			try {
				value = sessionStorage.getItem(key);
				if (type == 'json') {
					value = JSON.parse(value);
				}
			} catch (e) {
				value = -1;
			}
			return value;
		};
		this.removeSessionStorage = function(key) {
			sessionStorage.removeItem(key);
		};
		/**
		 * localStorage
		 */
		this.setLocalStorage = function(key, value, type) {
			try {
				if (type == 'json') {
					value = JSON.stringify(value);
				}
				localStorage.setItem(key, value);
			} catch (e) {
			}
		};
		this.getLocalStorage = function(key, type) {
			var value = null;
			try {
				value = localStorage.getItem(key);
				if (type == 'json') {
					value = JSON.parse(value);
				}
			} catch (e) {
				value = -1;
			}
			return value;
		};
		this.removeLocalStorage = function(key) {
			localStorage.removeItem(key);
		};
		/**
		 * Cookie
		 */
		this.setCookie = function(c_name, c_value, expire_date_num, domain) {
			var now_date = new Date(), expire_date = new Date(now_date.getFullYear(), now_date.getMonth(), now_date.getDate() + expire_date_num), cookies = c_name
					+ '=' + escape(c_value) + '; path=/ ';
			if (typeof expire_date_num != 'undefined')
				cookies += ';expires=' + expire_date.toGMTString() + ';';
			document.cookie = cookies;
		};
		this.getCookie = function(c_name) {
			var c_name = c_name + '=', cookie_data = document.cookie, start = cookie_data.indexOf(c_name), c_value = '', end;
			if (start != -1) {
				start += c_name.length;
				end = cookie_data.indexOf(';', start);
				if (end == -1)
					end = cookie_data.length;
				c_value = cookie_data.substring(start, end);
			}
			return unescape(c_value);
		};
		this.removeCookie = function(c_name) {
			var remove_date = new Date(0);
			document.cookie = c_name + '=; path=/; expires=' + remove_date + ';';
		};
	}]);
})(window, window.angular);