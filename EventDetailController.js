/* ==========   EventDetailViewController   ==========
============================================= */

function EventDetailViewController($scope, $rootScope, $http, $location, $window, $timeout) {
	// init left menu
	BaseController.call(this, $scope, $timeout);
	$scope.longitude = 51.508742;
	$scope.latitude = -0.120850;
	$scope.countAttending = 0;
	$scope.eventCost = 0;
	$scope.quantity = 0;
	$scope.promoCode = "";
	$scope.ticketType = "Tickets";
	$scope.urlImageBackgroundEvent = "http://thetechmap.com/uploads/backgroundwall.jpg";
	$scope.urlImageUserProfile1 = "http://thetechmap.com/uploads/noimage.jpg";
	$scope.urlImageUserProfile2 = "http://thetechmap.com/uploads/noimage.jpg";
	$scope.urlImageUserProfile3 = "http://thetechmap.com/uploads/noimage.jpg";
	$scope.urlImageUserProfile4 = "http://thetechmap.com/uploads/noimage.jpg";
	$scope.init = function(){
		// Retrieve the object from storage
			$scope.eventData = JSON.parse(localStorage.getItem('dataEventMyGlobal'));
			var attendeesList = $scope.eventData.EventAttendees;
			var newAttendeesList = [];
			for(i = 0; i< attendeesList.length; i++){
				if(attendeesList[i] != "" && attendeesList[i] != null && attendeesList[i] != undefined){
					if(attendeesList[i].User != undefined){
						if(attendeesList[i].User.ProfilePhoto == "" || attendeesList[i].User.ProfilePhoto == null){
							attendeesList[i].User.ProfilePhoto = "http://thetechmap.com/uploads/noimage.jpg";
						}
						else{
							attendeesList[i].User.ProfilePhoto = "http://thetechmap.com/uploads/"+ attendeesList[i].User.ProfilePhoto;
						}
						newAttendeesList.push(attendeesList[i]);
					}
				}
			}
			//
			localStorage.setItem('attendeesList', JSON.stringify(newAttendeesList));
			
			if($scope.eventData.Latitude != null && $scope.eventData.Latitude != "")
					$scope.latitude = $scope.eventData.Latitude;
			if($scope.eventData.Longitude != null && $scope.eventData.Longitude != "")
					$scope.longitude = $scope.eventData.Longitude;
					
			// get url background image event
			if($scope.eventData.Image){
					$scope.urlImageBackgroundEvent = $scope.eventData.Image;
			}
			
			//decode html event description
			if($scope.eventData.EventDescription != "" || $scope.eventData.EventDescription != null){
					$scope.eventData.EventDescription = $('<div/>').html($scope.eventData.EventDescription).text();
			}
			
			// count attendees join event
			if($scope.eventData.EventAttendees.length > 0){
					$scope.countAttending = $scope.eventData.EventAttendees.length;
			}
			
			// 
			if($scope.eventData.EventTickets.length > 0){
					$scope.eventCost = $scope.eventData.EventTickets[0].Price;
			}
			else{
				$scope.eventCost = $scope.eventData.EventCost;
			}
			
			// 
			if($scope.eventData.EventTickets.length > 0){
				if($scope.eventData.EventTickets[0].TicketName != "" || $scope.eventData.EventTickets[0].TicketName != null || $scope.eventData.EventTickets[0].TicketName != undefined){
					$scope.ticketType = $scope.eventData.EventTickets[0].TicketName;
				}	
			}
			
			// show event address on map
			$scope.initMapView($scope.latitude, $scope.longitude);
			
			// Get image user attendee
			if(attendeesList.length > 0 && attendeesList.length == 1){
				$scope.urlImageUserProfile1 = attendeesList[0].User.ProfilePhoto;
			}
			else if(attendeesList.length > 0 && attendeesList.length == 2){
				$scope.urlImageUserProfile1 = attendeesList[0].User.ProfilePhoto;
				$scope.urlImageUserProfile2 = attendeesList[1].User.ProfilePhoto;
			}
			else if(attendeesList.length > 0 && attendeesList.length == 3){
				$scope.urlImageUserProfile1 = attendeesList[0].User.ProfilePhoto;
				$scope.urlImageUserProfile2 = attendeesList[1].User.ProfilePhoto;
				$scope.urlImageUserProfile3 = attendeesList[2].User.ProfilePhoto;
			}
			else if(attendeesList.length > 3){
				$scope.urlImageUserProfile1 = attendeesList[0].User.ProfilePhoto;
				$scope.urlImageUserProfile2 = attendeesList[1].User.ProfilePhoto;
				$scope.urlImageUserProfile3 = attendeesList[2].User.ProfilePhoto;
				$scope.urlImageUserProfile4 = attendeesList[3].User.ProfilePhoto;
			}
	};
	
	$scope.GoToOrderSummary = function(ticketType, eventCost, eventDate, eventName, eventStart, eventEnd, urlImageBackgroundEvent){
		var orderSummary = {
			TicketType: ticketType,
			EventCost: eventCost,
			EventDate: eventDate,
			EventName: eventName,
			EventStart: eventStart,
			EventEnd: eventEnd,
			Image: urlImageBackgroundEvent
		};
		localStorage.setItem('orderSummary', JSON.stringify(orderSummary));
		if($scope.quantity == 0){
			showCustomDialog(function(){
			}, "Quantity not less than 0. Please fill quantity.");
		}
		else{
			$location.path("/eventorder");
		}
	};
	
	$scope.GoToAttendees = function () {
		$location.path("/attendees");
	};
	
	$scope.quantityChange = function (val) {
		$scope.quantity = val;
		localStorage.setItem('quantityOrder', JSON.stringify($scope.quantity));
	};
	
	$scope.promoCodeChange = function (val) {
		$scope.promoCode = val;
		localStorage.setItem('promoCode', JSON.stringify($scope.promoCode));
	};
}