	//https://github.com/carhartl/jquery-cookie
	!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e(require("jquery")):e(jQuery)}(function(e){function n(e){return u.raw?e:encodeURIComponent(e)}function o(e){return u.raw?e:decodeURIComponent(e)}function i(e){return n(u.json?JSON.stringify(e):String(e))}function t(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(c," ")),u.json?JSON.parse(e):e}catch(n){}}function r(n,o){var i=u.raw?n:t(n);return e.isFunction(o)?o(i):i}var c=/\+/g,u=e.cookie=function(t,c,s){if(arguments.length>1&&!e.isFunction(c)){if(s=e.extend({},u.defaults,s),"number"==typeof s.expires){var a=s.expires,d=s.expires=new Date;d.setMilliseconds(d.getMilliseconds()+864e5*a)}return document.cookie=[n(t),"=",i(c),s.expires?"; expires="+s.expires.toUTCString():"",s.path?"; path="+s.path:"",s.domain?"; domain="+s.domain:"",s.secure?"; secure":""].join("")}for(var f=t?void 0:{},p=document.cookie?document.cookie.split("; "):[],l=0,m=p.length;m>l;l++){var x=p[l].split("="),g=o(x.shift()),j=x.join("=");if(t===g){f=r(j,c);break}t||void 0===(j=r(j))||(f[g]=j)}return f};u.defaults={},e.removeCookie=function(n,o){return e.cookie(n,"",e.extend({},o,{expires:-1})),!e.cookie(n)}});
	
	$(document).ready(function(){
		var e = $.cookie("mendiswitcher");
	    "closed" == e && $("#mendi-switcher-container").addClass("closed");
	    
	    $("#mendi-switcher-controller").click(function(){
	    	$("#mendi-switcher-container").hasClass("closed")
	        ? $("#mendi-switcher-container").animate({right:0},300,function(){
	        	$("#mendi-switcher-container").removeClass("closed"),
	            $.removeCookie("mendiswitcher")
	          })
	        : $("#mendi-switcher-container").animate({right:-270},300,function(){
	        	$("#mendi-switcher-container").addClass("closed"),
	            $.cookie("mendiswitcher","closed",{expires:7})
	          })         
	    });
	    
	    var color = $.cookie("mendicolor");
	    "undefined" != typeof color && (
	    	$("#mendi-color-css").remove(),
	        $("head").append('<link id="mendi-color-css" rel="stylesheet" href="css/colors.php?color='+color+'" type="text/css" />')
	    );
	    
	    $("#mendi-switcher-colors-controller li").click(function(){
	    	var o = $(this).data("color");
	        color != o && (
	        	$("#mendi-switcher-colors-controller li.selected").removeClass('selected'),
	        	$(this).addClass('selected'),
	        	$.cookie("mendicolor",o,{expires:7}),
	            color = o,
	            $("#mendi-color-css").remove(),
	            $("head").append('<link id="mendi-color-css" rel="stylesheet" href="css/colors.php?color='+color+'" type="text/css" />')            
	        )
	    });
	    
	    $("#mendi-switcher-reset").click(function(e){
	    	e.preventDefault(),
	        $.removeCookie("mendicolor"),
	        $.removeCookie("mendiswitcher"),
	        location.reload()
	    });
	});