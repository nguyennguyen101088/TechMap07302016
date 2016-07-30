/* ==========   CommentViewController   ==========
 ============================================= */

function CommentViewController($scope, $rootScope, $http, $location, $window) {
	$scope.urlImageUserProfile = "http://thetechmap.com/uploads/noimage.jpg";
	$scope.isLike = false;
	$scope.isLikeComment = false;
	$scope.isStyleNumberLikeMessage = false;
	$scope.isStyleNumberLikeComment = false;
	$scope.init = function(){
		$scope.contentMessage = $rootScope.contentMessage;
		if($scope.contentMessage.UserPhoto != "" && $scope.contentMessage.UserPhoto != null){
			$scope.urlImageUserProfile = $scope.contentMessage.UserPhoto;
		}
		if ($scope.contentMessage.Replies == null || $scope.contentMessage.Replies <= 0) {
			document.getElementById("numberLikeComment").style.display = "none";
			$scope.isStyleNumberLikeComment = true;
		}
	};

	//go to map screen
	$scope.GoToMap = function () {
		$location.path("/map");
	};
	
	// go to messges screen
	$scope.GoToMembers = function () {
		$location.path("/messages");
	};
	
	// go to user profile screen when user click a user photo
	$scope.GoToUserProfile = function(userID){
		$rootScope.isGoToUserProfile = true;
		localStorage.setItem('userID', userID);
		$location.path("/userprofile");
	};
	
	// handle LIKE button
	$scope.LikeMessage = function () {
		if($scope.isLike == false){
			var elem = document.getElementById("btnLike");
			elem.innerHTML = "LIKED";
			elem.style.paddingLeft = "5px";
			if($scope.isStyleNumberLikeMessage == true){
				document.getElementById("numberLikeMessage").removeAttribute("style");
				$scope.isStyleNumberLikeMessage == false;
			}
			// calculate likes number
			var numberLikeMessage = document.getElementById("numberLikeMessage");
			var value = numberLikeMessage.innerHTML.split(" ")[0];
			var	numLike = parseInt(value) + 1;
			numberLikeMessage.innerHTML = numLike.toString() + " likes ";
			$scope.isLike = true;
	    }
		else{
			var elem = document.getElementById("btnLike");
			elem.innerHTML = "LIKE";
			elem.style.paddingLeft = "10px";
			// re-calculate likes number
			var numberLikeMessage = document.getElementById("numberLikeMessage");
			var value = numberLikeMessage.innerHTML.split(" ")[0];
			var	numLike = parseInt(value) - 1;
			if(numLike == 0){
				document.getElementById("numberLikeMessage").style.display = "none";
				$scope.isStyleNumberLikeMessage == true;
			}
			numberLikeMessage.innerHTML = numLike.toString() + " likes ";
			$scope.isLike = false;
		}
	};
	
	$scope.LikeComment = function(){
		if($scope.isLikeComment == false){
			var elem = document.getElementById("btnLikeComment");
			elem.innerHTML = "LIKED";
			if($scope.isStyleNumberLikeComment == true){
				document.getElementById("numberLikeComment").removeAttribute("style");
				$scope.isStyleNumberLikeComment == false;
			}
			// calculate likes number
			var numberLikeComment = document.getElementById("numberLikeComment");
			var value = numberLikeComment.innerHTML.split(" ")[1];
			var	numLike = parseInt(value) + 1;
			numberLikeComment.innerHTML = "Likes " + numLike.toString();
			numberLikeComment.style.fontSize = "14px";
			numberLikeComment.style.borderRight  = "2px solid #e3e3e3";
			numberLikeComment.style.paddingLeft = "5px";
			numberLikeComment.style.paddingRight = "10px";
			$scope.isLikeComment = true;
	    }
		else{
			var elem = document.getElementById("btnLikeComment");
			elem.innerHTML = "LIKE";
			//elem.style.paddingLeft = "10px";
			// re-calculate likes number
			var numberLikeComment = document.getElementById("numberLikeComment");
			var value = numberLikeComment.innerHTML.split(" ")[1];
			var	numLike = parseInt(value) - 1;
			if(numLike == 0){
				document.getElementById("numberLikeComment").style.display = "none";
				$scope.isStyleNumberLikeComment == true;
			}
			numberLikeComment.innerHTML = "Likes " + numLike.toString();
			numberLikeComment.style.fontSize = "14px";
			numberLikeComment.style.borderRight  = "2px solid #e3e3e3";
			numberLikeComment.style.paddingLeft = "5px";
			numberLikeComment.style.paddingRight = "10px";
			$scope.isLikeComment = false;
		}
	};
	
	// handle COMMENT button
	$scope.GoToComment = function(messagae){
		$rootScope.contentMessage = message; 
		$location.path("/comment");
	};
	
	$('input').on('focus', function(e) {
		window.addEventListener('native.keyboardshow', keyboardShowHandler);
		function keyboardShowHandler(e){
			setTimeout(function() {
				$('html, body').animate({ scrollTop: 0 }, 1000);
			}, 0);
		} 
	});
}