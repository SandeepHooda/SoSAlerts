APP.CONTROLLERS.controller ('CTRL_StartTrip',['$scope','$state','$ionicPlatform','dataRestore','$ionicPopup',
    function($scope,$state,$ionicPlatform,dataRestore,$ionicPopup){
	
	setTimeout(function(){
		$state.transitionTo('tab.starttrip');	
	},100)
	$state.transitionTo('tab.home');
	$scope.locationNotFoundAlert = 0;
	$scope.mydata = {};
	$scope.mydata.activeTrip = null;
	$scope.mydata.activeTripTimeOutFunction = null;
	$scope.mydata.timeToDest = [];
	$scope.mydata.times= ["15 Minutes","30 minutes","45 minutes", "1 hour","2 Hour","3 Hour","4 Hour","5 Hour","6 Hour","7 Hour","8 Hour"];
	$scope.mydata.TimeArray =[];
	$scope.mydata.myLocations = dataRestore.restoreSavedLocations();
		//[{"name":"Home"},{"name":"Home"},{"name":"Home"},{"name":"Home"},{"name":"Home"},{"name":"Home"},{"name":"Home"},{"name":"Home"},{"name":"Home"},{"name":"Home"},{"name":"Home"},{"name":"Home"},{"name":"Home"},{"name":"Home"},{"name":"Home"},{"name":"Home"}]
	
	for (var i=0;i<$scope.mydata.myLocations.length;i++){
		$scope.mydata.myLocations[i].times = $scope.mydata.times.slice(0);
	}
	
	
	
	$scope.startTrip = function(location,locationName, select,btn){
		$scope.mydata.activeTrip = location;
		location.trip = true;
		locationName.addClass('selectedgreen');
		select.addClass('selectedgreen');
		btn.addClass('selectedgreen');
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
	
	$scope.checkIfLocationisInLimit = function(position){
		var lat = position.coords.latitude;
	    var lon = position.coords.longitude;
	    var safeDistance = dataRestore.getFromCache('safeDistance', 'number');
		if (safeDistance === 0){
			safeDistance = 500;
		}
		
		
		var location = $scope.mydata.activeTrip.details;
		location = location.split(",");
		if (dataRestore.getDistanceFromLatLonInMeters(lat,lon,parseFloat(location[0]),parseFloat(location[1])) < safeDistance ){
			$scope.$emit('sendSMS',"I reached "+$scope.mydata.activeTrip.name+" safely.");
			$ionicPopup.alert({
			     title: 'In Safe zone!',
			     template: 'Glad to know that you reached '+$scope.mydata.activeTrip.name+' safely'
			   });
			$scope.markSelected(-1);//Remove green from all trips as the trips is completed successfully
		}else{
			$scope.$emit('sendSMS',"I am running late for "+$scope.mydata.activeTrip.name+" Please call. ");
			var index = $scope.mydata.activeTrip.index;
			//$scope.markSelected(-1);//Remove green from all trips - we need to mark this red
			$scope.markRed(index);
			$scope.mydata.activeTripTimeOutFunction = setTimeout(function(){
				$scope.timeoutTriggered();
			}, 60*1000);
		}
			
			
	   
	    
	    
	}
	$scope.timeoutTriggered = function(){
		$scope.mydata.activeTripTimeOutFunction = null;//time out triggered to make this variable null as it do not mean anything
		navigator.geolocation.getCurrentPosition($scope.checkIfLocationisInLimit,$scope.retryLocationFind, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
	}
	$scope.retryLocationFind = function(){//Retry after a minute
		$scope.locationNotFoundAlert ++;
		if ($scope.locationNotFoundAlert == 1){
			$ionicPopup.alert({
			     title: 'Location not found!',
			     template: 'Sorry to say that could not found your current location. If you have accedenly turned off location please turn that on.'
			   });
		}
		
		$scope.mydata.activeTripTimeOutFunction = setTimeout(function(){
			$scope.timeoutTriggered();
		}, 60*1000);
	}
	$scope.monitorActiveTrip = function(){
		//1. clear previous time ous if any before setting new one
		if ($scope.mydata.activeTripTimeOutFunction != null){
			clearTimeout($scope.mydata.activeTripTimeOutFunction);
		}
		
		//2. if active trip exist set a new time out function
		if ($scope.mydata.activeTrip != null){
			var timeToDestination = parseInt($scope.mydata.activeTrip.time);
			if (timeToDestination >= 15){//15 canot be hours it is minutes
				timeToDestination *= 1000*60; 
			}else{ //time in hours
				timeToDestination *= 1000*60*60; 
			}
			$scope.mydata.activeTripTimeOutFunction = setTimeout(function(){
				$scope.timeoutTriggered();
				
			}, timeToDestination);
		}
		
	}
	
	
}])