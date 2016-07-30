/* ==========   EventsGlobalViewController   ==========
============================================= */

function EventsGlobalViewController($scope, $rootScope, $http, $location, $window, $timeout) {
	$scope.init = function(){
		// Retrieve the object from storage
		var dataStore = JSON.parse(localStorage.getItem("eventsGlobal"));
		if(dataStore != null || dataStore != undefined){
			$scope.datasGlobal = dataStore;
		}
		else{
			getData();
		}

		//show more functionality
		var pagesShown = 1;
		var pageSize = 10;
		
		$scope.paginationLimit = function(data) {
			return pageSize * pagesShown;
		};

		$scope.hasMoreItemsToShow = function() {
			return pagesShown < ($scope.datasGlobal.length / pageSize);
		};
		
		$scope.showMoreItems = function() {
			pagesShown = pagesShown + 1;       
		};			
	};
	
	var getData = function(){
		$http.get("http://thetechmap.com/api/event/get")
			.success(function (data) {
				var newArray = [];
				for(i = 0; i < data.length; i++){
					if(data[i] != "" && data[i] != undefined && data[i] != null){
						if(data[i].$ref == undefined){
							newArray.push(data[i]);
						}
					}
				}
				for(i = 0; i < newArray.length; i++){
					if(newArray[i].EventDate != "" || newArray[i].EventDate != null && newArray[i].EventDate != undefined){
						var arrayDate = newArray[i].EventDate.slice(0,10).split("-");
						newArray[i].EventDate = arrayDate[1] + "-" + arrayDate[2] + "-" + arrayDate[0];
					}
					if(newArray[i].Image == "" || newArray[i].Image == null || newArray[i].Image == undefined){
						newArray[i].Image = "http://thetechmap.com/uploads/backgroundwall.jpg";
					}
				}
				
				
				// for(i = 0; i < data.length; i++){
				// 	if(data[i].EventDate != "" || data[i].EventDate != null && data[i].EventDate != undefined){
				// 		if(data[i].$ref == undefined){
				// 			var arrayDate = data[i].EventDate.slice(0,10).split("-");
				// 			data[i].EventDate = arrayDate[1] + "-" + arrayDate[2] + "-" + arrayDate[0];
				// 		}
				// 	}
				// 	if(data[i].Image == "" || data[i].Image == null || data[i].Image == undefined){
				// 		data[i].Image = "http://thetechmap.com/uploads/backgroundwall.jpg";
				// 	}
				// }
				//store data to local;
				localStorage.setItem("eventsGlobal", JSON.stringify(newArray));
				console.log("get data events successful."); 
			}).error(function (data) {
				console.log('Error: ' + "Can't get data events."); 
			});
	};
	
	// Function to replicate setInterval using $timeout service.
  	$scope.intervalFunction = function(){
		$timeout(function() {
			getData();
			$scope.intervalFunction();
			console.log('Reload get all event from server');
		}, 1000 * 60)
  	};
	
	// Kick off the interval
  	$scope.intervalFunction();

	$scope.GoEventsMyCity = function () {
		$location.path("/eventsmycity");
	};
	
	$scope.GoEventsMyBuilding = function () {
		$location.path("/eventsmystate");
	};
	
	$scope.GoToHome = function () {
		$location.path("/home");
	};

	$scope.GoToCreateEvent = function(){
		showCustomDialog(function(){
			}, "The feature is coming!");
	};

	$scope.GoToEventDetail = function(eventDetails){
		//$rootScope.eventDetails = eventDetails;
		localStorage.setItem('dataEventMyGlobal', JSON.stringify(eventDetails));
		$location.path("/eventdetail");
    };
}