/* ==========   CompaniesViewController   ==========
============================================= */

function CompaniesViewController($scope, $rootScope, $http, $location, $window) {
	$scope.init = function(){
		var companiesStore = JSON.parse(localStorage.getItem('companies'));
		if(companiesStore != null || companiesStore != undefined){
			$scope.companies = companiesStore;
		}
		else{
			getData();
		}

		//show more functionality
		var pagesShown = 1;
		var pageSize = 20;
		
		$scope.paginationLimit = function(data) {
			return pageSize * pagesShown;
		};

		$scope.hasMoreItemsToShow = function() {
			return pagesShown < ($scope.companies.length / pageSize);
		};
		
		$scope.showMoreItems = function() {
			pagesShown = pagesShown + 1;       
		};			
	}
	
	var getData = function(){
		// Get all companies from server
		$http.get("http://thetechmap.com/api/company/get")
			.success(function (data) {
				$scope.companies = data;
				localStorage.setItem("companies", JSON.stringify($scope.companies));
				console.log("calculate types company successful.");
			}).error(function (error) {
				console.log('Error: ' + "Can't get data companies." + error);
			});
	};
	
	$scope.GoToCompanyDetail = function(companyDetail){
		localStorage.setItem('CompanyData', JSON.stringify(companyDetail));
		localStorage.setItem('isGoToCompanyDetail', true);
		$location.path("/companydetail");
    };
	$scope.GoToMessages = function () {
		$location.path("/messages");
	};
	
	$scope.GoToHome = function () {
		$location.path("/home");
	};
}