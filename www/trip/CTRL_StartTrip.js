APP.CONTROLLERS.controller ('CTRL_StartTrip',['$scope','$state','$ionicPlatform','dataRestore','$ionicPopup','$http','$ionicPopup','$rootScope',
    function($scope,$state,$ionicPlatform,dataRestore,$ionicPopup,$http,$ionicPopup,$rootScope){
	
	var mySettings = {};
	dataRestore.restoreSettings(mySettings);
	mySettings.frequencyOfRedAlerts
	

	$scope.timeout = 1000 * mySettings.frequencyOfRedAlerts;
	$scope.refreshPage = function(){
		setTimeout(function(){
			$state.transitionTo('menu.tab.starttrip');	
		},1)
		$state.transitionTo('menu.tab.home');
	}
	
	$scope.refreshPage();
	$scope.locationNotFoundAlert = 0;
	$scope.mydata = {};
	$scope.mydata.locationName = "";
	$scope.mydata.tripStartTime = "";
	$scope.mydata.tripStartDateObj = null;
	$scope.mydata.activeTrip = null;
	$scope.mydata.activeTripTimeOutFunction = null;
	$scope.mydata.timeLeft = "";
	$scope.mydata.times= ["15 Minutes","30 minutes","45 minutes", "1 hour","2 Hour","3 Hour","4 Hour","5 Hour","6 Hour","7 Hour","8 Hour"];
	$scope.mydata.TimeArray =[];
	$scope.destinationETA = null;
	$scope.destinationETADate = null;
	
	$scope.restoreLocations = function(){
		$scope.mydata.myLocations = dataRestore.restoreSavedLocations();
		
		for (var i=0;i<$scope.mydata.myLocations.length;i++){
			$scope.mydata.myLocations[i].times = $scope.mydata.times.slice(0);
		}
	}
	
	$scope.restoreLocations();
	$rootScope.$on('restoreLocations',function(event, data){
		$scope.restoreLocations();
	});
	$scope.vibrate = function(){
		//cordova plugin add cordova-plugin-vibration
		navigator.vibrate(1000);
	}
	
	$scope.checkLocationAvailable = function(){
		cordova.plugins.diagnostic.isLocationAvailable(function(available){
			if(!available){
				var confirmPopup = $ionicPopup.confirm({
				     title: "Looks like your phone's location Services are off. Please turn it on. ",
				     template: 'Do you want to turn it on now?'
				   });

				   confirmPopup.then(function(res) {
				     if(res) {
				    	 cordova.plugins.diagnostic.switchToLocationSettings(); 
				     } else {
				    	 $ionicPopup.alert({
						     title: "Looks like your phone's location Services are off. Please turn it on. ",
						     template: 'Please turn the feature on before continuing.'
						   });
				     }
				   });
				   
				  
			 }
		});
	}
	$scope.dateOptions = {
		    weekday: "long", year: "numeric", month: "short",
		    day: "numeric", hour: "2-digit", minute: "2-digit",second: "2-digit"
		};
	$scope.displayTimeLeft = function(apply){
		var diffMs = ($scope.destinationETADate - (new Date())); 
		var diffMins = Math.round((diffMs) / 60000); // minutes
		var seconds = Math.round(((diffMs-1) % 60000  ) / 1000);
		$scope.mydata.timeLeft = (diffMins -1) +" minutes,  "+seconds+" seconds";
		if(apply){
			$scope.$apply();
		}
		
	}
	
	$scope.startTrip = function(location,locationName, select,btn){
		$scope.mydata.activeTrip = location;
		location.trip = true;
		locationName.addClass('selectedgreen');
		select.addClass('selectedgreen');
		btn.addClass('selectedgreen');
		//$scope.displayTimeLeft();
	}
	$scope.stopTrip = function(location,locationName, select,btn){
		location.trip = false;
		locationName.removeClass('selectedgreen');
		select.removeClass('selectedgreen');
		btn.removeClass('selectedgreen');
		locationName.removeClass('selectedred');
		select.removeClass('selectedred');
		btn.removeClass('selectedred');
	}
	
	$scope.markRed = function(index){
		for (var i=0;i<$scope.mydata.myLocations.length;i++){
			var locationName = angular.element( document.querySelector( '#location'+i ) );
			var select = angular.element( document.querySelector( '#select'+i ) );
			var btn = angular.element( document.querySelector( '#btn'+i ) );
			
			if(i == index ){
				if (!locationName.hasClass('selectedred')){
					locationName.addClass('selectedred');
					select.addClass('selectedred');
					btn.addClass('selectedred');
				}	
			}
		}	
	}
	
	$scope.markSelected = function(index){
		$scope.locationNotFoundAlert = 0;
		$scope.mydata.activeTrip = null;
		$scope.mydata.tripStartTime = "";
		$scope.mydata.tripStartDateObj = null;
		for (var i=0;i<$scope.mydata.myLocations.length;i++){
			$scope.mydata.myLocations[i].index = i;
			var locationName = angular.element( document.querySelector( '#location'+i ) );
			var select = angular.element( document.querySelector( '#select'+i ) );
			var btn = angular.element( document.querySelector( '#btn'+i ) );
			
			if(i == index && $scope.mydata.myLocations[i].time && $scope.mydata.myLocations[i].time.length > 0){
				if (locationName.hasClass('selectedgreen')){
					$scope.stopTrip($scope.mydata.myLocations[i],locationName,select,btn);
				}else{
					$scope.startTrip($scope.mydata.myLocations[i],locationName,select,btn);
				}
				
			}else{
				$scope.stopTrip($scope.mydata.myLocations[i],locationName,select,btn);
				
			}
		}
		$scope.monitorActiveTrip();
	}
	$scope.updateLocation = function(position){
		 var lat = position.coords.latitude;
		 var lon = position.coords.longitude;
		 $scope.userLocation = lat + ',' + lon;
		 $scope.userLocationGoogle = $scope.userLocation+',15z';
	}
	$scope.alertOkNoPos = function(){
		$scope.alertOk(null);
	}
	$scope.alertOk = function(position) {
		//$scope.smsText = "I reached "+$scope.mydata.activeTrip.name+" safely." already done at this point activeTrip is null
		if (null != position && position.coords && position.coords.latitude){
			$scope.updateLocation(position);
			$scope.getLocationNameAndSendSMS();
		}else {
			$scope.emitSMSEvent();
		}
		
	 }
	$scope.alertDangerNoPos =  function(){
		$scope.alertDanger(null);
	}
	$scope.alertDanger = function(position) {
		$scope.smsText = "I am running late for "+$scope.mydata.activeTrip.name+" Please help."
		if (null != position && position.coords && position.coords.latitude){
			$scope.updateLocation(position);
			$scope.getLocationNameAndSendSMS();
		}else {
			$scope.emitSMSEvent();
		}
		
		
		
	 }
	  
	$scope.checkIfLocationisInLimit  = function(position){
		
		var lat = position.coords.latitude;
	    var lon = position.coords.longitude;
	    var safeDistance = dataRestore.getFromCache('safeDistance', 'number');
		if (safeDistance === 0){
			safeDistance = 500;
		}
		
		var location = $scope.mydata.activeTrip.details;
		location = location.split(",");
		if (dataRestore.getDistanceFromLatLonInMeters(lat,lon,parseFloat(location[0]),parseFloat(location[1])) < safeDistance ){
			$scope.vibrate();
			$scope.$emit('sendSMS',"I reached "+$scope.mydata.activeTrip.name+" safely.");
			$ionicPopup.alert({
			     title: 'In Safe zone!',
			     template: 'Glad to know that you reached '+$scope.mydata.activeTrip.name+' safely'
			   });
			$scope.markSelected(-1);//Remove green from all trips as the trips is completed successfully
			//navigator.geolocation.getCurrentPosition($scope.alertOk, $scope.alertOkNoPos, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
		}else{
			if ($scope.destinationETADate - (new Date()) < 0){//ETA passed
				$scope.markRed($scope.mydata.activeTrip.index);
				
				navigator.geolocation.getCurrentPosition($scope.alertDanger, $scope.alertDangerNoPos, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
			}
			$scope.mydata.activeTripTimeOutFunction = setTimeout(function(){
				$scope.findWhereYouReached();
			}, $scope.timeout);
			
		}
			
	}
	$scope.emitSMSEvent = function(){
		$scope.$emit('sendSMS',$scope.smsText);
	}
	$scope.getLocationNameAndSendSMS = function(){
		
		$scope.mydata.locationName = $scope.userLocation;
		$http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+$scope.userLocation+'&key='+dataRestore.getGoogleKeyforLocationSrv()).then(function(response){
			if (response.data.status == 'OK'){
				$scope.mydata.locationName = response.data.results[0].formatted_address;
				$scope.smsText += " My current location is "+$scope.mydata.locationName+" "
			}
			$scope.emitSMSEvent();

			},function(response){
				$scope.emitSMSEvent();;
			});
	}
	$scope.findWhereYouReached = function(){
		$scope.displayTimeLeft(true);
		$scope.mydata.activeTripTimeOutFunction = null;//time out triggered to make this variable null as it do not mean anything
		navigator.geolocation.getCurrentPosition($scope.checkIfLocationisInLimit,$scope.retryLocationFind, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
	}
	$scope.retryLocationFind = function(){//Retry after a minute
		
		$scope.mydata.activeTripTimeOutFunction = setTimeout(function(){
			$scope.findWhereYouReached();
		}, $scope.timeout);
	}
	
	
	$scope.monitorActiveTrip = function(){
		//1. clear previous time out if any before setting new one
		if ($scope.mydata.activeTripTimeOutFunction != null){
			clearTimeout($scope.mydata.activeTripTimeOutFunction);
		}
		
		//2. if active trip exist set a new time out function
		if ($scope.mydata.activeTrip != null){
			$scope.checkLocationAvailable();
			$scope.destinationETA = parseInt($scope.mydata.activeTrip.time);
			if ($scope.destinationETA >= 15){//15 can not be hours it is minutes
				$scope.destinationETA *= 1000*60; 
			}else{ //time in hours
				$scope.destinationETA *= 1000*60*60; 
			}
			
			// get the current date & time
			var dateObj = Date.now();
			dateObj += $scope.destinationETA;
			// create a new Date object, using the adjusted time
			$scope.destinationETADate = new Date(dateObj);
			$scope.mydata.activeTripTimeOutFunction = setTimeout(function(){
				$scope.findWhereYouReached();
				
			}, $scope.timeout);
			$scope.displayTimeLeft(false);
			
			$scope.$emit('sendSMS','I have started for '+$scope.mydata.activeTrip.name+'. I am expected to reach there in'+$scope.mydata.timeLeft);
			$ionicPopup.alert({
			     title: 'Start my journey!',
			     template: 'I have started for '+$scope.mydata.activeTrip.name+'. I am expected to reach there in'+$scope.mydata.timeLeft
			   });
		}
		
	}
	
	
}])