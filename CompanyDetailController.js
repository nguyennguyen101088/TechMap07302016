/* ==========   CompanyDetailViewController   ==========
============================================= */

function CompanyDetailViewController($scope, $rootScope, $http, $location, $window, $timeout) {
	// init left menu
	BaseController.call(this, $scope, $timeout);
	//
	$scope.urlImageUserProfile = "http://thetechmap.com/uploads/nologo.jpg";
	$scope.init = function(){
		var companyData = JSON.parse(localStorage.getItem('CompanyData'));
		var lattitue = companyData.Latitude;
		var longtitue = companyData.Longitude;
		// show long and lat on map
		$scope.initMapView(lattitue, longtitue);

		$scope.company = companyData;
		if($scope.company.ImagePath != "" || $scope.company.ImagePath != null){
			$scope.urlImageUserProfile = $scope.company.ImagePath;
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