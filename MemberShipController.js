/* ==========   MembershipViewController   ==========
============================================= */

function MembershipViewController($scope, $rootScope, $http, $location, $window, PaypalService) {
	$scope.init = function(){
		
	};
	$scope.GoToSubscribeMemberVIP = function () {
		// PaypalService.initPaymentUI().then(function () {
		// 	PaypalService.makePayment(90, "Total Amount").then(function (response) {
		// 		alert("success" + JSON.stringify(response));
		// 	}, 
		// 	function (error) {
		// 		alert("Transaction Canceled");
		// 	});
		// });
	};
}