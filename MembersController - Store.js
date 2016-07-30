/* ==========   MembersViewController   ==========
============================================= */

function MembersViewController($scope, $rootScope, $http, $location, $window) {
	$scope.GoToUserProfile = function(){
		$location.path("/userprofile");
	};
	$scope.GoToMessages = function(){
		$location.path("/home");
	};
	$scope.GoToMap = function(){
		$location.path("/map");
	};
}