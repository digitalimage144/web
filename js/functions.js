var $ = jQuery.noConflict();

var MENDI = MENDI || {};

(function($){
	"use strict";

	MENDI.pageAnimsition = function(){
		if( !$('body').hasClass('no-preloader') ){
			var animationIn =  $("body").data("animsition-in"),
				animationOut = $("body").data("animsition-out"),
				speedIn = $("body").data("speed-in"),
				speedOut = $("body").data("speed-out");

				animationIn || ( animationIn = 'fade-in' );
				animationOut || ( animationOut = 'fade-out' );
				speedIn || ( speedIn = 1500 );
				speedOut || ( speedOut = 800 );

				speedIn = parseInt( speedIn, 10),
				speedOut = parseInt( speedOut, 10);

			$('.mendi-theme-container').animsition({
				inClass : animationIn,
				outClass : animationOut,
				inDuration : speedIn,
				outDuration : speedOut,
				linkElement : '.main-nav ul li a:not([target="_blank"]):not([href^=#])'
			});
		}
	},

	MENDI.fullScreenSection = function(){
		var t = $(".mendi-full-screen",".mendi-theme-container");
		t.length > 0 && t.each(function(){

			var ele = $(this),
				windowHeight = $(window).height();

			ele.css('height', windowHeight);
		});
	},

	MENDI.header = {

		subMenu : function() {

			$( 'nav.main-nav ul li:has(ul)',"#mendi-masthead").addClass('mendi-has-sub-menu');
		},

		menuSearch : function() {
			var t = $("a.mendi-search",".mendi-search-container");

			if( t.length ) {

				t.on("click", function(e){
					e.preventDefault();

					$('.mendi-search-form').toggleClass('is-visible');
					$('.mendi-search').toggleClass('search-is-visible');
					$('.mendi-search-overlay').toggleClass('search-is-visible');

					$(".mendi-search-form").hasClass("is-visible") ? ( 
						$('.mendi-search-overlay').addClass('is-visible') , 
						$('.mendi-search-form').find('input[type="search"]').focus() )
					: $(".mendi-search-overlay").removeClass("is-visible");
				});
			}
		},

		stickyMenu	: function() {

			if( !$('body').hasClass('no-sticky') ) {

				if( $(window).scrollTop() > 0 ) {
					$(".header-main","#mendi-masthead").addClass("sticky");
				} else {
					if( $(".header-main","#mendi-masthead").hasClass("sticky") ) {
						$(".header-main","#mendi-masthead").removeClass("sticky");
					}
				}
			}
		},

		verticalMenu : function() {

			var t = $("nav#mendi-vertical-nav",".mendi-content-wrap");
			t.length > 0 && t.each(function(){
				var ele = $(this);

				$(this).find("a").on("click", function(e){
					e.preventDefault();

					$(this.hash).length > 0 && (
						$('body,html').animate({ 'scrollTop' : $(this.hash).offset().top },600 ),
						ele.find("a").removeClass("is-selected"),
						$(this).addClass('is-selected')
					);
				});
			});
		},

		verticalMenuCurrentSection : function() {

			var t = $(".mendi-vertical-section",".mendi-content-wrap");
			t.length > 0 && t.each(function(){
				var ele = $(this),
					number = $("nav#mendi-vertical-nav a[href='#"+ele.attr('id')+"']").data('number');

					number = parseInt(number, 10);

				var currentSection = number - 1;

				if ( ( ele.offset().top - $(window).height()/2 < $(window).scrollTop() ) 
						&& ( ele.offset().top + ele.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
					$("nav#mendi-vertical-nav a").eq(currentSection).addClass('is-selected');
				} else {
					$("nav#mendi-vertical-nav a").eq(currentSection).removeClass('is-selected');
				}
			});
		},

		responsiveMenu : function() {

			$("#mendi-responsive-menu-trigger","#mendi-masthead").on("click",function(e){
				$(".main-nav > ul").toggleClass('show');
				return false;
			});
		},

		zoomOutImage : function( arg ) {
			if( arg.width() >= 1170 ) {
				MENDI.documentOnReady.windowscroll();
			} else {
				arg.off('scroll');
			}
		},

		animateZoomOutImage : function() {
			var t = $(".mendi-zoomout-header",".mendi-slider-wrap"),
			tHeight = t.height(),
			scaleSpeed = 0.3, // change scaleSpeed if you want to change the speed of the scale effect
			opacitySpeed = 1; // change opacitySpeed if you want to change the speed of opacity reduction effect

			var scrollPercentage = ($(window).scrollTop()/tHeight).toFixed(5),
			scaleValue = 1 - scrollPercentage*scaleSpeed;

			if( $(window).scrollTop() < tHeight ) {
				t.css({
				    '-moz-transform': 'scale(' + scaleValue + ') translateZ(0)',
				    '-webkit-transform': 'scale(' + scaleValue + ') translateZ(0)',
					'-ms-transform': 'scale(' + scaleValue + ') translateZ(0)',
					'-o-transform': 'scale(' + scaleValue + ') translateZ(0)',
					'transform': 'scale(' + scaleValue + ') translateZ(0)',
					'opacity': 1 - scrollPercentage*opacitySpeed
				});
			}
		},
	},

	MENDI.ui = {
		init : function(){

			MENDI.ui.tabs();

			MENDI.ui.toggles();

			MENDI.ui.accordions();

			MENDI.ui.animateNumbers();

			MENDI.ui.progressBars();

			MENDI.ui.flickrFeeds();

			MENDI.ui.lightBox();

			MENDI.ui.parallax();

			MENDI.ui.animations();

			MENDI.ui.twitterTweets();

			MENDI.ui.owlCarousel();

			MENDI.ui.iframeVideo();

			MENDI.ui.ytbgPlayer();

			MENDI.ui.gMap();
			
			MENDI.ui.commentForm();	
			
			MENDI.ui.gradientAnimation();		
		},

		tabs : function(){
			var t = $(".mendi-tabs-holder",".mendi-theme-container");
			t.length > 0 && t.each(function(){
				var container = $(this),
					tabs = $('ul.mendi-tabs-nav li a', container );

				container.find(".tabs-container").hide().filter(':first').show();
				
				tabs.on("click",function(e){
					e.preventDefault();
					tabs.removeClass("current");
					$(this).addClass("current");
					container.find(".tabs-container").hide().filter(this.hash).show();
				});				
			});
		},

		toggles : function(){
			var t = $(".mendi-toggle-panel",".mendi-theme-container");
			t.length > 0 && t.each(function(){
				var container = $(this),
					state = container.data('state');

				"open" == state ? container.find(".mendi-toggle-title").addClass("current") : container.find('.mendi-toggle-collapse').hide();

				container.find(".mendi-toggle-title").on("click", function(e){
					e.preventDefault();
					$(this).toggleClass("current").next(".mendi-toggle-collapse").slideToggle(500);
				});
			});
		},

		accordions : function(){
			var t = $(".mendi-accordion-holder",".mendi-theme-container");
			t.length > 0 && t.each(function(){
				var container = $(this),
					state = container.data("state"),
					active = container.data("active");

				active ? active -= 1 : active = 0;
				container.find(".mendi-accordion-collapse").hide();

				"closed" != state && container.find(".mendi-accordion-panel:eq("+ Number(active) +")").addClass("current").children(".mendi-accordion-collapse").show();

				container.find(".mendi-accordion-panel").on("click", function(e){
					e.preventDefault();

					if( $(this).children(".mendi-accordion-collapse").is(':hidden') ) {
						container.find(".mendi-accordion-panel").removeClass("current").children(".mendi-accordion-collapse").slideUp("normal");
						$(this).toggleClass("current").children(".mendi-accordion-collapse").slideDown("normal");
					}
				});
			});
		},

		animateNumbers : function(){
			var t = $(".mendi-facts-count",".mendi-theme-container");
			t.length > 0 && t.each(function(){
				var counter = $(this),
					comma = counter.data('comma');

				comma = comma ? !0 : !1;

				counter.appear(function(){
					1 == comma ? counter.countTo({
						formatter : function(e, t){
							return e = e.toFixed(t.decimals), e = e.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
						}
					}) : counter.countTo();
				});
			});
		},

		progressBars : function(){
			var t = $(".mendi-progress-bar-wrapper",".mendi-theme-container");
			t.length > 0 && t.each(function(){
				var container = $(this),
					percent = container.data('percent');

					percent || ( percent = 75 );
					percent = parseInt( percent, 10);

					container.appear(function(){
						container.find(".mendi-facts-count").countTo({
							from:0,
							to: percent,
							onUpdate : function(value){
								container.find(".mendi-progress-bar").css({ width:value+"%"});
							}
						});
					});
			});
		},

		flickrFeeds : function(){
			var t = $("ul.mendi-flickr-widget",".mendi-theme-container");
			t.length > 0 && t.each(function(){
				var t = $(this),
					id = t.data("id"),
					count = t.data("count"),
					size = t.data("image-size"),
					type = t.data("type"),
					stream = "photos_public.gne";
					
					count || ( count = 9 );
					count = parseInt( count, 10);

					"group" == type && (stream = "groups_pool.gne");
					size || ( size = "s" );

					t.jflickrfeed({
						feedapi: stream,
						limit: Number(count),
						qstrings:{ id: id },
						itemTemplate:'<li><a href="{{image_b}}" title="{{title}}" data-lightbox="gallery-item"><img src="{{image_s}}" alt="{{title}}" /></a></li>'
					}, function(){
						MENDI.ui.lightBox();
					});
			});
		},

		lightBox : function(){

			var gallery = $('[data-lightbox="gallery"]',".mendi-theme-container");

			gallery.length > 0 && gallery.each(function(){
				var ele = $(this);
				ele.magnificPopup({
					delegate: 'a[data-lightbox="gallery-item"]',
					type: "image",
					closeOnContentClick: true,
					closeBtnInside: false,
					image:{ verticalFit: true },
					gallery:{ enabled: true }
				});
			});
		},

		parallax : function(){
			var t = $(".mendi-parallax",".mendi-theme-container");
			if( t.length > 0 ) {
				MENDI.utils.isMobile() ? $(".mendi-parallax").addClass("mendi-mobile-parallax") :  $.stellar({ horizontalScrolling:false, responsive:true, verticalOffset:150 });
			}
		},

		animations : function(){

			var t = $("[data-animate]");
			t.length > 0 && t.each(function(){

				var ele = $(this),
					delay = ele.data("delay"),
					time = 0;

					time = delay ? Number(delay)+500 : 500;
					time = parseInt(time, 10);

					if( !ele.hasClass('animated') ){
						var animation = ele.data('animate');
						animation || ( animation = 'pulse');

						ele.appear(function(){
							setTimeout(function(){
								ele.addClass( animation + " animated");
							}, time );
						},{accX: 100, accY: 120});
					}
			});
		},

		twitterTweets : function(){
			var t = $("ul.mendi-tweets-list",".mendi-theme-container");
			t.length > 0 && t.each(function(){
				var t = $(this),
					account = t.data('account'),
					limit = t.data('limit');

				account || ( account = 'envato' );

				limit || ( limit = 3 );
				limit = parseInt(limit, 10);

				var url = "twitter/tweets.php?username="+account+"&limit="+limit;

				$.getJSON(url,function(data){
					t.html( MENDI.utils.formatTwitterTweets(data) );
				});
			});
		},

		owlCarousel : function(){
			var simple = $(".mendi-simple-owl-carousel",".mendi-theme-container");
			simple.length > 0 && simple.each(function(){
				var ele = $(this),
					items = ele.data("items"),
					slidespeed = ele.data("slidespeed"),
					pagination = ele.data("pagination"),
					autoplay = ele.data("autoplay"),
					navigation = ele.data("navigation"),
					customnav = ele.data("custom-navigation");

					items || ( items = 4 );
					items = parseInt(items, 10);

					slidespeed || ( slidespeed = 500 );
					slidespeed = parseInt(slidespeed, 10);

					pagination = pagination ? !0 : !1;
					autoplay = false == autoplay ? !1 : !0;
					navigation = navigation ? !0 : !1;
				
				ele.owlCarousel({
					items : items,
					pagination : pagination, //dots
					slideSpeed : slidespeed ,
					autoPlay : autoplay,
					navigation: navigation,
					lazyLoad:true,
					navigationText: [" Prev ", "Next"]
				});

				customnav ?
					$("#"+customnav+" .next").on("click",function(){
						ele.trigger('owl.next');
					})  
				: !1;

				customnav ?
					$("#"+customnav+" .prev").on("click",function(){
						ele.trigger('owl.prev');
					})
				: !1;
			});
		},

		verticalMiddle : function() {
			var t = $(".mendi-vertical-middle",".mendi-theme-container");
			t.length > 0 && t.each(function(){
				var ele = $(this),
					height = ele.height();

				ele.css({ position: 'absolute', top: '0', right: '0', bottom: '0', left: '0', width: '100%', margin:'auto', height:height+'px'});
			});
		},

		html5Video : function() {
			var t = $(".mendi-video-wrap:has(video)",".mendi-theme-container");
			t.length > 0 && t.each(function(){

				var t = $(this),
				video = t.find('video'),
				outerContainerWidth = t.outerWidth(),
				outerContainerHeight = t.outerHeight(),
				innerVideoWidth = video.outerWidth(),
				innerVideoHeight = video.outerHeight();

				if( innerVideoHeight < outerContainerHeight ) {

					var videoAspectRatio = innerVideoWidth/innerVideoHeight,
					newVideoWidth = outerContainerHeight * videoAspectRatio,
					innerVideoPosition = (newVideoWidth - outerContainerWidth) / 2;

					video.css({
						'width': newVideoWidth+'px',
						'height': outerContainerHeight+'px',
						'left': -innerVideoPosition+'px'
					});

				} else {

					var innerVideoPosition = (innerVideoHeight - outerContainerHeight) / 2;

					video.css({
						'width': innerVideoWidth+'px',
						'height': innerVideoHeight+'px',
						'top': -innerVideoPosition+'px'
					});
				}

				if( MENDI.utils.isMobile() ) {
					var placeholderImg = video.attr('poster');
					if( placeholderImg.length > 0 ) {
						t.append('<div class="mendi-video-placeholder" style="background-image: url('+ placeholderImg +');"></div>');
					}
				}
			});
		},

		iframeVideo : function() {
			var t = $(".mendi-iframe-video-wrap",".mendi-theme-container");
			t.length > 0 && t.each(function(){
				$(this).fitVids();
			});
		},

		ytbgPlayer : function(){
			var t = $(".mendi-youtube-wrap",".mendi-theme-container");
			t.length > 0 && t.each(function(){
				var t = $(this),
					container = t.data("container"),
					video = t.data("video"),
					ratio = t.data("ratio"), // "auto", "16/9", "4/3"
					startAt = t.data("start"),
					stopAt = t.data("stop"),
					autoPlay = t.data("autoplay"),
					volume = t.data("volume"), // 1 to 100
					opacity = t.data("opacity"),
					quality = t.data("quality"), //"default", "small", "medium", "large", "hd720", "hd1080", "highres"
					mute = t.data("mute"),
					loop = t.data("loop"),
					showControls = t.data("showcontrols"),
					showYTLogo = t.data("showlogo"),
					realfullscreen = t.data("realfullscreen"),
					optimizeDisplay = t.data("optimizedisplay");

					container || ( container = "self" );
					video || ( video = 'http://youtu.be/A3PDXmYoF5U' );
					ratio || ( ratio = "16/9" );
					startAt || ( startAt = 0 );
					stopAt || ( stopAt = 0 );
					autoPlay = false == autoPlay ? !1 : !0;
					volume || ( volume = 1 );
					opacity || ( opacity = 1 );
					quality || ( quality = "default" );
					mute = true == mute ? !0 : !1;
					loop = true == loop ? !0 : !1;
					showYTLogo = true == showYTLogo ? !0 : !1;
					realfullscreen = true == realfullscreen ? !0 : !1;
					optimizeDisplay = false == optimizeDisplay ? !1 : !0;

				t.mb_YTPlayer({
					containment: container,
					ratio: ratio,
					videoURL: video,
					startAt: startAt,
					stopAt: stopAt,
					autoPlay: autoPlay,
					volume: volume,
					opacity: opacity,
					quality: quality,
					mute: mute,
					loop: loop,
					showControls: !1,
					showYTLogo: showYTLogo,
					realfullscreen: realfullscreen,
					optimizeDisplay: optimizeDisplay
				});
			});
		},

		gMap : function(){
			var t = $(".mendi-map-holder",".mendi-theme-container");
			t.length > 0 && t.each(function(){
				var ele = $(this),
					width = ele.data("width"),
					height = ele.data("height"),
					maptype = ele.data("maptype"),
					zoom = ele.data("zoom"),
					address = ele.data("address"),
					description = ele.data("description"),
					icon = ele.data("icon"),
					iconsize = ele.data("iconsize"),
					popup = ele.data("popup"),
					pancontrol = ele.data("pancontrol"),
					zoomcontrol = ele.data("zoomcontrol"),
					draggable = ele.data("draggable"),
					scrollwheel = ele.data("scrollwheel"),
					typecontrol = ele.data("typecontrol"),
					scalecontrol = ele.data("scalecontrol"),
					streetcontrol = ele.data("streetcontrol"),
					center = ele.data("center");

					width || ( width = '100%' );
					height || ( height = '500px' );
					maptype || ( maptype = 'roadmap' ); //roadmap, satellite, terrain or hybrid

					zoom || ( zoom = '14' ); //1-19
					zoom = parseInt(zoom, 10);

					address || ( address = '' ); //street, city, country | street, city, country | street, city, country
					description || ( description = '' );
					icon || ( icon = '' );
					iconsize || ( iconsize = '' );
					popup = true == popup ? !0 : !1;
					pancontrol = true == pancontrol ? !0 : !1;
					zoomcontrol = true == zoomcontrol ? !0 : !1;
					draggable = false == draggable ? !1 : !0;
					scrollwheel = true == scrollwheel ? !0 : !1;
					typecontrol = true == typecontrol ? !0 : !1;
					scalecontrol = true == scalecontrol ? !0 : !1;
					streetcontrol = true == streetcontrol ? !0 : !1;
					center || ( center = '' ); // latitude, longitude

					$.post( 'gmap/generatemap.php', { 'config':
						{
							'width' : width,
							'height' : height,
							'maptype' : maptype,
							'zoom' : zoom,
							'address' : address,
							'description' : description,
							'popup' : popup,
							'icon' : icon,
							'iconsize' : iconsize,
							'pancontrol' : pancontrol,
							'zoomcontrol' : zoomcontrol,
							'draggable' : draggable,
							'scrollwheel' : scrollwheel,
							'typecontrol' : typecontrol,
							'scalecontrol' : scalecontrol,
							'streetcontrol' : streetcontrol,
							'center' : center
						},
					}).done(function( result ) {
						ele.html(result);
					});
			});
		},

		gMapResize : function(){
			var t = $(".mendi-map",".mendi-theme-container");
			t.length > 0 && t.each(function(){
				var t = $(this),
					map = t.data('gmap').gmap;

				 google.maps.event.trigger( map, 'resize' );
				 t.gMap('fixAfterResize');
			});
		},
		
		commentForm : function(){
			var t = $(".mendi-contact-form");
			t.length > 0 && t.each(function(){
				var t = $(this);
				t.validate({
					ignore: ".ignore",
					errorPlacement: function( error, element ){},
					submitHandler: function(form) {
						$(form).find('.mendi-form-process').fadeIn();
						$(form).ajaxSubmit({
							target: $(form).find('.mendi-contact-form-result'),
							success: function() {
								$(form).find('.mendi-form-process').fadeOut();
								$(form).find(".mendi-form-control").val('');
							}
						});
					}
				});
			});
		},

		gradientAnimation : function() {
			var t = $(".mendi-gradient-animate");
			t.length > 0 && t.each(function(){
				var t = $(this),
					speed = t.data("speed"),					
					colors = t.data("colors");

					speed || ( speed = 35 );										
					colors || ( colors = '#e8594f,#9d8c00,#088b99,#4c0158' );

				var background = 'linear-gradient(270deg,'+ colors	+')';
				var animation = 'mendi-gradient-animate ' + (speed) + 's ease infinite';

				colors = colors.split(',');
				var backgroundsize = (colors.length * 100) + '% ' + (colors.length * 100) + '%';

				t.css('animation', 'none');
				t.css('background-size', 'auto');

				setTimeout(function(){
					t.css('background', background);
					t.css('background-size', backgroundsize);
					t.css('animation', animation );
					$.keyframe.define([{
						name: 'mendi-gradient-animate',
						'0%': { 'background-position': '90% 0%' },
						'50%': { 'background-position': '11% 100%' },
						'100%': { 'background-position': '90% 0%'}
					}]);
				});
			});
		}		
	},

	MENDI.portfolio = {

		arrange : function(){

			var t = $(".mendi-portfolio-holder",".mendi-theme-container");
			t.length > 0 && t.each(function(){
				t.isotope('layout');
			});
		},

		filter : function(){

			$(".mendi-portfolio-holder",".mendi-theme-container").each(function(){
				var ele = $(this);
				ele.isotope({ transitionDuration: '0.65s' });
			});

			var t = $("a",".mendi-portfolio-filter");
			t.length > 0 && t.each(function(){

				var ele = $(this);

				ele.on("click",function(e){
					e.preventDefault();

					var filter = ele.data("filter");
					ele.parents("ul").find("a.current").removeClass("current");
					ele.addClass("current");

					$(".mendi-portfolio-holder").isotope({
						filter: filter
					});
				});				
			});
		},

		loadMorePortfolios : function(){

			$(".mendi-portfolio-holder",".mendi-theme-container").each(function(){
				var ele = $(this);

				var $a = ele.infinitescroll({
					loading:{
						finishedMsg: '<i class="fa fa-check"></i>',
						msgText: '<i class="fa fa-spinner fa-spin"></i>',
						speed: 'normal'
					},
					state: {
						isDone : false
					},
					nextSelector:'#load-more-portfolios a',
					navSelector:'#load-more-portfolios',
					itemSelector:'article.mendi-portfolio-item',
					behavior: 'portfolioinfiniteitemsloader'
				}, function( newEle){
					ele.isotope( 'appended', $( newEle ) );
					setTimeout( function(){
						ele.isotope('layout');
					}, 2000 );
				});
			});
		},

		galleryFormat : function() {
			var t = $(".mendi-portfolio-details-slideshow",".mendi-theme-container");
			t.length > 0 && t.each(function(){
				var ele = $(this),
					transition = ele.data("transition"),
					autoplay = ele.data("autoplay"),
					stoponhover = ele.data("stoponhover"),
					navigation = ele.next("#mendi-portfolio-details-slideshow-nav").attr("id");

				transition || ( transition = "fadeUp" ); // fade, backSlide, goDown, fadeUp
				autoplay = false == autoplay ? !1 : !0;
				stoponhover = false == stoponhover ? !1 : !0;
				
				ele.owlCarousel({
					pagination : false,
					singleItem : true,
					autoHeight : true,
					navigation : navigation,
					autoPlay : autoplay,
					stopOnHover : stoponhover,
					transitionStyle : transition
				});
				
				$("#"+navigation+" .next").on("click", function(){
					ele.trigger('owl.next');
				});
				
				$("#"+navigation+" .prev").on("click",function(){
					ele.trigger('owl.prev');
				});
			});
		},
	},

	MENDI.utils = {

		isMobile : function(){
			return MENDI.utils.isAndroid() || 
			MENDI.utils.isBlackBerry() ||
			MENDI.utils.isiOS() ||
			MENDI.utils.isOpera() ||
			MENDI.utils.isWindows();
		},

        isAndroid: function() {

            return navigator.userAgent.match(/Android/i)
        },

        isBlackBerry: function() {

            return navigator.userAgent.match(/BlackBerry/i)
        },

        isiOS: function() {

            return navigator.userAgent.match(/iPhone|iPad|iPod/i)
        },

        isOpera: function() {

            return navigator.userAgent.match(/Opera Mini/i)
        },

        isWindows: function() {

            return navigator.userAgent.match(/IEMobile|Windows Phone/i)
        },

        formatTwitterTweets: function( tweets ) {
        	var html = [];
        	for( var i=0; i<tweets.length; i++ ) {
        		var username = tweets[i].user.screen_name;
        		var status = tweets[i].text.replace( /((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g , function(url){
        			return '<a href="'+url+'" target="_blank">'+url+'</a>';
        		}).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
        			return  reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'" target="_blank">'+reply.substring(1)+'</a>';
        		});

        		html.push('<li><span>'+status+'</span><small><a href="http://twitter.com/'+username+'/statuses/'+tweets[i].id_str+'" target="_blank">'+MENDI.utils.formatTwitterTweetTime(tweets[i].created_at)+'</a></small></li>');
        	}

        	return html.join('');
        },

        formatTwitterTweetTime: function( time ) {
        	var values = time.split(" ");
        	var time = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
        	var parsed_date = Date.parse( time );
        	var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
        	var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
        	delta = delta + (relative_to.getTimezoneOffset() * 60);

			if (delta < 60) {
				return 'less than a minute ago';
			} else if(delta < 120) {
				return 'about a minute ago';
			} else if(delta < (60*60)) {
				return (parseInt(delta / 60)).toString() + ' minutes ago';
			} else if(delta < (120*60)) {
				return 'about an hour ago';
			} else if(delta < (24*60*60)) {
				return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
			} else if(delta < (48*60*60)) {
				return '1 day ago';
			} else {
				return (parseInt(delta / 86400)).toString() + ' days ago';
			}
        },

        goToTop: function() {
        	$("#mendi-goto-top").click(function( e ){
        		e.preventDefault();
        		$("body,html").stop(true).animate({ scrollTop:0 },700);
            });
        },

        goToTopScroll: function( arg ) {
        	arg.scrollTop() > 300 ? $("#mendi-goto-top").fadeIn() 
        		: $("#mendi-goto-top").fadeOut();
        },

        maxHeight: function(){

        	var t = $('.mendi-equal-height');

        	t.length > 0 && t.each(function(){

        		var element = $(this);
        		if( element.has('.mendi-equal-height') ) {

        			MENDI.utils.equalHeight(element.find('.mendi-equal-height'));
        		}

        		MENDI.utils.equalHeight( element );
        	});
		},

		equalHeight: function( element ){
			var maxHeight = 0;
			element.children('[class^=mendi-col-]').each(function() {
				var element = $(this).children('div');
				if( element.hasClass('max-height') ){
					maxHeight = element.outerHeight();
				} else {
					if (element.outerHeight() > maxHeight){
						maxHeight = element.outerHeight();
					}
				}
			});

			element.children('[class^=mendi-col-]').each(function() {
				$(this).height(maxHeight);
			});
		},
	},

	MENDI.documentOnReady = {
		init : function(){
			
			MENDI.pageAnimsition();

			MENDI.header.subMenu();

			MENDI.header.stickyMenu();

			MENDI.header.verticalMenuCurrentSection();

			MENDI.header.verticalMenu();

			MENDI.header.responsiveMenu();

			MENDI.header.menuSearch();

			MENDI.ui.init();
			$(".mendi-portfolio-holder").length > 0 && $(".mendi-portfolio-filter").length > 0 && MENDI.portfolio.filter();

			MENDI.utils.goToTop();

			MENDI.documentOnReady.windowscroll();

			MENDI.fullScreenSection();

			MENDI.header.zoomOutImage( $(window) );

			MENDI.portfolio.galleryFormat();
		},

		windowscroll : function() {

			$(window).on( 'scroll', function(){

				MENDI.utils.goToTopScroll( $(this) );

				MENDI.header.stickyMenu();

				MENDI.header.verticalMenuCurrentSection();

				window.requestAnimationFrame(MENDI.header.animateZoomOutImage);
			});
		}
	},
	
	MENDI.documentOnLoad = {
		init : function(){
			
			MENDI.utils.maxHeight();

			$(".mendi-portfolio-holder").length > 0 && $(".mendi-portfolio-filter").length > 0 && MENDI.portfolio.filter();
			$(".mendi-portfolio-holder").length > 0 && $("#load-more-portfolios").length > 0 && MENDI.portfolio.loadMorePortfolios();

			MENDI.header.stickyMenu();

			MENDI.ui.verticalMiddle();

			MENDI.ui.html5Video();
		}
	},
	
	MENDI.documentOnResize = {
		init : function(){
			
			MENDI.utils.maxHeight();

			$(".mendi-portfolio-holder").length > 0 && MENDI.portfolio.arrange();

			MENDI.fullScreenSection();

			MENDI.ui.verticalMiddle();

			MENDI.ui.html5Video();

			MENDI.ui.gMapResize();

			MENDI.header.zoomOutImage( $(window) );
		}
	},
	
	$(document).ready( MENDI.documentOnReady.init );
	$(window).load( MENDI.documentOnLoad.init );
	$(window).on( "resize" , MENDI.documentOnResize.init );
})(jQuery);