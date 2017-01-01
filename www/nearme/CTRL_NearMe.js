APP.CONTROLLERS.controller ('CTRL_NearMe',['$scope',
    function($scope){
	$scope.nearMe = function(find){
		window.open('https://www.google.co.in/maps/search/'+find+'+near+me','_system');
	}
	
}])