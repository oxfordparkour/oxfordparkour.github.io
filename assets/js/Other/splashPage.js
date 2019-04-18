jQuery(function($) {
	function correctSloganHeight(){
		var targetHeight = $('.content').outerHeight();
		$('#slogan h2').css('line-height', targetHeight.toString()+"px");
		$('#slogan')
			.css('height', targetHeight.toString()+"px")
			.css('margin-bottom', (-targetHeight).toString()+"px");
	}
	function correctSloganOffset(){
		var targetOffset = ($('.sliderRow').width()/2);
		$("#slogan .left")
			.css('margin-left', (-targetOffset).toString()+"px")
			.css('margin-right', targetOffset.toString()+"px");
		$("#slogan .right")
			.css('margin-left', targetOffset.toString()+"px")
			.css('margin-right', (-targetOffset).toString()+"px");
		$('#slogan').addClass('open');
	}
	function applyWave() {
		$('#slogan h2').lettering();
		var $leftSide = $('#slogan .left h2');
		var $rightSide = $('#slogan .right h2');
		var $leftLetters = $($leftSide.children("span").get().reverse());
		var $rightLetters = $($rightSide.children("span"));
	
		
		$('#slogan h2 span').each(function(i){
			$(this).delay(i*60).animate({ top:'-10px' }, 100, function(){
				$(this).animate({top: 0});
			});
		});
	}
	
	function zoomTextOut(){
	    $('#slogan h2').css("font-size", "60px");
	    $('#slogan h2').animate({"font-size": "30px"}, 500);
	}
	
	function flashLights(){
	    //todo
	}
	
	function shimmerText(){
		
		$('#slogan h2 span').each(function(i){
			$(this).delay(i*40).fadeTo( 100, 1 );
			$(this).delay(10).fadeTo( 100, 0.8 );
		});
	}
	
	var $mainSlider = $('#slider .wsite-elements');
	$mainSlider.on('init', function(slick) { correctSloganHeight(); });
	$(window).resize( function() { 
		correctSloganHeight();
		correctSloganOffset();
	});
	
	$mainSlider.slick({
	   autoplay: true,
	   autoplaySpeed: 4000,
	   infinite: true,
	   adaptiveHeight: true,
	   arrows: false,
	});
	
	$('#feedbackSlider').slick({
	   autoplay: true,
	   autoplaySpeed: 5000,
	   infinite: true,
	   adaptiveHeight: false,
	   arrows: false,
	});
	
	$(document).ready(function(){
		$('#slogan h2').lettering();
	    $('#slogan h2 span').css("opacity","0" ); /* Hides the text */
	});
	
	$(window).load(function(){
		correctSloganHeight();
		$('#slogan h2 span').css("opacity","0.8" ); /* Makes the text appear */
		zoomTextOut();
		setTimeout( function(){
			shimmerText()
		}, 1200 );
		setTimeout( function(){
				correctSloganOffset();
				setTimeout( function(){
					$('#slogan').css('z-index',1); //Make the slider clickable again
				}, 2000 ); //this matches the css transition time for the .left, .right and h2 elements
		}, 4000 );     // Pause for 3 seconds before opening up.
	});
});