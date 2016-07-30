/* ==========   RegisterViewController   ==========
============================================= */

function RegisterViewController($scope, $rootScope, $http, $location, $window) {
	$scope.email="";
	$scope.firstName="";
	$scope.lastName="";
	$scope.passWord="";
	$scope.confirmPass="";
	$scope.country="United States";
	$scope.state="Alabama";
	$scope.city="";
	$scope.startupRole="Entrepreneur";
	$scope.RegisterUser = function(){
		if($scope.email == ""){
			showCustomDialog(function(){
			}, "Please enter email.");	
		}
		else if (!validateEmail($scope.email)) {
			showCustomDialog(function(){
			}, "Please enter a valid email address.");
			$(".input-field").val("");			
		}
		else if($scope.firstName == ""){
			showCustomDialog(function(){
			}, "Please enter firstName.");	
		}
		else if($scope.lastName == ""){
			showCustomDialog(function(){
			}, "Please enter lastName.");	
		}
		else if($scope.passWord == ""){
			showCustomDialog(function(){
			}, "Please enter password.");	
		}
		else if($scope.confirmPass == ""){
			showCustomDialog(function(){
			}, "Please enter confirm your password.");	
		}
		else if($scope.passWord != $scope.confirmPass){
			showCustomDialog(function(){
			}, "Password not match.");	
		}
		else{
			$http({
				method: 'POST',
				url: 'http://thetechmap.com/api/account/register',
				headers: {
					'Content-Type': 'application/json'
				},
				data: {
					'userName': $scope.email, 
					'firstName': $scope.firstName,
					'lastName': $scope.lastName,
					'password': $scope.passWord
				},
			}).success(function(data, status) {
				if(status == 200)
				{
					var myJSONObject = {"userInformation": [
							{
								"FirstName": $scope.firstName, 
								"LastName": $scope.lastName,
								"Email": $scope.email,
								"Country": $scope.country,
								"State": $scope.state,
								"StartupRole": $scope.startupRole,
								"City": $scope.city
							}
						]
					};
					
					// Put the object into storage
					localStorage.setItem('dataUser', JSON.stringify(myJSONObject));
					$location.path("/edituserprofile");
				}
				else
				{
					showCustomDialog(function(){
						$scope.$apply();
					}, data.Message);
				}
			}).error(function(data, status) {
				showCustomDialog(function(){
							  $scope.$apply();
					}, "Can not register user. Please try again!");
			});
		}
	};
	$scope.GoToLogin = function(){
		$location.path("/login");
	};
	$scope.GoToForgotPassword = function(){
		$location.path("/resetpassword");
	};
	
	function validateEmail(email) { 
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
	$scope.emailChange = function (val) {
		$scope.email = val;
	};
	$scope.firstNameChange = function (val) {
		$scope.firstName = val;
	};
	$scope.lastNameChange = function (val) {
		$scope.lastName = val;
	};
	$scope.passWordChange = function (val) {
		$scope.passWord = val;
	};
	$scope.confirmPassChange = function (val) {
		$scope.confirmPass = val;
	};
	$scope.cityChange = function (val) {
		$scope.city = val;
	};
	$scope.stateChange = function (val) {
		$scope.state = val;
	};
	$scope.startupRoleChange = function (val) {
		$scope.startupRole = val;
	};
	$scope.countryChange = function (val) {
		$scope.country = val;
		console.log("value: "+$scope.country);
		if ($scope.country != "United States") {
			document.getElementById("stateUnited").style.display = "none";
		} else {
			document.getElementById("stateUnited").style.display = "inherit";
		} 
	};
}