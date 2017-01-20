APP.CONTROLLERS.controller ('CTRL_SETTINGS',['$scope','$ionicPlatform','dataRestore',
    function($scope,$ionicPlatform,dataRestore){
	
	$scope.myData = {};
	$scope.restoreFromStorage = function(){
		dataRestore.restoreSettings($scope.myData);
		
	}
	if(!$scope.myData.frequencyOfGreenAlerts || $scope.myData.frequencyOfGreenAlerts <15){
		$scope.myData.frequencyOfGreenAlerts = 15;
	}
	if(!$scope.myData.frequencyOfRedAlerts || $scope.myData.frequencyOfRedAlerts < 60){
		$scope.myData.frequencyOfRedAlerts = 60;
	}
	if(!$scope.myData.shakeIntensity){
		$scope.myData.shakeIntensity = 15;
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
	if(!$scope.myData.listenShakeEvent){
		$scope.myData.listenShakeEvent = false;
	}
	if(!$scope.myData.anounceSMSText){
		$scope.myData.anounceSMSText = false;
	}
	if(!$scope.myData.autoReplyToWRU){
		$scope.myData.autoReplyToWRU = false;
	}
	var welcomeMsg = window.localStorage.getItem("playWelcomeMessage");
	if ( welcomeMsg == 'true'){
		$scope.myData.playWelcomeMessage = true;
		
	}else {
		$scope.myData.playWelcomeMessage = false;
		
	}
	
	window.localStorage.setItem("settingPageVisited",true);
	
	$scope.updateSettings = function(){
		window.localStorage.setItem("frequencyOfGreenAlerts", $scope.myData.frequencyOfGreenAlerts);
		window.localStorage.setItem("frequencyOfRedAlerts", $scope.myData.frequencyOfRedAlerts);
		window.localStorage.setItem("mapType", $scope.myData.mapType);
		window.localStorage.setItem("useChargerUnplugEvent", $scope.myData.useChargerUnplugEvent);
		window.localStorage.setItem("listenShakeEvent", $scope.myData.listenShakeEvent);
		window.localStorage.setItem("shakeIntensity", $scope.myData.shakeIntensity);
		window.localStorage.setItem("playWelcomeMessage", $scope.myData.playWelcomeMessage);
		window.localStorage.setItem("anounceSMSText", $scope.myData.anounceSMSText);
		window.localStorage.setItem("autoReplyToWRU", $scope.myData.autoReplyToWRU);
		
		
		$scope.$emit('settingsChanged');
	}
	$ionicPlatform.ready( function() {
		$scope.restoreFromStorage();
	});
	
		
	}
])