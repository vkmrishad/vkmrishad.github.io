"use strict";

/*****Ready function start*****/
$(document).ready(function(){
   /*eric function init start*/
	eric();
   /*eric function init end*/

   /*Preload anim start*/
   $('#la_anim').addClass('la-animate');
   /*Preload anim end*/
});
/*****Ready function end*****/

/*****Load function start*****/
$(window).load(function(){
	
	/*Page load animaion start*/
	setTimeout(function() { 
		$("#main_content").addClass("content-block-animation"); 
	}, 1000);
	setTimeout(function() { 
		$("#vertical_nav_wrap").addClass("vertical-nav-animation"); 
	}, 2000);
	setTimeout(function() { 
		$("header").addClass("header-animation"); 
	}, 1900);
	$("#pre_load").delay(500).fadeOut("slow");
	$("body").css('overflow-y','visible');
	/*Page load animaion end*/
	
	/*masonryPortfolio function init start*/
	masonryPortfolio();
	/*masonryPortfolio function init end*/
});
/*****Load function* end*****/

/*****Scroll function start*****/
$(window).scroll(function() {
	var navTop = $('header');
	
	/*Header animaion onscroll*/
	var scroll = $(window).scrollTop();
	if (scroll >= 150) {
		$(navTop).addClass("fixed");
	} else {
		 $(navTop).removeClass("fixed");
	}
	/*Header animaion onscroll*/
	
});
/*****Scroll function start*****/

/***** Full height function start *****/
var setHeight = function () {
	var height = $(window).height();
	$('.full-height').css('min-height', (height));
};
/***** Full height function end *****/

/***** Scrollspy function start *****/
var fixSpy = function() {
	var body   = $('body'), 
		navTop = $('header'),
		offset  = navTop.outerHeight() + 15;
		body.scrollspy({target: '.navbar-collapse', offset: offset });
	var data = body.data('bs.scrollspy');
	if (data) {
		data.options.offset = offset;
		body.data('bs.scrollspy', data);
		body.scrollspy('refresh');
	}
}
/***** Scrollspy function end *****/

/***** Timeline Function start *****/		
var timelineheightCal = function() {	
	var container = $('.exp-timeline-wrap');
	var expTimeline = $('.exp-timeline');
	
	for(var i = 0; i < expTimeline.length; i++){
		$(expTimeline[i]).hover(
			function() {
				for(var i = 0; i < expTimeline.length; i++){
					$(expTimeline[i]).addClass( "timeline-inactive" ).removeClass( "timeline-active" );
				}	
				$(this).addClass( "timeline-active" );
			}, function() {
				for(var i = 0; i < expTimeline.length; i++){
					$(expTimeline[i]).removeClass( "timeline-active" ).removeClass( "timeline-inactive" );
				}
				$(expTimeline).first().addClass( "timeline-active" );
			}
		);
		$(expTimeline[i]).attr('style', '').find('.timeline-st').attr('style', '');
		
		var height = $(expTimeline[i]).height();
		var newHeight = 0;
		newHeight = height + 43;
		
		$(expTimeline[i]).css({ height : newHeight}).find('.timeline-st').css({ height : newHeight - 15});
	}
	$(expTimeline).last().css({ height : newHeight - 43}).find('.timeline-st').css({ height : newHeight - 58});
};
/***** Timeline Function end *****/

/***** Resize function start *****/
var resizeTimer;
var navTop = $('header');
$(window).on("resize", function () {
	
	/*Function calls onresize start*/
	setHeight();
	timelineheightCal();
	/*Function calls onresize end*/
	
	var winWidth =  $(window).outerWidth();
	navTop = $('header').height()-1; 
	/*Page load animaion start*/
	
	/*SmoothScroll start*/
		smoothScroll.init({
			speed: 800,
			easing: 'easeInOutCubic',
			offset: navTop,
			updateURL: false,
			callbackBefore: function ( toggle, anchor ) {},
			callbackAfter: function ( toggle, anchor ) {},
		});
	/*SmoothScroll End*/
	
	/*Scrollspy start*/	
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(fixSpy, 200);
	/*Scrollspy end*/
	
	/*Header Related start*/
	if(winWidth <= 1182)
		$("nav.navbar").removeClass("vertical-nav").appendTo($(".header-wrap"));
		else 
			$("nav.navbar").addClass("vertical-nav").appendTo($("#vertical_nav_wrap"));
	
	$('.navbar-collapse.in').collapse('hide'); 
	/*Header Related end*/
}).resize();
/***** Resize function end *****/

/***** Eric function start *****/
var eric = function (){
	
	/*Typed js start*/
	$("#typed").typed({
		strings: ["^2100&nbsp;I am Mohammed Rishad,<br>Backend Developer at Chronext. I'm from India🇮🇳 and currently residing in Köln, Germany🇩🇪."],
		typeSpeed: 30,
		backDelay: 750,
		loop: false,
		cursorChar: "|",
		contentType: 'html', // or text
		// defaults to false for infinite loop
		loopCount: false
	});
	/*Typed js end*/
	
	/*Client carousel start*/
	$('#client_sec .client-carousel').owlCarousel({
		loop:true,
		margin:15,
		nav:false,
		dots:false,
		responsive:{
			0:{
				items:1
			},
			200:{
				items:2
			},
			400:{
				items:3
			},
			600:{
				items:4
			},
			1200:{
				items:3
			},
			1300:{
				items:4
			},
			1600:{
				items:5
			}
		}
	});
	/*Client carousel end*/
	
	/*Header animation start*/
	var scroll = $(window).scrollTop();
	var header = $("header");
	if (scroll >= 150)
		$(header).addClass("fixed");
		else
			$(header).removeClass("fixed");
	/*Header animation end*/
	
	/*Progressbar animation start*/
	var progressBar = $('.progress-bar-graph div');
	for(var i = 0; i < progressBar.length; i++){
		$(progressBar[i]).appear(function(){			
			var percent = $(this).find('span').attr('data-width');
			var $endNum = parseInt($(this).find('.bar-wrap strong i').text(),10);
			
			var $that = $(this);			
			$(this).find('span').animate({
				'width' : percent + '%'
			},1600, function(){
			});			
			$(this).find('.bar-wrap strong').animate({
				'opacity' : 1
			},1400);			
			$(this).find('.bar-wrap strong i').countTo({
				from: 0,
				to: $endNum,
				speed: 1200,
				refreshInterval: 30,
				onComplete: function(){}
			});	 
			if(percent == '100'){
				$that.find('bar-wrap strong').addClass('full');
			}	
		});
	}
	/*Progressbar animation end*/
	
	/*Header script start*/
    //	var navbarList = $('nav.navbar li');
    //	for(var i = 0; i < navbarList.length; i++){
    //		var text = $(navbarList[i]).find('span').text();
    //		$(navbarList[i]).find('a').append('<span>'+text+'</span>');
    //	}
	/*Header script end*/
	
	/*Wow animation start*/
	var wow = new WOW(
	{
	boxClass: 'wow', // animated element css class (default is wow)
	animateClass: 'animated', // animation css class (default is animated)
	offset: 0, // distance to the element when triggering the animation (default is 0)
	mobile: false, // trigger animations on mobile devices (default is true)
	live: true // act on asynchronously loaded content (default is true)
	}
	);
	
	wow.init();
	/*Wow animation end*/
}
/***** Eric function end *****/

/***** Click function start *****/
$(document).on('click','.navbar-collapse.in a',function(e) {
      $('.navbar-collapse.in').collapse('hide'); 
	   return false;
});
/***** Click function end *****/

/***** MasonryPortfolio function start *****/		
var masonryPortfolio = function() {	
	
		if( $('#portfolio-wrap').length > 0 ){	
		
			var $container = $('#portfolio');
		
			var activate_port= (function(){
				$container.isotope({
					itemSelector: '.item',
					transitionDuration: "0.8s",
				});		
			});
			
					
			$(window).on( 'resize', function () {
			
				var winWidth = window.innerWidth;
				var container_mock = $('#work_sec').width();
				columnNumb = 1;			
				var attr_col = $('#portfolio').attr('data-col');
					
				 if (winWidth >= 1466) {
					
					$('#portfolio-wrap').css( {width : container_mock});
					$('#portfolio-wrap.no-gutter').css( {width : container_mock});			
					$('#portfolio-wrap.no-gutter.full-width').css( {width : 100  + '%'});			
					var portfolioWidth = $('#portfolio-wrap').width();
					
					if (typeof attr_col !== typeof undefined && attr_col !== false) {
						columnNumb = $('#portfolio').attr('data-col');
					} else columnNumb = 3;
						
					var postWidth = Math.floor(portfolioWidth / columnNumb)			
					$container.find('.item').each(function () { 
						$('.item').css( { 
							width : postWidth - 20 + 'px',
							height : 'auto',
							margin : 10 + 'px' 
						});
						$('.no-gutter .item').css( {
							width : postWidth  + 'px',
							height : 'auto',
							margin : 0 + 'px' 
						});
						$('.item.wide').css( { 
							width : postWidth * 2 - 20 + 'px'  
						});
						$('.no-gutter .item.wide').css( { 
							width : postWidth * 2 + 'px'  
						});
						$('.item.tall').css( {
							height : 'auto' 
						});
						$('.item.small').css( {
							height : 'auto',  
						});
					
						$('.no-gutter .item.tall').css( {
							height : postWidth * 2  + 'px'  
						});
						$('.item.wide-tall').css( {
							width : postWidth * 2 - 20 + 'px',
							height : postWidth * 2 - 20 + 'px'  
						});
						$('.no-gutter .item.wide-tall').css( {
							width : postWidth * 2 + 'px',
							height : postWidth * 2  + 'px'  
						});
					});
					
					
				} else if (winWidth > 1024) {
					
					$('#portfolio-wrap').css( {width : container_mock});
					$('#portfolio-wrap.no-gutter').css( {width : container_mock});		
					var portfolioWidth = $('#portfolio-wrap').width();
								
					if (typeof attr_col !== typeof undefined && attr_col !== false) {
						columnNumb = $('#portfolio').attr('data-col');
					} else columnNumb = 3;
					
					postWidth = Math.floor(portfolioWidth / columnNumb)			
					$container.find('.item').each(function () { 
						$('.item').css( { 
							width : postWidth - 20 + 'px',
							height : 'auto',
							margin : 10 + 'px' 
						});
						$('.no-gutter .item').css( {
							width : postWidth  + 'px',
							height : postWidth  + 'px',
							margin : 0 + 'px' 
						});
						$('.item.wide').css( { 
							width : postWidth * 2 - 20 + 'px'  
						});
						$('.no-gutter .item.wide').css( { 
							width : postWidth * 2 + 'px'  
						});
						$('.item.tall').css( {
							height : 'auto', 
						});
						$('.item.small').css( {
							height : 'auto',  
						});
						$('.no-gutter .item.tall').css( {
							height : postWidth * 2  + 'px'  
						});
						$('.item.wide-tall').css( {
							width : postWidth * 2 - 20 + 'px',
							height : postWidth * 2 - 20 + 'px'  
						});
						$('.no-gutter .item.wide-tall').css( {
							width : postWidth * 2 + 'px',
							height : postWidth * 2  + 'px'  
						});
					});
					
					
				} else if (winWidth > 767) {
					
					$('#portfolio-wrap').css( {width : container_mock});
					$('#portfolio-wrap.no-gutter').css({width : container_mock});
					var portfolioWidth = $('#portfolio-wrap').width(),
					
					columnNumb = 2;
					postWidth = Math.floor(portfolioWidth / columnNumb)			
					$container.find('.item').each(function () { 
						$('.item').css( { 
							width : postWidth - 20 + 'px',
							height : 'auto',
							margin : 10 + 'px' 
						});
						$('.no-gutter .item').css( {
							width : postWidth  + 'px',
							height : postWidth   + 'px',
							margin : 0 + 'px' 
						});
						$('.item.wide').css( { 
							width : postWidth * 2 - 20 + 'px'  
						});
						$('.no-gutter .item.wide').css( { 
							width : postWidth * 2 + 'px'  
						});
						$('.item.tall').css( {
							height : 'auto',
						});
						$('.item.small').css( {
							height : 'auto',  
						});
						$('.no-gutter .item.tall').css( {
							height : postWidth * 2  + 'px'  
						});
						$('.item.wide-tall').css( {
							width : postWidth * 2 - 20 + 'px',
							height : postWidth * 2 - 20 + 'px'  
						});
						$('.no-gutter .item.wide-tall').css( {
							width : postWidth * 2 + 'px',
							height : postWidth * 2  + 'px'  
						});
					});
					
					
				}	else if (winWidth > 479) {
					
					$('#portfolio-wrap').css( {width : container_mock});
					$('#portfolio-wrap.no-gutter').css( {width : container_mock});
					var portfolioWidth = $('#portfolio-wrap').width(),
					
					columnNumb = 1;
					postWidth = Math.floor(portfolioWidth / columnNumb)			
					$container.find('.item').each(function () { 
						$('.item').css( { 
							width : postWidth - 20 + 'px',
							height : 'auto',
							margin : 10 + 'px' 
						});
						$('.no-gutter .item').css( {
							width : postWidth  + 'px',
							height : postWidth   + 'px',
							margin : 0 + 'px' 
						});
						$('.item.wide').css( { 
							width : postWidth - 20 + 'px'  
						});
						$('.no-gutter .item.wide').css( { 
							width : postWidth + 'px'  
						});
						$('.item.tall').css( {
							height : 'auto', 
						});
						$('.item.small').css( {
							height : 'auto',  
						});
						$('.no-gutter .item.tall').css( {
							height : postWidth * 2  + 'px'  
						});
						$('.item.wide-tall').css( {
							width : postWidth - 20 + 'px',
							height : postWidth  - 20 + 'px'  
						});
						$('.no-gutter .item.wide-tall').css( {
							width : postWidth  + 'px',
							height : postWidth  + 'px'  
						});
					});
					
					
				}
				
				else if (winWidth <= 479) {
					
					$('#portfolio-wrap').css( {width : container_mock});
					$('#portfolio-wrap.no-gutter').css( {width : container_mock});
					var portfolioWidth = $('#portfolio-wrap').width(),
					
					columnNumb = 1;
					postWidth = Math.floor(portfolioWidth / columnNumb)			
					$container.find('.item').each(function () { 
						$('.item').css( { 
							width : postWidth - 20 + 'px',
							height : 'auto',
							margin : 10 + 'px' 
						});
						$('.no-gutter .item').css( {
							width : postWidth  + 'px',
							height : postWidth   + 'px',
							margin : 0 + 'px' 
						});
						$('.item.wide').css( { 
							width : postWidth - 20 + 'px'  
						});
						$('.no-gutter .item.wide').css( { 
							width : postWidth + 'px'  
						});
						$('.item.tall').css( {
							height : 'auto',  
						});
						$('.item.small').css( {
							height : 'auto',  
						});
						$('.no-gutter .item.tall').css( {
							height : postWidth * 2  + 'px'  
						});
						$('.item.wide-tall').css( {
							width : postWidth - 20 + 'px',
							height : postWidth  - 20 + 'px'  
						});
						$('.no-gutter .item.wide-tall').css( {
							width : postWidth + 'px',
							height : postWidth + 'px'  
						});
					});
					
					
				}		
				return columnNumb;
				
			
			}).resize();
		
			activate_port();	
			
		}
	}
/***** MasonryPortfolio function End *****/

/***** Placehoder ie9 start*****/
$('input[type=text], textarea').placeholder();
/***** Placehoder ie9 end*****/	

/***** LightGallery init start*****/	
// $('#portfolio').lightGallery({  showThumbByDefault: false,hash: false});
/***** LightGallery init end*****/			
