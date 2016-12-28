APP.CONTROLLERS.controller ('CTRL_SAVEDLOCATIONS',['$scope','dataRestore','$ionicPlatform','$state',
    function($scope,dataRestore,$ionicPlatform,$state){
	$scope.mydata = {};
		/*$ionicPlatform.ready( function() {
			$scope.restoreFromStorage();
		});*/
	
	$scope.deleteLocation = function (index) {
		var r = confirm("Are you sure you want to delete this location?");
		if (r == true) {
			//Delete all from sorage
			for (var i=0;i<$scope.mydata.myLocations.length;i++){
				window.localStorage.setItem('Location'+i, null);
			}
			//Remove that location object from array
			$scope.mydata.myLocations.splice(index, 1);
			
			//Store all fresh data
			for (var i=0;i<$scope.mydata.myLocations.length;i++){
				window.localStorage.setItem('Location'+i, JSON.stringify($scope.mydata.myLocations[i]));
			}
			
			$scope.refresh(); 
		} 
	    };
	$scope.refresh = function(){
		setTimeout(function(){
			  $state.transitionTo('tab.savedlocations');
			}, 1);
		  $state.transitionTo('tab.home');
	} 
	
	$scope.mydata.myLocations = dataRestore.restoreSavedLocations();
	$scope.refresh();
	
		/*document.addEventListener('deviceready', function () {
		    // window.geofence is now available
		    window.geofence.initialize().then(function () {
		        console.log("Successful initialization");
		    }, function (error) {
		        console.log("Error", error);
		    });
		}, false);*/
		
		
		
		 $scope.foundLocation = function(position) {

			    var lat = position.coords.latitude;
			    var lon = position.coords.longitude;
			    var locationDetails = lat+ ',' +lon;
				var locationObj = {"name":$scope.mydata.locationName,"details":locationDetails} 
				 window.localStorage.setItem('Location'+$scope.mydata.myLocations.length, JSON.stringify(locationObj));
				
				 $scope.mydata.myLocations.push(locationObj);
				 $scope.refresh(); 
			    
			    
			   /* window.geofence.addOrUpdate({
				    id:             $scope.mydata.locationName, //A unique identifier of geofence
				    latitude:       lat, //Geo latitude of geofence
				    longitude:      lon, //Geo longitude of geofence
				    radius:         50, //Radius of geofence in meters
				    transitionType: TransitionType.BOTH, //Type of transition 1 - Enter, 2 - Exit, 3 - Both
				    notification: {         //Notification object
				        id:             1, //optional should be integer, id of notification
				        title:          $scope.mydata.locationName, //Title of notification
				        text:           'Entering or exiting', //Text of notification
				       
				        openAppOnClick: true,//is main app activity should be opened after clicking on notification
				        
				       
				    }
				}).then(function () {
					
				  
				}, function (reason) {
				    alert('Adding geofence failed'+reason);
				});*/
			    
			 }
		 $scope.mydata.locationName = "";
		$scope.addThisLocation =function(){
			//cordova plugin add https://github.com/cowbell/cordova-plugin-geofence
			navigator.geolocation.getCurrentPosition($scope.foundLocation, function(){}, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
		}
		
		$scope.openLocation = function (index){
			
			 var location =  $scope.mydata.myLocations[index];
			 var userLocation = location.details;
			 var userLocationGoogle = userLocation+',15z';
			    //window.open('https://www.google.co.in/maps/@'+userLocationGoogle,'_system');
			    window.open('https://maps.mapmyindia.com/@'+userLocation,'_system');
		}
		
		/*window.geofence.getWatched().then(function (geofencesJson) {
	    var geofences = JSON.parse(geofencesJson);
	    alert(geofences);
	    console.log(geofences);
		});*/
	
	/*window.geofence.onTransitionReceived = function (geofences) {
	    geofences.forEach(function (geo) {
	        console.log('Geofence transition detected', geo);
	        alert('Geofence transition detected'+ geo);
	    });
	};*/
	}
])