/* ==========   MyProfileViewController   ==========
============================================= */

function MyProfileViewController($scope, $rootScope, $http, $location, $window) {
	$scope.urlImageCompany = "";
	$scope.urlImageUserProfile = "http://thetechmap.com/uploads/noimage.jpg";
	$scope.companyCity = "";
	$scope.companyCountry = "";
	$scope.companyNameGetByUser = "";
	$scope.urlCompany = "http://thetechmap.com/";
	//$scope.isUserLogin = false;
	$scope.isLinkedIn = false;
	$scope.isFaceBook = false;
	$scope.isTwitter = false;
	$scope.isCompany = false;
	$scope.init = function(){
		//var userNameLogin = JSON.parse(localStorage.getItem('userName'));
		var myProfile = JSON.parse(localStorage.getItem('myProfile'));
		var myProfileFromLinkedIn = JSON.parse(localStorage.getItem('myProfileFromLinkedIn'));
		if(myProfile != "" && myProfile != null && myProfile != undefined){
			$scope.member = myProfile;
			var companyName = $scope.member.Company;
			getCompanyInfo(companyName);
			// if($scope.member.UserName == userNameLogin){
			// 	$scope.isUserLogin = true;
			// }
			if($scope.member.LinkedInUrl != "" && $scope.member.LinkedInUrl != null && $scope.member.LinkedInUrl != undefined){
				$scope.isLinkedIn = true;
				$scope.urlLinkedInUserProfile = "https://www.linkedin.com/"+$scope.member.LinkedInUrl;
			}
			else{
				$scope.isLinkedIn = false;
			}
			if($scope.member.FacebookUrl != "" && $scope.member.FacebookUrl != null && $scope.member.FacebookUrl != undefined){
				$scope.isFaceBook = true;
				$scope.urlFacebookUserProfile = "https://www.facebook.com/"+$scope.member.FacebookUrl;
			}
			else{
				$scope.isFaceBook = false;
			}
			if($scope.member.TwitterHandle != "" && $scope.member.TwitterHandle != null && $scope.member.TwitterHandle != undefined){
				$scope.isTwitter = true;
				$scope.urlTwitterUserProfile = "https://www.twitter.com/"+$scope.member.TwitterHandle;
			}
			else{
				$scope.isTwitter = false;
			}
			if($scope.companyCity == "" || $scope.companyCity == null){
				if($scope.member.City == null || $scope.member.City == ""){
					$scope.companyCity = "My City";
				}
				else{
					$scope.companyCity = $scope.member.City;
				}
			}
			if($scope.companyCountry == "" || $scope.companyCountry == null){
				if($scope.member.Country == null || $scope.member.Country == ""){
					$scope.companyCountry = "My Country";
				}
				else{
					$scope.companyCountry = $scope.member.City;
				}
			}
			if($scope.companyNameGetByUser == "" || $scope.companyNameGetByUser == null){
				if($scope.member.Company == null || $scope.member.Company == ""){
					$scope.companyNameGetByUser = "My Company";
				}
				else{
					$scope.companyNameGetByUser = $scope.member.Company;
				}
			}
			// if($scope.member.ProfilePhoto != "" || $scope.member.ProfilePhoto != null){
			// 	$scope.urlImageUserProfile = "http://thetechmap.com/uploads/" + $scope.member.ProfilePhoto;
			// }
			if($scope.member.Bio == null || $scope.member.Bio == ""){
				$scope.member.Bio = "My Profile";
			}
			if($scope.member.Company == null || $scope.member.Company == ""){
				$scope.member.Company = "My Company";
			}
		}
		if(myProfileFromLinkedIn != "" && myProfileFromLinkedIn != null && myProfileFromLinkedIn != undefined){
			var myCompany = "My Company";
			if(myProfileFromLinkedIn.positions.values[0].company.name != ""){
				company = myProfileFromLinkedIn.positions.values[0].company.name;
			}
			if(myProfileFromLinkedIn.pictureUrl == "" || myProfileFromLinkedIn.pictureUrl == null){
				$scope.urlImageUserProfile = "http://thetechmap.com/uploads/noimage.jpg";
			}
			else{
				$scope.urlImageUserProfile = myProfileFromLinkedIn.pictureUrl;
			}
			var urlLinkedInUserProfile = "https://www.linkedin.com/";
			var userProfile = {
				Country: myProfileFromLinkedIn.location.name,
				City: "My City",
				StartupRole: "Developer",
				ProfilePhoto: $scope.urlImageUserProfile,
				Bio:myProfileFromLinkedIn.headline,
				LinkedInUrl: urlLinkedInUserProfile,
				FirstName: myProfileFromLinkedIn.firstName,
				LastName: myProfileFromLinkedIn.lastName,	
				Company: myCompany				
			};
			$scope.member = userProfile;
		}
	};

	var getCompanyInfo = function(companyName){
		//Get all user active from server
		$http.get("http://thetechmap.com/api/company/get?name="+companyName)
		.success(function (data) {
			if(data != null && data != undefined){
				if(data[0].ImagePath != "" && data[0].ImagePath != null && data[0].ImagePath != undefined){
					$scope.urlImageCompany = data[0].ImagePath;
					$scope.isCompany = true;
					$scope.companyCity = data[0].City;
					$scope.companyCountry = data[0].Country;
					$scope.urlCompany = data[0].Url;
					$scope.companyNameGetByUser =  data[0].Name;
					console.log("get company infor by companyName successful.");
				}
			}
		}).error(function (error) {
			console.log('Error: ' + "Can't get company infor by companyName." + error);
		});
	};

	$scope.GoToEditProfile = function(){
		$location.path("/edituserprofile");
	};
	$scope.GoToMemberShip = function(){
		$location.path("/membership");
	};
}