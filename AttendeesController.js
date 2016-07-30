/* ==========   AttendeesViewController   ==========
============================================= */

function AttendeesViewController($scope, $rootScope, $window, $location) {
	$scope.init = function(){
		$scope.attendees = JSON.parse(localStorage.getItem('attendeesList'));
	};
	$scope.GoToUserProfile = function (userProfile) {
		localStorage.setItem('userProfile', JSON.stringify(userProfile));
		$location.path("/userprofilefromattendeesscreen");
	}
}