/* ==========   MyCompanyController   ==========
============================================= */

function MyCompanyController($scope, $rootScope, $http, $location, $window, $timeout) {
	// init left menu
	BaseController.call(this, $scope, $timeout);
	//
	$scope.urlImageUserProfile = "http://thetechmap.com/uploads/nologo.jpg";
	$scope.init = function(){
		var lattitue = 30.435999;
		var longtitue = -97.793846;
		// show long and lat on map
		$scope.initMapView(lattitue, longtitue);

		var isLoginByLinedIn = JSON.parse(localStorage.getItem('loginByLinkedIn'));
		if(isLoginByLinedIn == true){
			var access_token = JSON.parse(localStorage.getItem('access_token'));
			$http.get("https://api.linkedin.com/v1/people/~:(email-address,first-name,last-name,headline,picture-url,location:(name),positions:(company:(name,industry)))?format=json&oauth2_access_token=" + access_token)
			.success(function (result) {
				console.log("User Profile -> " + JSON.stringify(result));
				$scope.company = result;
				var address = result.location.name;
				var companyName = result.positions.values[0].company.name;
				var companyDescription = result.positions.values[0].company.industry;
				$scope.urlLinkedInUserProfile = "https://www.linkedin.com/";
				if(companyName == ""){
					$scope.company.Name = "My Company";
				}
				else{
					$scope.company.Name = companyName;
				}
				if(companyDescription == ""){
					$scope.company.Description = "Company description";
				}
				else{
					$scope.company.Description = companyDescription;
				}
				$scope.company.Address = address;
				$scope.company.Email = result.emailAddress;
				$scope.company.Url = "http://thetechmap.com/"
				$scope.company.City = "My City";
				
			}).error(function (error) {
				console.log('Error ->' + "Can't get user profile" + error); 
			});
		}
		else{
			var userLogin = JSON.parse(localStorage.getItem('myProfile'));
			var companyName = userLogin.Company;
			if(companyName != "" && companyName != null && companyName == undefined){
				$http.get("http://thetechmap.com/api/company/get?name="+companyName)
				.success(function (data) {
					$scope.company = data;
					localStorage.setItem('CompanyInformation', JSON.stringify($scope.company));
					if($scope.company.ImagePath != "" || $scope.company.ImagePath != null){
						$scope.urlImageUserProfile = $scope.company.ImagePath;
					}
					localStorage.setItem('isGoToCompanyProfile', false);
				}).error(function (error) {
					console.log('Error: ' + "Can't get user information from server." + error); 
				});
			}
			else{
				var companyInfor = {
					Name: "Company Name",
					Address: "Company Address",
					City: "Company City",
					Description: "Company Profile",
					Url: "http://thetechmap.com/"			
				};
				$scope.company = companyInfor;
			}
		}
	};
	
	$scope.BackToCompanies = function(){
		$location.path("/map");
	};
	$scope.GoToEditCompany = function(){
		showCustomDialog(function(){
			}, "Function is coming...!");
	};
}