/* ==========   EditUserProfileViewController   ==========
============================================= */

function EditUserProfileViewController($scope, $rootScope, $http, $location, $window) {
	$scope.firstName = "";
	$scope.lastName = "";
	$scope.email = "";
	$scope.country = "";
	$scope.city = "";
	$scope.startupRole = "";
	$scope.company = "";
	$scope.jobTitle = "";
	$scope.industry = "";
	$scope.website = "";
	$scope.twitter = "";
	$scope.facebook = "";
	$scope.linkedIn = "";
	$scope.bio = "";
	$scope.problems = "";
	$scope.lookingFor = "";
	$scope.skills = "";

	$scope.init = function(){
		// Retrieve the object from storage
		$scope.userProfileData = JSON.parse(localStorage.getItem('UserInformation'));
		$scope.userID = $scope.userProfileData.UserId;
		$scope.firstName = $scope.userProfileData.FirstName;
		$scope.lastName = $scope.userProfileData.LastName;
		$scope.email = $scope.userProfileData.UserName;
		$scope.country = $scope.userProfileData.Country;
		$scope.city = $scope.userProfileData.City;
		$scope.zipCode = $scope.userProfileData.ZipCode;
		$scope.companyId = $scope.userProfileData.CompanyId;
		$scope.company = $scope.userProfileData.Company;
		$scope.jobTitle = $scope.userProfileData.JobTitle;
		$scope.industryId = $scope.userProfileData.IndustryId;
		$scope.industry = $scope.userProfileData.Industry;
		$scope.website = $scope.userProfileData.Website;
		$scope.twitter = $scope.userProfileData.TwitterHandle;
		$scope.facebook = $scope.userProfileData.FacebookUrl;
		$scope.linkedIn = $scope.userProfileData.LinkedInUrl;
		$scope.bio = $scope.userProfileData.Bio;
		$scope.problems = $scope.userProfileData.ProblemSolving;
		$scope.lookingFor = $scope.userProfileData.LookingFor;
		$scope.skills = $scope.userProfileData.Skills;
		$scope.startupRole = $scope.userProfileData.StartupRole;
		$scope.profilePhoto = "http://thetechmap.com/uploads/"+$scope.userProfileData.ProfilePhoto;
		$scope.active = $scope.userProfileData.Active;
		$scope.views = $scope.userProfileData.Views;
		$scope.techmapLevel = $scope.userProfileData.TechmapLevel;
		$scope.techmapTitle = $scope.userProfileData.TechmapTitle;
		$scope.eventAttendees = $scope.userProfileData.EventAttendees;
		$scope.state = $scope.userProfileData.State;
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
	
	$scope.SaveChangeUserProfile = function(){
		// $http({
				// method: 'POST',
				// url: 'http://thetechmap.com/api/account/update',
				// headers: {
					// 'Content-Type': 'application/json'
				// },
				// data: {
					// 'UserId': $scope.userID,
					// 'FirstName': $scope.firstName,
					// 'LastName': $scope.lastName,
					// 'UserName': $scope.email,
					// 'Country': $scope.country,
					// 'City': $scope.city,
					// 'ZipCode': $scope.zipCode,
					// 'JobTitle': $scope.jobTitle,
					// 'CompanyId': $scope.companyId,
					// 'Company': $scope.company,
					// 'IndustryId': $scope.industryId,
					// 'Industry': $scope.industry,
					// 'Bio': $scope.bio,
					// 'Website': $scope.website,
					// 'Skills': $scope.skills,
					// 'ProfilePhoto': $scope.profilePhoto,
					// 'TwitterHandle': $scope.twitter,
					// 'Active': $scope.active,
					// 'Views': $scope.views,
					// 'ProblemSolving': $scope.problems,
					// 'LookingFor': $scope.lookingFor,
					// 'TechmapLevel': $scope.techmapLevel,
					// 'TechmapTitle': $scope.techmapTitle,
					// 'StartupRole': $scope.startupRole,
					// 'LinkedInUrl': $scope.linkedIn,
					// 'FacebookUrl': $scope.facebook,
					// 'State': $scope.state,
					// 'EventAttendees': $scope.eventAttendees
				// },
			// }).success(function(data, status) {
				// if(data.Success == false)
				// {
					// showCustomDialog(function(){
							  // $scope.$apply();
					// }, data.ErrorMessage);
				// }
				// else
				// {
						// showCustomDialog(function(){
					// }, "success.");
				// }
			// }).error(function(data, status) {
				// showCustomDialog(function(){
							  // $scope.$apply();
					// }, "Can not validate user. Please try again!");
			// });
			$location.path("/home");
	};
	
	$scope.firstNameChange = function (val) {
		$scope.firstName = val;
	};
	$scope.lastNameChange = function (val) {
		$scope.lastName = val;
	};
	$scope.companyChange = function (val) {
		$scope.company = val;
	};
	$scope.jobTitleChange = function (val) {
		$scope.jobTitle = val;
	};
	$scope.industryChange = function (val) {
		$scope.industry = val;
	};
	$scope.websiteChange = function (val) {
		$scope.website = val;
	};
	$scope.twitterChange = function (val) {
		$scope.twitter = val;
	};
	$scope.facebookChange = function (val) {
		$scope.facebook = val;
	};
	$scope.linkedInChange = function (val) {
		$scope.linkedIn = val;
	};
	$scope.bioChange = function (val) {
		$scope.bio = val;
	};
	$scope.problemsChange = function (val) {
		$scope.problems = val;
	};
	$scope.lookingForChange = function (val) {
		$scope.lookingFor = val;
	};
	$scope.skillsChange = function (val) {
		$scope.skills = val;
	};
	$scope.startupRoleChange = function (val) {
		$scope.startupRole = val;
	};
	$scope.countryChange = function (val) {
		$scope.country = val;
	};
	$scope.cityChange = function (val) {
		$scope.city = val;
	};
}