APP.CONTROLLERS.controller ('CTRL_SAVEDLOCATIONS',['$scope','dataRestore','$ionicPlatform','$state',
    function($scope,dataRestore,$ionicPlatform,$state){
	$scope.mydata = {};
		/*$ionicPlatform.ready( function() {
			$scope.restoreFromStorage();
		});*/
	
	$scope.mydata.myLocations = []	
		document.addEventListener('deviceready', function () {
		    // window.geofence is now available
		    window.geofence.initialize().then(function () {
		        console.log("Successful initialization");
		    }, function (error) {
		        console.log("Error", error);
		    });
		}, false);
		
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
		
		 $scope.foundLocation = function(position) {

			    var lat = position.coords.latitude;
			    var lon = position.coords.longitude;
			    $scope.userLocation = lat + ',' + lon;
			    $scope.userLocationGoogle = $scope.userLocation+',15z';
			    window.geofence.addOrUpdate({
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
				  $scope.mydata.myLocations.push({"name":$scope.mydata.locationName,"lat":lat,"lon":lon});
				  setTimeout(function(){
					  $state.transitionTo('tab.savedlocations');
					}, 1);
				  $state.transitionTo('tab.home');
				  
				  
				}, function (reason) {
				    alert('Adding geofence failed'+reason);
				});
			    
			 }
		 $scope.mydata.locationName = "";
		$scope.addThisLocation =function(){
			//cordova plugin add https://github.com/cowbell/cordova-plugin-geofence
			
			navigator.geolocation.getCurrentPosition($scope.foundLocation, function(){}, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
		}
		
		$scope.openLocation = function (index){
			
			 var location =  $scope.mydata.myLocations[index];
			 var userLocation = location.lat + ',' + location.lon;
			 var userLocationGoogle = $scope.userLocation+',15z';
			    window.open('https://www.google.co.in/maps/@'+userLocationGoogle,'_system');
			    //window.open('https://maps.mapmyindia.com/@'+userLocation,'_system');
		}
	}
])