APP.CONTROLLERS.controller ('CTRL_SAVEDLOCATIONS',['$scope','dataRestore','$ionicPlatform','$state','$ionicPopup',
    function($scope,dataRestore,$ionicPlatform,$state,$ionicPopup){
	$scope.record = function() {
		  dataRestore.record();
	}
	$scope.mydata = {};
	$scope.mydata.safeDistance = 500;
	$scope.updateSafeDistance = function(){
		window.localStorage.setItem('safeDistance', $scope.mydata.safeDistance);
	}
	
	$scope.deleteLocation = function (index) {
		var confirmPopup = $ionicPopup.confirm({
		     title: 'Delete location',
		     template: 'Are you sure you want to delete this location?'
		   });

		   confirmPopup.then(function(res) {
		     if(res) {
		    	 var locationObj = $scope.mydata.myLocations[index];
		    	//Delete all from sorage
					for (var i=0;i<$scope.mydata.myLocations.length;i++){
						window.localStorage.setItem('Location'+i, null);
					}
					
					if($scope.mydata.myLocations.length == 1){
						//Remove that location object from array
						$scope.mydata.myLocations = []
					}else {
						//Remove that location object from array
						$scope.mydata.myLocations.splice(index, 1);
					}
					
					
					//Store all fresh data
					for (var i=0;i<$scope.mydata.myLocations.length;i++){
						window.localStorage.setItem('Location'+i, JSON.stringify($scope.mydata.myLocations[i]));
					}
					
					$scope.refresh(); 
					window.geofence.remove(locationObj.name)
				    .then(function () {
				    	$ionicPopup.alert({
						     title: 'Geo fence deleted for',
						     template: locationObj.name
						   });
				    }
				    , function (reason){
				        
				    });
					
		     } 
		   });
		 
	    };
	$scope.refresh = function(){
		$scope.$emit('restoreLocations');
		setTimeout(function(){
			  $state.transitionTo('menu.tab.savedlocations');
			}, 1);
		  $state.transitionTo('menu.tab.home');
	} 
	
	$scope.mydata.myLocations = dataRestore.restoreSavedLocations();
	$scope.refresh();
	$scope.noLocation = function (){
		
		var confirmPopup = $ionicPopup.confirm({
		     title: 'Not able to locate you!',
		     template: 'Could not locate you. Please check if you gave location settings turned on or try again later. Do you want to check location settings now?'
		   });

		   confirmPopup.then(function(res) {
		     if(res) {
		    	 cordova.plugins.diagnostic.switchToLocationSettings();
		     } 
		   });
	}
		$scope.foundLocation = function(position) {

			    var lat = position.coords.latitude;
			    var lon = position.coords.longitude;
			    var locationDetails = lat+ ',' +lon;
				var locationObj = {"name":$scope.mydata.locationName,"details":locationDetails} 
				 window.localStorage.setItem('Location'+$scope.mydata.myLocations.length, JSON.stringify(locationObj));
				
				 $scope.mydata.myLocations.push(locationObj);
				 $scope.refresh(); 
				 
				 window.geofence.addOrUpdate({
					    id:             $scope.mydata.locationName,
					    latitude:       lat,
					    longitude:      lon,
					    radius:         3000,
					    transitionType: TransitionType.ENTER,
					    notification: {
					        id:             1,
					        title:          "Welcome To "+$scope.mydata.locationName,
					        text:           "Want to update family about this?",
					        openAppOnClick: true
					    }
					}).then(function () {
						$ionicPopup.alert({
						     title: 'Geo fence added for',
						     template: $scope.mydata.locationName
						   });
					}, function (reason) {
					    //alert('Adding geofence failed', reason);
					})
			    
			 }
		/*window.geofence.onTransitionReceived = function (geofences) {
		    geofences.forEach(function (geo) {
		    	var transitionType = 'Exiting'
		    	if (geo.transitionType == TransitionType.ENTER){
		    		transitionType = 'Entring';
		    	}
		    	$ionicPopup.alert({
				     title: transitionType,
				     template: geo.id
				   });
		     
		    });
		};*/
		 $scope.mydata.locationName = "";
		$scope.addThisLocation =function(){
			
			navigator.geolocation.getCurrentPosition($scope.foundLocation, $scope.noLocation, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
		}
		
		
		$scope.openLocation = function (index){
			
			 var location =  $scope.mydata.myLocations[index];
			 var userLocation = location.details;
			 var userLocationGoogle = userLocation+',15z';
			    
			 if (!$scope.mydata.mapType){
				 window.open('https://maps.mapmyindia.com/@'+userLocation,'_system');
			 }else{
				window.open('https://www.google.co.in/maps/@'+userLocationGoogle,'_system');
			 }
			   
		}
		//$ionicPlatform.ready( function() {
			$scope.mydata.safeDistance = parseInt(window.localStorage.getItem('safeDistance'));
			if (isNaN($scope.mydata.safeDistance) || $scope.mydata.safeDistance < 200 ){
				$scope.mydata.safeDistance = 500;
			}
		//});
		
	}
])