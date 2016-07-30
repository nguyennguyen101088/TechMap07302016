/* ==========   EventsMyCityViewController   ==========
============================================= */

function EventsMyCityViewController($scope, $rootScope, $http, $location, $window) {

	$scope.init = function(){
		// Retrieve the object from storage
		$scope.datasMyCity = $rootScope.eventsGlobal;
	};
	
	$scope.GoEventsMyBuilding = function () {
		$location.path("/eventsmystate");
	};
	
	$scope.GoEventsGlobal = function () {
		$location.path("/eventsglobal");
	};
	
	$scope.GoToHome = function () {
		$location.path("/home");
	};
	
	$scope.GoToEventDetail = function(eventDetails){
		$rootScope.eventDetails = eventDetails;
		$location.path("/eventdetail");
    };
}