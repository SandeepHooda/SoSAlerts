APP.CONTROLLERS.controller ('CTRL_SAVEDLOCATIONS',['$scope','dataRestore','$ionicPlatform','$state',
    function($scope,dataRestore,$ionicPlatform,$state){
	$scope.mydata = {};
	$scope.mydata.safeDistance = 500;
	$scope.updateSafeDistance = function(){
		window.localStorage.setItem('safeDistance', $scope.mydata.safeDistance);
	}
	
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
	
		$scope.foundLocation = function(position) {

			    var lat = position.coords.latitude;
			    var lon = position.coords.longitude;
			    var locationDetails = lat+ ',' +lon;
				var locationObj = {"name":$scope.mydata.locationName,"details":locationDetails} 
				 window.localStorage.setItem('Location'+$scope.mydata.myLocations.length, JSON.stringify(locationObj));
				
				 $scope.mydata.myLocations.push(locationObj);
				 $scope.refresh(); 
			    
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
			    
			 if (!$scope.mydata.mapType){
				 window.open('https://maps.mapmyindia.com/@'+userLocation,'_system');
			 }else{
				window.open('https://www.google.co.in/maps/@'+userLocationGoogle,'_system');
			 }
			   
		}
		//$ionicPlatform.ready( function() {
			$scope.mydata.safeDistance = parseInt(window.localStorage.getItem('safeDistance'));
			if (isNaN($scope.mydata.safeDistance)){
				$scope.mydata.safeDistance = 500;
			}
		//});
		
	}
])