APP.CONTROLLERS.controller ('CTRL_NearMe',['$scope','dataRestore',
    function($scope,dataRestore){
	$scope.nearMe = function(find){
		window.open('https://www.google.co.in/maps/search/'+find+'+near+me','_system');
	}
	
}])