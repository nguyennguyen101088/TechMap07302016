/* ==========   EventOrderSummaryViewController   ==========
============================================= */

function EventOrderSummaryViewController($scope, $rootScope, $http, $location, $window) {
	$scope.init = function(){
		// Retrieve the object from storage
        var orderSummary = JSON.parse(localStorage.getItem('orderSummary'));
		$scope.eventDate = orderSummary.EventDate;
        $scope.eventName = orderSummary.EventName;
        $scope.eventStart = orderSummary.EventStart;
        $scope.eventEnd = orderSummary.EventEnd;
        $scope.urlImageBackgroundEvent = orderSummary.Image;
        $scope.ticketType = orderSummary.TicketType;        
        $scope.eventCost = orderSummary.EventCost;
        $scope.quantityOrder = JSON.parse(localStorage.getItem('quantityOrder'));
	};
}
