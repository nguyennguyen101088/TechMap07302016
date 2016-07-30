/* ==========   JobsViewController   ==========
============================================= */

function JobsViewController($scope, $rootScope, $http, $location, $window, $timeout) {
	// init left menu
	BaseController.call(this, $scope, $timeout);
	//
	$scope.nameUserProfile = "";
	$scope.addressUserProfile = "";
	$scope.urlImageUserProfile = "http://thetechmap.com/uploads/noimage.jpg";
	$scope.init = function(){
		var access_token = JSON.parse(localStorage.getItem('access_token'));
		var dataStore = JSON.parse(localStorage.getItem("Jobs"));
		if(dataStore != null || dataStore != undefined){
			$scope.jobs = dataStore;
		}
		else{
			getData();
		}

		// init left menu
		$scope.initMenuView();

		// get user information from LinkedIn
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
			return pagesShown < ($scope.jobs.length / pageSize);
		};
		
		$scope.showMoreItems = function() {
			pagesShown = pagesShown + 1;       
		};			
	};
	
	var getData = function(){
		$http.get("http://thetechmap.com/api/job/get")
			.success(function (data) {
				var newArray = [];
				for(i = 0; i < data.length; i++){
					if(data[i] != "" && data[i] != undefined && data[i] != null){
						if(data[i].$ref == undefined){
							if(data[i].CompanyObject.$ref == undefined){
								newArray.push(data[i]);
							}
						}
					}
				}
				for(i = 0; i < newArray.length; i++){
					if(newArray[i] != "" && newArray[i] != null){
						if(newArray[i].CreatedDate != "" && newArray[i].CreatedDate != null && newArray[i].CreatedDate != undefined){
							var arrayDate = newArray[i].CreatedDate.slice(0,10).split("-");
							newArray[i].CreatedDate = arrayDate[1] + "-" + arrayDate[2] + "-" + arrayDate[0];
						}
						if(newArray[i].Logo == "" || newArray[i].Logo == null){
							newArray[i].Logo = "http://thetechmap.com/uploads/nologo.jpg";
						}
						if(newArray[i].CompanyObject.ImagePath == "" || newArray[i].CompanyObject.ImagePath == null){
							newArray[i].CompanyObject.ImagePath = "http://thetechmap.com/uploads/nologo.jpg";
						}
						else{
							newArray[i].CompanyObject.ImagePath = "http://thetechmap.com/uploads/" + newArray[i].CompanyObject.ImagePath;
						}
					}
				}



				// for(i = 0; i < data.length; i++){
				// 	if(data[i] != "" && data[i] != null){
				// 		if(data[i].CreatedDate != "" && data[i].CreatedDate != null && data[i].CreatedDate != undefined){
				// 			var arrayDate = data[i].CreatedDate.slice(0,10).split("-");
				// 			data[i].CreatedDate = arrayDate[1] + "-" + arrayDate[2] + "-" + arrayDate[0];
				// 		}
				// 		if(data[i].Logo == "" || data[i].Logo == null){
				// 			data[i].Logo = "http://thetechmap.com/uploads/nologo.jpg";
				// 		}
				// 		if(data[i].CompanyObject.ImagePath == "" || data[i].CompanyObject.ImagePath == null){
				// 			data[i].CompanyObject.ImagePath = "http://thetechmap.com/uploads/nologo.jpg";
				// 		}
				// 		else{
				// 			data[i].CompanyObject.ImagePath = "http://thetechmap.com/uploads/" + data[i].CompanyObject.ImagePath;
				// 		}
				// 	}
				// }
				$scope.jobs = newArray;
				localStorage.setItem("Jobs", JSON.stringify($scope.jobs));
				console.log("get all jobs successful."); 
			}).error(function (error) {
				console.log('Error: ' + "Can't get data all jobs." + error); 
			});
	};
	
	$scope.GoToJobDetail = function(jobdetail){
		localStorage.setItem("JobDetail",JSON.stringify(jobdetail));
		$location.path("/jobdetail");
	};

	$scope.GoToCreateJob = function(){
		showCustomDialog(function(){
			}, "The feature is coming!");
	};
	
	// go to home screen when click back button
	$scope.GoToHome = function(){
		$location.path("/home");
	};
	
	// show events screen
	$scope.GoToEvents = function(){
		$location.path("/eventsglobal");
	};
	
	// logout app
	$scope.Logout = function(){
		localStorage.clear();
		$location.path("/login");
	};
}