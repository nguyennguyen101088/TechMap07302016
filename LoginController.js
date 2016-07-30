/* ==========   LoginViewController   ==========
 ============================================= */

function LoginViewController($scope, $rootScope, $http, $location, $window, $cordovaOauth) {
	//$scope.userName = "nguyentrungnguyen101088@gmail.com";
	//$scope.passWord = "Nguyen@Nguyen@101088";
	$scope.userName = "";
	$scope.passWord = "";
	$scope.userState = "";
	$scope.userId = "";
	$rootScope.loginByLinkedIn = false;
	
	$scope.init = function(){
		var isLoginAlready = localStorage.getItem('loginByLinkedIn');
		$scope.userName = JSON.parse(localStorage.getItem('userName'));
		$scope.passWord = JSON.parse(localStorage.getItem('passWord'));
		console.log("isLoginAlready: " + isLoginAlready);
		console.log("userName: " + $scope.userName);
		console.log("passWord: " + $scope.passWord);
		if(isLoginAlready == "true"){
			$rootScope.loginByLinkedIn = true;
			$location.path("/home");
		}
		if($scope.userName != "" && $scope.passWord != ""){
			if($scope.userName != null && $scope.passWord != null){
				$scope.Login();
			}
		}
	};
	
	$scope.Login = function () {
		if($scope.userName == ""){
			showCustomDialog(function(){
			}, "Please enter username.");	
		}
		else if (!validateEmail($scope.userName)) {
			showCustomDialog(function(){
			}, "Please enter a valid email address.");
			$(".input-field").val("");			
		}
		else if($scope.passWord == ""){
			showCustomDialog(function(){
			}, "Please enter password.");
		}
		else if($scope.passWord == "" && $scope.userName == ""){
			showCustomDialog(function(){
			}, "Please enter username and password.");
		}
		else{
			$rootScope.loginByLinkedIn = false;
			$http.get(" http://thetechmap.com/api/account/login"+"?username="+$scope.userName+"&password="+$scope.passWord)
				.success(function (data) {
					$rootScope.userInformation = data;
					localStorage.setItem('myProfile', JSON.stringify(data));
					if(data != null && data.Active == true){
						$rootScope.userId = data.UserId;
						if(data.State != "" && data.State != null && data.State != undefined){
							localStorage.setItem('userState', $scope.userState);
						}
						localStorage.setItem('userName', JSON.stringify($scope.userName));
						localStorage.setItem('passWord', JSON.stringify($scope.passWord));
						localStorage.setItem('userLoginId', JSON.stringify(data.UserId));
						localStorage.setItem('companyName', JSON.stringify(data.Company));
						localStorage.setItem('loginByLinkedIn', JSON.stringify("false"));
						console.log("UserName + Password: " + $scope.userName + " and " + $scope.passWord);
						
						$location.path("/home");
					}
					else{
						showCustomDialog(function(){
						}, "Username or password incorrect. Please try again.");
						$(".input-field").val("");
					}
					
				}).error(function (error) {
					console.log('Error: ' + "Can't login." + error); 
				});
		}
	};
  
	$scope.userNameChange = function (val) {
		$scope.userName = val;
	};
	
	$scope.passWordChange = function (val) {
		$scope.passWord = val;
	};
	
	$scope.SignUpNewUser = function () {
		$location.path("/register");
	};
	
	$scope.ResetPasswordUser = function () {
		$location.path("/resetpassword");
	};
	
	// $scope.ConnectWithFacebook = function () {
		// openFB.login(
			// function(response) {
				// if(response.status === 'connected') {
					// // showCustomDialog(function(){
					// // }, "Facebook login succeessful.");
					// //alert('Facebook login succeeded, got access token: ' + response.authResponse.accessToken);
					// $location.path("/home");
				// } else {
					// alert('Facebook login failed: ' + response.error);
				// }
		// }, {scope: 'email'});
		// openFB.api({
            // path: '/me',
            // success: function(data) {
                // console.log(JSON.stringify(data));
                // document.getElementById("userName").innerHTML = data.name;
                // document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
        // },error: errorHandler});
		// function errorHandler(error) {
			// alert(error.message);
		// }
		// // if (window.cordova.platformId == "browser") {
			// // facebookConnectPlugin.browserInit($scope.appId);
		// // }
		// // facebookConnectPlugin.login( ["email"], 
			// // function (response) { alert(JSON.stringify(response)) },
			// // function (response) { alert(JSON.stringify(response)) });
		// // showCustomDialog(function(){
			// // }, "Function is coming...!");
	// };
	
	// $scope.ConnectWithTwitter = function () {
		// showCustomDialog(function(){
			// }, "Function is coming...!");
	// };
	
	$scope.ConnectWithLinkedIn = function () {
		$cordovaOauth.linkedin("75ji2w2ldv8eis","zJ1saMe8vxcQpe3Z", ["r_basicprofile","r_emailaddress"]).then(function(result) {
			console.log("Response Object -> " + JSON.stringify(result));
			$scope.access_token = result.access_token;
			// get and store user information from LinkedIn
			$http.get("https://api.linkedin.com/v1/people/~:(email-address,first-name,last-name,headline,picture-url,location:(name),positions:(company:(name)))?format=json&oauth2_access_token=" + $scope.access_token)
			.success(function (result) {
				localStorage.setItem('myProfileFromLinkedIn', JSON.stringify(result));
			}).error(function (error) {
				console.log('Error ->' + "Can't get user profile" + error); 
			});
			$rootScope.loginByLinkedIn = true;
			localStorage.setItem('loginByLinkedIn', $rootScope.loginByLinkedIn);
			localStorage.setItem('access_token', JSON.stringify($scope.access_token));
			localStorage.setItem('userName', JSON.stringify(""));
			localStorage.setItem('passWord', JSON.stringify(""));
			$location.path("/home");
		}, function(error) {
			console.log("Error -> " + error);
		});
	};
	
	function validateEmail(email) { 
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
}