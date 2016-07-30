/* ==========   MembersController   ==========
============================================= */

function MembersController($scope, $rootScope, $http, $location, $window, $timeout) {
	// init left menu
	BaseController.call(this, $scope, $timeout);
	//
	$scope.nameUserProfile = "";
	$scope.addressUserProfile = "";
	$scope.urlImageUserProfile = "http://thetechmap.com/uploads/noimage.jpg";

	$scope.init = function( ){
		var access_token = JSON.parse(localStorage.getItem('access_token'));
		var dataStore = JSON.parse(localStorage.getItem('members'));
		if(dataStore != null || dataStore != undefined){
			$scope.members = dataStore;
		}
		else{
			getData();
		}
		$scope.initMenuView();

		// get user information from linkedIn
		if($rootScope.loginByLinkedIn == true){
			//,siteStandardProfileRequest
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
			if($scope.user.UserPhoto != "" && $scope.user.UserPhoto != null)
				$scope.urlImageUserProfile = $scope.user.UserPhoto;
			$scope.addressUserProfile = $scope.user.City + " , " + $scope.user.Country;
		}

		//show more functionality
		var pagesShown = 1;
		var pageSize = 20;
		
		$scope.paginationLimit = function(data) {
			return pageSize * pagesShown;
		};

		$scope.hasMoreItemsToShow = function() {
			return pagesShown < ($scope.members.length / pageSize);
		};
		
		$scope.showMoreItems = function() {
			pagesShown = pagesShown + 1;       
		};			
	}
	var getData = function(){
		//Get all user active from server
		$http.get("http://thetechmap.com/api/account/getprofiles")
		.success(function (data) {
			for(i = 0; i < data.length; i++){
				if(data[i] != null && data[i] != "" && data[i] != undefined){
					if(data[i].Country == "" || data[i].Country == null){
						data[i].Country = "My Country";
					}
					if(data[i].City == "" || data[i].City == null){
						data[i].City = "My City";
					}
				}
			}
			$scope.members = data;
			localStorage.setItem("members", JSON.stringify($scope.members));
			console.log("get all user active successful.");
		}).error(function (error) {
			console.log('Error: ' + "Can't get data all user active." + error);
		});
	};
	$scope.GoToMemberDetail = function(memberDetail){
		localStorage.setItem('MemberData', JSON.stringify(memberDetail));
		$location.path("/userprofile");
    };
	
	// go to home screen when click back button
	$scope.GoToHome = function(){
		$location.path("/home");
	};
	
	// show events screen
	$scope.GoToEvents = function(){
		$location.path("/eventsglobal");
	};
	
	// go to user profile screen when user click My Profile on left menu
	$scope.GoToMyProfile = function(){
		$location.path("/myprofile");
	};

	// go to user profile screen when user click Company Profile on left menu
	$scope.GoToCompanyProfile = function(){
		$location.path("/mycompany");
	};

	// show companies screen
	$scope.GoToCompanies = function(){
		$location.path("/companies");
	};

	$scope.GoToMessages = function () {
		$location.path("/messages");
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

	// show groups screen
	$scope.GoToGroups = function(){
		// showCustomDialog(function(){
		// 	}, "Feature is comming soon!");
	};

	// go to about us screen
	$scope.Contact = function(){
		$location.path("/contact");
	};

	// go to about us screen
	$scope.AboutUs = function(){
		$location.path("/aboutus");
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
}