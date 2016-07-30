/* ==========   HomeMapViewController   ==========
 ============================================= */

function HomeMapViewController($scope, $rootScope, $http, $location, $window, $timeout) {
	// init left menu
	BaseController.call(this, $scope, $timeout);
	//
	$scope.lattitue = 31.1060;
	$scope.longtitue = -97.6475;
	
	
	$scope.companiesNumber = 0;
	$scope.serviceNumber = 0;
	$scope.coworkingNumber = 0;
	$scope.angelNumber = 0;
	$scope.hiringNumber = 0;
	$scope.nameUserProfile = "";
	$scope.addressUserProfile = "";
	$scope.urlImageUserProfile = "http://thetechmap.com/uploads/noimage.jpg";

	$scope.dataCompanies = [];
	$scope.dataServiceProvider = [];
	$scope.dataCoworking = [];
	$scope.dataAngelVC = [];
	$scope.dataHiring = [];
	$scope.init = function(){
		var access_token = JSON.parse(localStorage.getItem('access_token'));
		var companiesStore = JSON.parse(localStorage.getItem('companies'));
		var isGetDataCompleted = JSON.parse(localStorage.getItem('isGetDataCompleted'));
		
		// Load data companies from localStorage if exists
		if(companiesStore != null || companiesStore != undefined){
			calculateData(companiesStore);
		}
		else{
			getDataForCompanies();
		}
		
		// Load data members from localStorage if exists
		if(isGetDataCompleted == true){
			var membersStore = JSON.parse(localStorage.getItem('members'));
			$scope.members = membersStore.slice(0, 99);
		}
		else{
			GetDataForMembers();
		}

		$scope.initMenuView();
		$scope.initMapView($scope.lattitue, $scope.longtitue);
		if($rootScope.loginByLinkedIn == true){
			$http.get("https://api.linkedin.com/v1/people/~:(email-address,first-name,last-name,headline,picture-url,location:(name))?format=json&oauth2_access_token=" + access_token)
			.success(function (result) {
				//do what you want
				console.log("User Profile -> " + JSON.stringify(result));
				$scope.dataUserProfile = result;
				var address = $scope.dataUserProfile.location.name;
				console.log('Address ->' +  address);
				$scope.nameUserProfile = $scope.dataUserProfile.firstName + " " + $scope.dataUserProfile.lastName;
				$scope.urlImageUserProfile = $scope.dataUserProfile.pictureUrl;
				$scope.addressUserProfile = address;
				//$location.path("/home");

			}).error(function (error) {
				console.log('Error ->' + "Can't get user profile" + error);
			});
		}
		else{
			$scope.user = $rootScope.userInformation;
			$scope.nameUserProfile = $scope.user.FirstName + " " + $scope.user.LastName;
			$scope.addressUserProfile = $scope.user.City + " , " + $scope.user.Country;
		}
	};

	var getDataForCompanies = function(){
		// Get all companies from server
		$http.get("http://thetechmap.com/api/company/get")
		.success(function (data) {
			$scope.companies = data;
			localStorage.setItem("companies", JSON.stringify($scope.companies));
			calculateData($scope.companies);
			console.log("calculate types company successful.");
		}).error(function (error) {
			console.log('Error: ' + "Can't get data companies." + error);
		});
	};

	var GetDataForMembers = function(){
		//Get all user active from server
		$http.get("http://thetechmap.com/api/account/getprofiles")
		.success(function (data) {
			if(data.length >= 50){
				$scope.members = data.slice(0, 49);
			}
			else{
				$scope.members = data.slice(0, data.length);
			}
			localStorage.setItem("members", JSON.stringify(data));
			localStorage.setItem("isGetDataCompleted", JSON.stringify(true));
			console.log("get all user active successful.");
		}).error(function (error) {
			console.log('Error: ' + "Can't get data all user active." + error);
		});
	};

	var calculateData = function(data){
		for(i = 0; i < data.length; i++){
			if(data[i] != "" && data[i] != null){
				// calculate number display on comunity screen
				if(data[i].EntityType != "" && data[i].EntityType != null && data[i].EntityType != undefined){
					if(data[i].EntityType == "Company"){
						$scope.dataCompanies.push(data[i]);
					}
					if (data[i].EntityType == "Service Provider"){
						$scope.dataServiceProvider.push(data[i]);
					}
					if (data[i].EntityType == "Coworking"){
						$scope.dataCoworking.push(data[i]);
					}
					if (data[i].EntityType == "VC/Angel"){
						$scope.dataAngelVC.push(data[i]);
					}
				}
				if(data[i].IsHiring != "" && data[i].IsHiring != null && data[i].IsHiring != undefined){
					if(data[i].IsHiring == true){
						$scope.dataHiring.push(data[i]);
					}
				}
			}
		}
		$scope.companiesNumber = $scope.dataCompanies.length;
		$scope.serviceNumber = $scope.dataServiceProvider.length;
		$scope.coworkingNumber = $scope.dataCoworking.length;
		$scope.angelNumber = $scope.dataAngelVC.length;
		$scope.hiringNumber = $scope.dataHiring.length;
		console.log("Companies ->" + $scope.companiesNumber + " <->" + "Service ->"+ $scope.serviceNumber + " <->" + "Coworking ->"+ $scope.coworkingNumber + " <->" + "VC/Angel ->"+ $scope.angelNumber +" <->" + "Hiring ->"+ $scope.hiringNumber);
	};

	// go to user profile screen when user click My Profile on left menu
	$scope.GoToMyProfile = function(){
		$location.path("/myprofile");
	};

	// go to user profile screen when user click Company Profile on left menu
	$scope.GoToCompanyProfile = function(){
		$location.path("/mycompany");
	};


	// show events screen
	$scope.GoToEvents = function(){
		$location.path("/eventsglobal");
	};

	// show companies screen
	$scope.GoToCompanies = function(){
		$location.path("/companies");
	};
	
	// logout app
	$scope.Logout = function(){
		localStorage.clear();
		$location.path("/login");
	};

	$scope.GoToMessages = function () {
		$location.path("/messages");
	};

	$scope.GoToHome = function () {
		$location.path("/home");
	};

	$scope.GoToCompanyProfile = function () {
		$location.path("/companydetail");
	};

	$scope.GoToCompaies = function () {
		$location.path("/companies");
	};

	// show jobs screen
	$scope.GoToJobs = function(){
		$location.path("/jobs");
	};

	// logout app
	$scope.Logout = function(){
		//localStorage.clear();
		localStorage.removeItem('loginByLinkedIn');
		localStorage.removeItem('access_token');
		localStorage.removeItem('userName');
		localStorage.removeItem('passWord');
		$location.path("/login");
	};

	$scope.GoToMemberDetail = function(memberDetail){
		localStorage.setItem('MemberData', JSON.stringify(memberDetail));
		localStorage.setItem('isGoToMemberDetail', true);
		//$rootScope.companyDetail = companyDetail;
		$location.path("/userprofile");
    };

	$scope.onTabChange = function (event) {
		// find tab is active and deactive this tab
		var tabEl = event && event.target;
		if (!tabEl) return;

		var tabContent = $("#tab-content");
		var tabActive = tabContent && tabContent.find("div.tab-pane.active");
		tabActive && tabActive.removeClass("active");
		// set active on selected tab
		var tabEl = event.target;
		var selectedTabContentId;
		if (tabEl.getAttribute("data-content")) {
			selectedTabContentId = tabEl && tabEl.getAttribute("data-content");
		}
		else {
			var parentEl = $(tabEl).parent();
			selectedTabContentId = parentEl && parentEl[0] && parentEl[0].getAttribute("data-content");
		}
		var selectedTabContent = $("#" + selectedTabContentId);
		selectedTabContent && selectedTabContent.addClass("active");
	};

	// var me = this;
	// me.init = function () {
		// if (window.initializeMap == undefined) {
		  // window.initializeMap = initializeMap;
		  // loadScript('http://maps.googleapis.com/maps/api/js?v=3&sensor=false&callback=initializeMap',
			// function () {
			  // log('google-loader has been loaded, but not the maps-API ');
			// });
		// }
	// };

	// function loadScript(src, callback) {
		// var script = document.createElement("script");
		// script.type = "text/javascript";
		// if (callback)script.onload = callback;
		// document.getElementsByTagName("head")[0].appendChild(script);
		// script.src = src;
	// }

	// function initializeMap() {
		// if (window.google != undefined) {
		  // doInitializeMap();
		  // setTimeout(function () {
			// doInitializeMap();
		  // }, 1000);

		// } else {
		  // alert("no load google map");
		// }
	// }

	// function doInitializeMap() {
		// var mapProp = {
		  // center: new google.maps.LatLng(51.508742, -0.120850),
		  // zoom: 5,
		  // mapTypeId: google.maps.MapTypeId.ROADMAP
		// };

		// var map = new google.maps.Map(document.getElementById("map"), mapProp);
	// }

	// me.init();

	////
  // var me = this;
  // me.init = function () {
    // me.initMenuView();
  // };
  // me.initMenuView = function () {
    // //stick in the fixed 100% height behind the navbar but don't wrap it
    // $('#slide-nav.navbar-inverse').after($('<div class="inverse" id="navbar-height-col"></div>'));

    // $('#slide-nav.navbar-default').after($('<div id="navbar-height-col"></div>'));

    // // Enter your ids or classes
    // var toggler = '.navbar-toggle';
    // var pagewrapper = '#page-content';
    // var navigationwrapper = '.navbar-header';
    // var menuwidth = '100%'; // the menu inside the slide menu itself
    // var slidewidth = '70%';
    // var menuneg = '-100%';
    // var slideneg = '-70%';

    // $(".navbar-toggle").on("click", toggler, function (e) {
      // var selected = $(this).hasClass('slide-active');

      // $('#slidemenu').stop().animate({
        // left: selected ? menuneg : '0px'
      // });

      // $('#navbar-height-col').stop().animate({
        // left: selected ? slideneg : '0px'
      // });

      // $(pagewrapper).stop().animate({
        // left: selected ? '0px' : slidewidth
      // });

      // $(navigationwrapper).stop().animate({
        // left: selected ? '0px' : slidewidth
      // });
      // $(this).toggleClass('slide-active', !selected);
      // $('#slidemenu').toggleClass('slide-active');
      // $('#page-content, .navbar, body, .navbar-header').toggleClass('slide-active');
    // });


    // var selected = '#slidemenu, #page-content, body, .navbar, .navbar-header';
    // $(window).on("resize", function () {
      // if ($(window).width() > 767 && $('.navbar-toggle').is(':hidden')) {
        // $(selected).removeClass('slide-active');
      // }
    // });

  // };
  // // init controller
  // me.init();


}

//Data
// var cities = [
    // {
        // city : 'Toronto',
        // desc : 'This is the best city in the world!',
        // lat : 43.7000,
        // long : -79.4000
    // },
    // {
        // city : 'New York',
        // desc : 'This city is aiiiiite!',
        // lat : 40.6700,
        // long : -73.9400
    // },
    // {
        // city : 'Chicago',
        // desc : 'This is the second best city in the world!',
        // lat : 41.8819,
        // long : -87.6278
    // },
    // {
        // city : 'Los Angeles',
        // desc : 'This city is live!',
        // lat : 34.0500,
        // long : -118.2500
    // },
    // {
        // city : 'Las Vegas',
        // desc : 'Sin City...\'nuff said!',
        // lat : 36.0800,
        // long : -115.1522
    // }
// ];
