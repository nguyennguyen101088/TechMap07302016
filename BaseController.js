function BaseController($scope, $timeout) {
	$scope.initMenuView = function () {
		//stick in the fixed 100% height behind the navbar but don't wrap it
		$timeout(function(){
			$('#slide-nav.navbar-inverse').after('<div class="inverse" id="navbar-height-col"></div>');
			$('#slide-nav.navbar-default').after('<div id="navbar-height-col"></div>');
		});

		// Enter your ids or classes
		var pagewrapper = '#page-content';
		var navigationwrapper = '.navbar-header';
		var menuwidth = '100%'; // the menu inside the slide menu itself
		var slidewidth = '80%';
		var menuneg = '-100%';
		var slideneg = '-80%';
		//
		$(".navbar-toggle").on("click", function (e) {
			var selected = $(this).hasClass('slide-active');

			$('#slidemenu').stop().animate({
				left: selected ? menuneg : '0px'
			});

			$('#navbar-height-col').stop().animate({
				left: selected ? slideneg : '0px'
			});

			$(pagewrapper).stop().animate({
				left: selected ? '0px' : slidewidth
			});

			$(navigationwrapper).stop().animate({
				left: selected ? '0px' : slidewidth
			});
			$(this).toggleClass('slide-active', !selected);
			$('#slidemenu').toggleClass('slide-active');
			$('#page-content, .navbar, body, .navbar-header').toggleClass('slide-active');
		});

		var selected = '#slidemenu, #page-content, body, .navbar, .navbar-header';
		$(window).on("resize", function () {
			if ($(window).width() > 767 && $('.navbar-toggle').is(':hidden')) {
				$(selected).removeClass('slide-active');
			}
		});
	};
	$scope.initMapView = function(Latitude, Longitude){
		// if (window.initializeMap == undefined) {
			// window.initializeMap = initializeMap;
			// loadScript('http://maps.googleapis.com/maps/api/js?v=3&sensor=false&callback=initializeMap',
				// function () {
				// console.log("google-loader has been loaded, but not the maps-API");
			// });
		// }
		
		window.initializeMap = initializeMap;
		loadScript('http://maps.googleapis.com/maps/api/js?v=3&sensor=false&callback=initializeMap',
			function () {
			console.log("google-loader has been loaded, but not the maps-API");
		});
		
		function loadScript(src, callback) {
			var script = document.createElement("script");
			script.type = "text/javascript";
			if (callback)script.onload = callback;
			document.getElementsByTagName("head")[0].appendChild(script);
			script.src = src;
		}

		function initializeMap() {
			if (window.google != undefined) {
				doInitializeMap();
				setTimeout(function () {
					doInitializeMap();
				}, 1000);

			} else {
				alert("no load google map");
			}
		}

		function doInitializeMap() {
			var mapProp = {
				center: new google.maps.LatLng(Latitude,Longitude),
				zoom: 5,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			var map = new google.maps.Map(document.getElementById("map"), mapProp);

			var myLatLng = {lat: Latitude, lng: Longitude};
			var marker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				title: 'Company Address!'
				});
		}
	};
}