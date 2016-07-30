/* ==========   EventsMyStateViewController   ==========
============================================= */

function EventsMyStateViewController($scope, $rootScope, $http, $location, $window) {

	$scope.init = function(){
		// Retrieve the object from storage
		var dataStore = JSON.parse(localStorage.getItem("eventsMyState"));
		if(dataStore != null || dataStore != undefined){
			$scope.datasMyState = dataStore;
		}
		else{
			getData();
		}

		//show more functionality
		var pagesShown = 1;
		var pageSize = 3;
		
		$scope.paginationLimit = function(data) {
			return pageSize * pagesShown;
		};

		$scope.hasMoreItemsToShow = function() {
			return pagesShown < ($scope.datasMyState.length / pageSize);
		};
		
		$scope.showMoreItems = function() {
			pagesShown = pagesShown + 1;       
		};			
	};
	
	var getData = function() {
		var userState = localStorage.getItem('userState');
		var state = "Texas";
		if(userState != null && userState != undefined && userState != ""){
			userState = userState.split();
		}
		else{
			userState = state.split();
		}	
		
		//Get all events by state from server	
		$http.get("http://thetechmap.com/api/event/get?state="+userState)
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
					if(newArray[i] != "" && newArray[i] != null){
						if(newArray[i].EventDate != "" && newArray[i].EventDate != null && newArray[i].EventDate != undefined){
							var arrayDate = newArray[i].EventDate.slice(0,10).split("-");
							newArray[i].EventDate = arrayDate[1] + "-" + arrayDate[2] + "-" + arrayDate[0];
						}
						if(newArray[i].Image == "" || newArray[i].Image == null || newArray[i].Image == undefined){
							newArray[i].Image = "http://thetechmap.com/uploads/backgroundwall.jpg";
						}
					}
				}
				// store data to localStorage
				localStorage.setItem("eventsMyState", JSON.stringify(newArray));
				console.log("get data events my state successful."); 
			}).error(function (error) {
				console.log('Error: ' + "Can't get data events my state." + error); 
			});	
	};
	
	$scope.GoEventsMyCity = function () {
		$location.path("/eventsmycity");
	};
	
	$scope.GoEventsGlobal = function () {
		$location.path("/eventsglobal");
	};
	
	$scope.GoToHome = function () {
		$location.path("/home");
	};
	
	$scope.GoToEventDetail = function () {
		$location.path("/eventdetail");
	};
	
	$scope.GoToEventDetail = function(eventDetails){
		localStorage.setItem('dataEventMyGlobal', JSON.stringify(eventDetails));
		$location.path("/eventdetail");
    };
}