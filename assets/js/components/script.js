'use strict';

		$(window).load(function() {

			var header = $('header'),
					navBtn = $('.nav-btn'),
					//navlink = $('.nav-link'),
					//expBtn = $('.bttn-exp'),
					// expBtnText = $('.bttn-exp').text(),
					// techFrame,
					$window = $(window),
					// btnPlay = $('.vid-btn'),
					// btnText = btnPlay.text(),
					//poster = $('.vid-ph'),
					// iframe = $('#vid1')[0],
					// vid = $f(iframe),
					// vidPlaying = false,
					$carousel = $('.carousel'),
					mapABoxText = '<h6>LONDON</h6><p>109-123 Clifton Street,<br>London,<br>EC2A 4LD</p><p class="call">Call us <a href="tel:+442077291000">+44 (0)20 7729 1000</a></p><p class="email">Email us <a href="mailto:hello@rhapsodydigital.co.uk">hello@rhapsodydigital.co.uk</a></p>',
					mapBBoxText = '<h6>READING</h6><p>Wyvols Court,<br>Swallowfield,<br>Reading,<br>RG7 1WY</p><p class="call">Call us <a href="tel:+448458723494">+44 (0)845 872 3494</a></p><p class="email">Email us <a href="mailto:michael.faris@rhapsodymedia.co.uk">michael.faris@rhapsodymedia.co.uk</a></p>',
					//readMore = $('.read-more'),
					// $newsTemplate = $('.hbs-news-posts'),

					handleScrollFn = function () {
						if ($window.scrollTop() > 250) {
					    header.addClass('fixed').removeClass('menu-open');
					  } else {
					    header.removeClass('fixed menu-open');
					  }

						// if ($window.scrollTop() > 580 && vidPlaying) {
						// 	vid.api('pause');
						// }
					},

					resizeHero = function (isMobile) {
						if (isMobile) {
							var vHeight = $window.height();
							$('.hero, .hero .slide').css('height', vHeight + 'px');
						} else {
							$('.hero, .hero .slide').css('height', 'auto');
						}
					},

					handleNav = function (e) {
						header.toggleClass('menu-open');
						//header.hasClass('fixed') ? {} : header.addClass('fixed');
						e.preventDefault();
					},

					initMap = function (lat,lng,el,zoomLevel,infoText) {
					// Basic options for a simple Google Map
					// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
					// API key (referenced in the script includes in footer) is generated from rhapsody.dps@gmail.com
						var mapOptions = {
							// How zoomed in you want the map to start at (always required)
							zoom: zoomLevel,
							panControl: false,
							mapTypeControl: false,
							zoomControl: false,
							scrollwheel: false,

						// The latitude and longitude to center the map (always required)
						center: new google.maps.LatLng(lat, lng), // coords

						// How you would like to style the map. 
						// This is where you would paste any style found on Snazzy Maps.
						styles: [{'featureType':'landscape','stylers':[{'saturation':-100},{'lightness':65},{'visibility':'on'}]},{'featureType':'poi','stylers':[{'saturation':-100},{'lightness':51},{'visibility':'simplified'}]},{'featureType':'road.highway','stylers':[{'saturation':-100},{'visibility':'simplified'}]},{'featureType':'road.arterial','stylers':[{'saturation':-100},{'lightness':30},{'visibility':'on'}]},{'featureType':'road.local','stylers':[{'saturation':-100},{'lightness':40},{'visibility':'on'}]},{'featureType':'transit','stylers':[{'saturation':-100},{'visibility':'simplified'}]},{'featureType':'administrative.province','stylers':[{'visibility':'off'}]},{'featureType':'water','elementType':'labels','stylers':[{'visibility':'on'},{'lightness':-25},{'saturation':-100}]},{'featureType':'water','elementType':'geometry','stylers':[{'hue':'#ffff00'},{'lightness':-25},{'saturation':-97}]}]
						};

						// Get the HTML DOM element that will contain your map 
						// We are using a div with id='map' seen below in the <body>
						var mapElement = document.getElementById(el);

						// Create the Google Map using our element and options defined above
						var map = new google.maps.Map(mapElement, mapOptions);

						// Let's also add a marker while we're at it
						var marker = new google.maps.Marker({
								position: new google.maps.LatLng(lat, lng),
								map: map,
								icon: 'assets/img/structure/' + el + '-map-marker.png',
								title: 'Rhapsody Digital'
						});

						var infowindow = new google.maps.InfoWindow(),
								boxText = document.createElement('div');
								boxText.innerHTML = infoText;

						google.maps.event.addListener(marker, 'click', function() {
							infowindow.setContent(boxText);
							infowindow.open(map, marker);
						});


					},

					wow = new WOW({
					    boxClass:     'wow',      // animated element css class (default is wow)
					    animateClass: 'animated', // animation css class (default is animated)
					    offset:       0,          // distance to the element when triggering the animation (default is 0)
					    mobile:       false,       // trigger animations on mobile devices (default is true)
					    live:         true       // act on asynchronously loaded content (default is true)
					    // callback:     function(box) {
					    //   // the callback is fired every time an animation is started
					    //   // the argument that is passed in is the DOM node being animated
					    // }
					  }
					),

					handleInfoBox = function (e) {
						e.preventDefault();

						if ($window.innerWidth() < 481) {
							return;
						}

						var $this = $(this),
								$parent = $this.parent();

						if ($parent.hasClass('show')) {
							$parent.removeClass('show')
								.next('.wrapper-info').slideUp('medium');
							$this.blur();
						} else if ($('.item').hasClass('show')) {
							$('.item.show').removeClass('show')
								.next('.wrapper-info').slideUp('medium');
							$parent.addClass('show')
								.next('.wrapper-info').slideDown('medium');
						} else {
							$parent.addClass('show')
								.next('.wrapper-info').slideDown('medium');
						}
						
					};

					// handleNavLink = function (e) {
					// 	header.removeClass('menu-open');
					// 	e.preventDefault();
					// },
					if ($('.map').length) {
						initMap(51.5236779, -0.0833322, 'mapA', 17, mapABoxText); //rhapsody london
						initMap(51.379355, -0.961820, 'mapB', 15, mapBBoxText); //rhapsody reading
					}

					$window.on('scroll', handleScrollFn);
					navBtn.on('click', handleNav);
					// navlink.on('click', handleNavLink);
					$(header).scrollupbar();
					handleScrollFn();
					wow.init();

			if ($window.innerWidth() < 1025) {
				resizeHero(true);
			}

      // Init gallery
		  $carousel.slick({
				lazyLoad: 'progressive',
		    slidesToShow: 1,
		    slidesToScroll: 1,
		    arrows: false,
		    swipe: true,
		    autoplay: true,
		    pauseOnHover: true,
		    autoplaySpeed: 4000,
		    infinite: true,
		    speed: 800,
		    fade: true,
		    dots: true,
		    slide: '.slide',
		    cssEase: 'linear'
		  });

		  var $container = $('.packery');

			// init			
			$container.packery({
			  itemSelector: '.item',
			  gutter: 0,
			  percentPosition: true
			});

			var panels = $('.service .panel'),
					terms = [],
					panelTerms = [],
					count = 0;

			function panelAnim(arr) {
			    if (count == arr.length) {
			        count = 0;
			    }

			    panelTerms = terms[count].split(',');

			    var term = panelTerms[Math.floor(Math.random() * panelTerms.length)];
			    
			    $(panels).removeClass('anim')
						.eq(count).addClass('anim')
							.find('.back p').text(term);

					count++;
			    
			    setTimeout(function () {
			        panelAnim(panels);
			    }, 1700);
			}

			if (panels.length) {
				$(panels).each(function () {
					terms.push($(this).data('terms'));
				});
				panelAnim(panels);
			}
			
			$('.management .img').on('click', handleInfoBox);

			$window.on('resize', function () {
				if ($(this).innerWidth() < 1025) {
					resizeHero(true);
					// setCapHeight(true);
				} else {
					resizeHero(false);
				}

			});
		});