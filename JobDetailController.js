/* ==========   JobDetailViewController   ==========
============================================= */

function JobDetailViewController($scope, $rootScope, $http, $location, $window, $timeout) {
	// init left menu
	BaseController.call(this, $scope, $timeout);
	//
	$scope.urlImageBackgroundJob = "http://thetechmap.com/uploads/backgroundwall.jpg";
	$scope.init = function(){
		$scope.job = JSON.parse(localStorage.getItem("JobDetail"));
		var lattitue = $scope.job.CompanyObject.Latitude;
		var longtitue = $scope.job.CompanyObject.Longitude;

		// show long and lat on map
		$scope.initMapView(lattitue, longtitue);

		if($scope.job.Description){
			$scope.job.Description = $('<div/>').html($scope.job.Description).text();
		}
		if($scope.job.Logo != "" && $scope.job.Logo != "http://thetechmap.com/uploads/nologo.jpg"){
			$scope.urlImageBackgroundJob = $scope.job.Logo;
		}
	};
	
	$scope.GoToEditJob = function(){
		showCustomDialog(function(){
			}, "Function is coming...!");
	};

	$scope.ApplyJob = function(){
		showCustomDialog(function(){
			}, "Apply succeeded");
		$location.path("/jobs");
	}
}