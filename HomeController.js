/* ==========   HomeViewController   ==========
 ============================================= */

function HomeViewController($scope, $rootScope, $http, $location, $window, $timeout, $route) {
	// init left menu
	BaseController.call(this, $scope, $timeout);
	//
	$scope.nameUserProfile = "";
	$scope.addressUserProfile = "";
	$scope.urlImageUserProfile = "http://thetechmap.com/uploads/noimage.jpg";
	
	$rootScope.isGoToUserProfile = false;
	$scope.isLike = false;
	
	$scope.messageIdLiked = [];
	
	$scope.init = function(){
		
		var dataStore = JSON.parse(localStorage.getItem("socialMessages"));
		if(dataStore != null || dataStore != undefined){
			$scope.messages = dataStore;
		}
		else{
			getData();
		}
		
		$scope.initMenuView();
		
		if($rootScope.loginByLinkedIn == true){
			var access_token = JSON.parse(localStorage.getItem('access_token'));
			console.log("access_token" + access_token);
			$http.get("https://api.linkedin.com/v1/people/~:(email-address,first-name,last-name,headline,picture-url,location:(name),positions:(company:(name)))?format=json&oauth2_access_token=" + access_token)
			.success(function (result) {
				console.log("User Profile -> " + JSON.stringify(result));
				$scope.dataUserProfile = result;
				var address = $scope.dataUserProfile.location.name;
				console.log('Address ->' +  address);
				$scope.nameUserProfile = $scope.dataUserProfile.firstName + " " + $scope.dataUserProfile.lastName;
				$scope.urlImageUserProfile = $scope.dataUserProfile.pictureUrl;
				$scope.addressUserProfile = address;
			}).error(function (error) {
				console.log('Error ->' + "Can't get user profile" + error); 
			});
		}
		else{
			$scope.user = $rootScope.userInformation;
			$scope.nameUserProfile = $scope.user.FirstName + " " + $scope.user.LastName;
			//$scope.urlImageUserProfile = $scope.user.ProfilePhoto;
			$scope.addressUserProfile = $scope.user.City + " , " + $scope.user.Country;
		}
	};
	
	// Get social messages from server
	var getData = function(){
		$http.get("http://thetechmap.com/api/message/getSocialUpdates")
			.success(function (data) {
				var messageIdLikedList = JSON.parse(localStorage.getItem("messageIdLiked"));
				for(i = 0; i < data.length; i++){
					if(data[i].SocialUpdate != "" && data[i].SocialUpdate != null){
						if(data[i].SocialUpdate.DatePosted != "" || data[i].SocialUpdate.DatePosted != null && data[i].SocialUpdate.DatePosted != undefined){
							var arrayDate = data[i].SocialUpdate.DatePosted.slice(0,10).split("-");
							data[i].SocialUpdate.DatePosted = arrayDate[1] + "-" + arrayDate[2] + "-" + arrayDate[0];
						}
						if(data[i].SocialUpdate.Replies != null && data[i].SocialUpdate.Replies.length > 0){
							data[i].SocialUpdate.Level = data[i].SocialUpdate.Replies.length;
						}
						if(data[i].SocialUpdate.Post != "" || data[i].SocialUpdate.Post != null){
							data[i].SocialUpdate.Post = $('<div/>').html(data[i].SocialUpdate.Post).text();
						}
						if(data[i].SocialUpdate.UserPhoto == "noimage.jpg" || data[i].SocialUpdate.UserPhoto == null){
							data[i].SocialUpdate.UserPhoto = "http://thetechmap.com/uploads/" + data[i].SocialUpdate.UserPhoto;
						}
						if(data[i].UserProfile != null && data[i].UserProfile != "" && data[i].UserProfile != undefined){
							if(data[i].UserProfile.JobTitle == null || data[i].UserProfile.JobTitle == ""){
								data[i].UserProfile.JobTitle = "My JobTitle";
							}
							if(data[i].UserProfile.City == null || data[i].UserProfile.City == ""){
								data[i].UserProfile.City = "My City";
							}
							if(data[i].UserProfile.Country == null || data[i].UserProfile.Country == ""){
								data[i].UserProfile.Country = "My Country";
							}
						}
						if(data[i].UserProfile != null && data[i].UserProfile.$ref != "" && data[i].UserProfile.$ref != undefined){
							var userId = data[i].UserProfile.$ref;
							for(j = 0; j < data.length; j++){
								if(data[j].UserProfile != null && data[j].UserProfile != "" && data[j].UserProfile != undefined){
									if(userId != undefined && data[j].UserProfile.$id == userId){
										if(data[j].UserProfile.JobTitle == null){
											data[j].UserProfile.JobTitle = "My JobTitle";
										}
										data[i].UserProfile = data[j].UserProfile;
										continue;
									}
								}
							}
						}
						// if(data[i].UserProfile == null || data[i].UserProfile == undefined || data[i].UserProfile == "" 
						// 	|| data[i].UserProfile.Country == undefined){
						// 	var userName = data[i].SocialUpdate.PostedBy.split(" ");
						// 	var userPhoto = "";
						// 	if(data[i].SocialUpdate.UserPhoto != "" && data[i].SocialUpdate.UserPhoto != "noimage.jpg" 
						// 		&& data[i].SocialUpdate.UserPhoto != null){
						// 		userPhoto = data[i].SocialUpdate.UserPhoto;
						// 	}
						// 	else{
						// 		userPhoto = "noimage.jpg";
						// 	}
						// 	var userProfile = {
						// 		Country:"United States",
						// 		City:"Texas",
						// 		JobTitle:"CEO",
						// 		ProfilePhoto: userPhoto,
						// 		Bio:"My Profile",
						// 		LinkedInUrl:"https://www.linkedin.com/",
						// 		FirstName: userName[0],
						// 		LastName: userName[1],	
						// 		Company: "My Company"				
						// 	};
						// 	data[i].UserProfile = userProfile;
						// }
						
						// if(messageIdLikedList != null && messageIdLikedList.length > 0){
						// 	for(j = 0; j < messageIdLikedList.length; j++){
						// 		if(messageIdLikedList[j] == data[i].Id){
						// 			data[i].Likes = data[i].Likes + 1;
						// 			var btnLikeId = "btnLike-" + data[i].Id;
						// 			var elem = document.getElementById(btnLikeId);
						// 			elem.innerHTML = "LIKED";
						// 			elem.style.color = "orange";
						// 			elem.style.paddingLeft = "5px";
						// 		}
						// 	}
						// }
					}
				}
				$scope.messages = data;
				localStorage.setItem("socialMessages", JSON.stringify($scope.messages));
				console.log("Data -> " + $scope.messages);
				console.log("get social messages from server successful."); 
			}).error(function (error) {
				console.log('Error: ' + "Can't get social messages from server." + error); 
			});
	};
	
	// Function to replicate setInterval using $timeout service.
  	$scope.intervalFunction = function(){
		$timeout(function() {
			getData();
			$scope.intervalFunction();
			console.log('Reload get data from server');
		}, 1000 * 60)
  	};
	
	// Kick off the interval
  	$scope.intervalFunction();
	
	//go to map screen
	$scope.GoToMap = function () {
		$location.path("/members");
	};
	
	// go to messges screen
	$scope.GoToMessages = function () {
		$location.path("/messages");
	};
	
	// go to user profile screen when user click a user photo
	$scope.GoToUserProfile = function(userProfile){
		//localStorage.setItem("isGoToUserProfile", true);
		localStorage.setItem('userProfile', JSON.stringify(userProfile));
		$location.path("/userprofilefromhomescreen");
	};
	
	// go to user profile screen when user click My Profile on left menu
	$scope.GoToMyProfile = function(){
		$location.path("/myprofile");
	};
	
	// go to user profile screen when user click Company Profile on left menu
	$scope.GoToCompanyProfile = function(){
		$location.path("/mycompany");
	};
	
	// go to about us screen
	$scope.Contact = function(){
		$location.path("/contact");
	};

	// go to about us screen
	$scope.AboutUs = function(){
		$location.path("/aboutus");
	};

	// handle LIKE button
	$scope.LikeMessage = function (messageId) {
		if($scope.isLike == false){
			var btnLikeId = "btnLike-" + messageId;
			var elem = document.getElementById(btnLikeId);
			elem.innerHTML = "LIKED";
			elem.style.color = "orange";
			elem.style.paddingLeft = "5px";
			// calculate likes number
			var numberLikeId = "numberLikeMessage-" + messageId;
			var numberLikeMessage = document.getElementById(numberLikeId);
			var value = numberLikeMessage.innerHTML.split(" ")[0];
			var numLike = parseInt(value) + 1;
			numberLikeMessage.innerHTML = numLike.toString() + " likes ";
			$scope.isLike = true;
			$scope.messageIdLiked.push(messageId);
			localStorage.setItem("messageIdLiked", JSON.stringify($scope.messageIdLiked));
			
	    }
		else{
			var btnLikeId = "btnLike-" + messageId;
			var elem = document.getElementById(btnLikeId);
			elem.innerHTML = "LIKE";
			elem.style.color = "gray";
			elem.style.paddingLeft = "10px";
			// re-calculate likes number
			var numberLikeId = "numberLikeMessage-" + messageId;
			var numberLikeMessage = document.getElementById(numberLikeId);
			var value = numberLikeMessage.innerHTML.split(" ")[0];
			var numLike = parseInt(value) - 1;
			numberLikeMessage.innerHTML = numLike.toString() + " likes ";
			$scope.isLike = false;
			if($scope.messageIdLiked.length > 0){
				for(var i = $scope.messageIdLiked.length - 1; i >= 0; i--) {
					if($scope.messageIdLiked[i] === messageId) {
					   $scope.messageIdLiked.splice(i, 1);
					}
				}
			}
			localStorage.setItem("messageIdLiked", JSON.stringify($scope.messageIdLiked));
		}
	};
	
	// handle COMMENT button
	$scope.GoToComment = function(message){
		$rootScope.contentMessage = message; 
		$location.path("/comment");
	};
	
	// show events screen
	$scope.GoToEvents = function(){
		$location.path("/eventsglobal");
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
	
	// show companies screen
	$scope.GoToCompanies = function(){
		$location.path("/companies");
	};
	
	// logout app
	$scope.Logout = function(){
		//localStorage.clear();
		localStorage.removeItem('loginByLinkedIn');
		localStorage.removeItem('access_token');
		localStorage.removeItem('userName');
		localStorage.removeItem('passWord');
		localStorage.removeItem('myProfile');
		localStorage.removeItem('myProfileFromLinkedIn');
		localStorage.removeItem('Jobs');
		localStorage.clear();
		$location.path("/login");
	};
}