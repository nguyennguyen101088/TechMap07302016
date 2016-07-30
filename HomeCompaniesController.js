/* ==========   HomeMapViewController   ==========
 ============================================= */

function HomeCompaniesController($scope, $http, $location) {
	$scope.init = function(){
		var companiesStore = JSON.parse(localStorage.getItem('companies'));
		// Load data companies from localStorage if exists
		if(companiesStore != null || companiesStore != undefined){
			$scope.companies = companiesStore;
		}
		else{
			getDataForCompanies();
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
	};

	var getDataForCompanies = function(){
		// Get all companies from server
		$http.get("http://thetechmap.com/api/company/get")
		.success(function (data) {
			$scope.companies = data;
			localStorage.setItem("companies", JSON.stringify($scope.companies));
		}).error(function (error) {
			console.log('Error: ' + "Can't get data companies." + error);
		});
	};

	// go to company detail
	$scope.GoToMemberDetail = function(companyDetail){
		localStorage.setItem('CompanyData', JSON.stringify(companyDetail));
		$location.path("/companydetail");
    };

	// go to add company
	$scope.GoToAddCompany = function(){
		showCustomDialog(function(){
			}, "The feature is coming!");
    };

		// handle change tabs
	$scope.onTabChange = function (event) {
		// find tab is active and deactive this tab
		var tabEl = event && event.target;
		if (!tabEl) return;

		var tabContent = $("#tab-content");
		var tabActive = tabContent && tabContent.find("div.tab-pane.active");
		tabActive && tabActive.removeClass("active");
		// set active on selected tab
		var tabEl = event.target;
		var selectedTabContentId;
		if (tabEl.getAttribute("data-content")) {
			selectedTabContentId = tabEl && tabEl.getAttribute("data-content");
		}
		else {
			var parentEl = $(tabEl).parent();
			selectedTabContentId = parentEl && parentEl[0] && parentEl[0].getAttribute("data-content");
		}
		var selectedTabContent = $("#" + selectedTabContentId);
		selectedTabContent && selectedTabContent.addClass("active");
	};
}
