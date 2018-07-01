"use strict";
Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).addZero(2);
            case "MM": return (d.getMonth() + 1).addZero(2);
            case "dd": return d.getDate().addZero(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().addZero(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).addZero(2);
            case "mm": return d.getMinutes().addZero(2);
            case "ss": return d.getSeconds().addZero(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.addZero = function(len){return "0".string(len - this.length) + this;};
Number.prototype.addZero = function(len){return this.toString().addZero(len);};
var datePicker = function(option){
	var base = {
		el : $('#datePicker'),
		today : new Date(),
		target : null,
		date : new Date(),
		firstDay : function(year, month){ 
			return new Date(year, month, 1).getDay();
		},
		lastDay : function(year, month){
			return new Date(year, month + 1, 0).getDate();
		},
		draw : function(){
			var self = this;
			self.el.find('h5 .year').html(self.date.format('yyyy'));
			self.el.find('h5 .month').html(self.date.format('MM'));
			var firstMonth = false;
			if(self.date.getMonth() == self.today.getMonth()){
				self.el.find('.prev').hide();
				firstMonth = true;
			}else{
				self.el.find('.prev').show();
			}
			
			if(self.date.getMonth() == 11){
				self.el.find('.next').hide();
			}else{
				self.el.find('.next').show();
			}
			var str = '';
			for(var i = 1; i <= self.firstDay(self.date.getFullYear(),self.date.getMonth()); i ++) {
				str += '<li></li>';
			}
			for(var i = 1; i <= self.lastDay(self.date.getFullYear(),self.date.getMonth()); i ++) {
				if(i == self.date.getDate()){
					str += '<li class="day on">'+i+'</li>';
				}else if(i < self.date.getDate() && firstMonth){
					str += '<li class="day off">'+i+'</li>';
				}else{
					str += '<li class="day">'+i+'</li>';
				}
			}
			self.el.find('ul').html(str).find('li').on('click',function(){
				var date = $(this).text();
				if($(this).hasClass('off')){
					return false;
				}
				if(date){
					option.date.setDate(date);
					self.el.find('ul li').removeClass('on');
					$(this).addClass('on');
					self.val();
				}
			});
			self.val();
		},
		val : function(){
			this.target.val(this.date.format('yyyy-MM-dd'));
		}
	}
	option = $.extend(base, option);
	option.draw();
	option.el.find('.prev').on('click',function(){
		option.date.setMonth(option.date.getMonth()-1);
		option.draw();
	});
	option.el.find('.next').on('click',function(){
		option.date.setMonth(option.date.getMonth()+1);
		option.draw();
	});
}
$(function(){
	datePicker({
		target : $('input[name="target"]')
	});
});