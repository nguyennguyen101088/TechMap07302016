/* ==========   ResetPassWordController   ==========
============================================= */

function ResetPassWordController($scope, $rootScope, $http, $location, $window) {
	$scope.email="";
	$scope.ResetPassword = function(){
		if($scope.email == ""){
			showCustomDialog(function(){
			}, "Please enter email.");	
		}
		else if (!validateEmail($scope.email)) {
			showCustomDialog(function(){
			}, "Please enter a valid email address.");
			$(".input-field").val("");			
		}
		else{
			$http({
				method: 'POST',
				url: 'http://thetechmap.com/api/account/resetpassword',
				headers: {
					'Content-Type': 'application/json'
				},
				data: {
					'username': $scope.email
				},
			}).success(function(data, status) {
				if(status == 200)
				{
					showCustomDialog(function(){
							  $scope.$apply();
					}, "Please check your email and follow on that to reset password.");
					$location.path("/login");
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
					}, "Can not reset password. Please try again!");
			});
		}
	};
	$scope.GoToLoginPage = function(){
		$location.path("/login");
	};
	$scope.SignUpNewUser = function(){
		$location.path("/register");
	};
	$scope.emailChange = function (val) {
		$scope.email = val;
	};
	function validateEmail(email) { 
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
}