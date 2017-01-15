APP.CONTROLLERS.controller ('CTRL_NearMe',['$scope','dataRestore','$ionicSideMenuDelegate',
    function($scope,dataRestore,$ionicSideMenuDelegate){
	$scope.nearMe = function(find){
		window.open('https://www.google.co.in/maps/search/'+find+'+near+me','_system');
	}
	$scope.showMenu = function () {
	    $ionicSideMenuDelegate.toggleLeft();
	  };
}])