APP.CONTROLLERS.controller ('CTRL_SETTINGS',['$scope','$ionicPlatform','dataRestore',
    function($scope,$ionicPlatform,dataRestore){
	$scope.myData = {};
	$scope.restoreFromStorage = function(){
		dataRestore.restoreSettings($scope.myData);
		
	}
	if(!$scope.myData.frequencyOfGreenAlerts){
		$scope.myData.frequencyOfGreenAlerts = 5;
	}
	if(!$scope.myData.frequencyOfRedAlerts){
		$scope.myData.frequencyOfRedAlerts = 5;
	}
	/*if(!$scope.myData.cacheMyLocationFrequency){
		$scope.myData.cacheMyLocationFrequency = 5;
	}*/
	if(!$scope.myData.mapType){
		$scope.myData.mapType = 'mapMyIndia';
	}
	
	if(!$scope.myData.useChargerUnplugEvent){
		$scope.myData.useChargerUnplugEvent = false;
	}
	/*if(!$scope.myData.cacheMyLocation){
		$scope.myData.cacheMyLocation = false;
	}*/
	
	
	
	
	$scope.updateSettings = function(){
		window.localStorage.setItem("frequencyOfGreenAlerts", $scope.myData.frequencyOfGreenAlerts);
		window.localStorage.setItem("frequencyOfRedAlerts", $scope.myData.frequencyOfRedAlerts);
		window.localStorage.setItem("mapType", $scope.myData.mapType);
		window.localStorage.setItem("useChargerUnplugEvent", $scope.myData.useChargerUnplugEvent);
		/*window.localStorage.setItem("cacheMyLocation", $scope.myData.cacheMyLocation);
		if($scope.myData.cacheMyLocation){
			window.localStorage.setItem("cacheMyLocationFrequency", $scope.myData.cacheMyLocationFrequency);
		}else {
			window.localStorage.setItem("cacheMyLocationFrequency", "60");
		}*/
		
	}
	$ionicPlatform.ready( function() {
		$scope.restoreFromStorage();
	});
	
		
	}
])