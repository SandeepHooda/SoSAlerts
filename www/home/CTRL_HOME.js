APP.CONTROLLERS.controller ('CTRL_HOME',['$scope','$cordovaSms','$cordovaFlashlight','$ionicPlatform','$rootScope','$cordovaMedia','dataRestore','$state','$ionicPopup',
    function($scope,$cordovaSms,$cordovaFlashlight,$ionicPlatform,$rootScope,$cordovaMedia,dataRestore,$state,$ionicPopup){
	
	$scope.name ="Sandeep";
	$scope.myData ={};
	$scope.userLocation ="";
	$scope.userLocationGoogle = "";
	
	$scope.myData.periodicAlerts = false;
	$scope.myData.redAlert = false;
	
	//Listen to period push
	$scope.periodicCheckBoxClicked = function(){
		if ($scope.myData.periodicAlerts){
			var mySettings = {};
			dataRestore.restoreSettings(mySettings);
			var activeContacts = dataRestore.getActiveContacts();
			navigator.geolocation.getCurrentPosition($scope.foundLocation, $scope.noLocation, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
			setTimeout(function(){
				$scope.sendPeriodicLocationUpdates(mySettings, activeContacts);
			}, 1000*mySettings.frequencyOfGreenAlerts);
			
		}
	}
	//listen to alert button
	$scope.toggleRedAlert = function(){
		if($scope.myData.redAlert){
			$scope.myData.redAlert = false;
			var confirmPopup = $ionicPopup.confirm({
			     title: 'Safe Mode',
			     template: 'Looks like everything is ok now. Do you want to turn of period green alerts?'
			   });

			   confirmPopup.then(function(res) {
			     if(res) {
			    	 $scope.myData.periodicAlerts = true;
			     } else {
			    	 $scope.myData.periodicAlerts = false;
			     }
			   });
			   
			
			
		}else {
			
			$scope.myData.redAlert = true;
			$scope.myData.periodicAlerts = false;// turn off period alerts as it is now emergency 
			var mySettings = {};
			dataRestore.restoreSettings(mySettings);
			var activeContacts = dataRestore.getActiveContacts();
			navigator.geolocation.getCurrentPosition($scope.foundLocation, $scope.noLocation, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
			setTimeout(function(){
				$scope.sendRedAlertSMS(mySettings, activeContacts);
			}, 1000*mySettings.frequencyOfRedAlerts);
			
			
		}
	}
 
	$scope.reachedSafely = function(){
		navigator.geolocation.getCurrentPosition($scope.foundLocation, $scope.noLocation, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
		setTimeout(function(){
			var settings = {};
			dataRestore.restoreSettings(settings);
			var activeContacts = dataRestore.getActiveContacts();
			var message =" I reached safely. My location is: "
			if (settings.mapType === 'googleMaps' || settings.mapType === 'bothMaps'){
				message += ' https://www.google.co.in/maps/@'+$scope.userLocationGoogle;
			}
			if (settings.mapType === 'mapMyIndia'  || settings.mapType === 'bothMaps'){
				message +=' https://maps.mapmyindia.com/@'+$scope.userLocation
			}
			
			if (activeContacts && activeContacts.length > 0){
				for (var i =0; i<activeContacts.length;i++ ){
					$scope.sendSMS (activeContacts[i].phone,activeContacts[i].relation+ message)
					$ionicPopup.alert({
					     title: 'SMS Sent!',
					     template: 'Phone #: '+activeContacts[i].phone +' Message: '+activeContacts[i].relation+ message
					   });
				}
			}
		}, 5000);
		
		
	}
	$scope.sendRedAlertSMS = function(settings, activeContacts){
		navigator.geolocation.getCurrentPosition($scope.foundLocation, $scope.noLocation, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
		var message =" I am in danger. My location is: "
		if (settings.mapType === 'googleMaps' || settings.mapType === 'bothMaps'){
			message += ' https://www.google.co.in/maps/@'+$scope.userLocationGoogle;
		}
		if (settings.mapType === 'mapMyIndia'  || settings.mapType === 'bothMaps'){
			message +=' https://maps.mapmyindia.com/@'+$scope.userLocation
		}
		
		if (activeContacts && activeContacts.length > 0){
			for (var i =0; i<activeContacts.length;i++ ){
				$scope.sendSMS (activeContacts[i].phone,activeContacts[i].relation+ message)
			}
		}
		if($scope.myData.redAlert){
			setTimeout(function(){
				$scope.sendRedAlertSMS(settings,activeContacts);
			}, 1000*settings.frequencyOfRedAlerts);
		}
		
	}
	
	/*$scope.fetchAndCacheMyLocation =function(){
		var settings = {};
		dataRestore.restoreSettings(settings);
		setTimeout(function(){
			navigator.geolocation.getCurrentPosition($scope.foundLocation, $scope.noLocation, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
			$scope.fetchAndCacheMyLocation();
		}, 1000*60*settings.cacheMyLocationFrequency);
	}
	$scope.fetchAndCacheMyLocation();*/
	$scope.sendPeriodicLocationUpdates = function(settings, activeContacts){
		navigator.geolocation.getCurrentPosition($scope.foundLocation, $scope.noLocation, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
		var message =" I am doing good. My location is: "
		if (settings.mapType === 'googleMaps'  || settings.mapType === 'bothMaps'){
			message += ' https://www.google.co.in/maps/@'+$scope.userLocationGoogle;
		}
		if (settings.mapType === 'mapMyIndia' || settings.mapType === 'bothMaps'){
			message +=' https://maps.mapmyindia.com/@'+$scope.userLocation
		}
		
		if (activeContacts && activeContacts.length > 0){
			for (var i =0; i<activeContacts.length;i++ ){
				$scope.sendSMS (activeContacts[i].phone,activeContacts[i].relation+ message)
			}
		}
		if($scope.myData.periodicAlerts){
			setTimeout(function(){
				$scope.sendPeriodicLocationUpdates(settings,activeContacts);
			}, 1000*60*settings.frequencyOfGreenAlerts);
		}
		
	}
	
	$scope.changerJustUnplugged = false;
	$scope.batterylevel =0;
	//Listen to unplug event
	$rootScope.$on("$cordovaBatteryStatus:status", function(event, args) {
         
		//1. If phone is plugged and there was any red alert shut that down. How can some one chnage a phone when in danger.
		 if (args.isPlugged){
        	if ($scope.myData.redAlert ){
            	 $scope.toggleRedAlert();
             }
         }
         
         //2. Find out if charger just unplugged
          if(args.isPlugged){
        	  $scope.changerJustUnplugged = false;
        	  
          }else {
        	 if ($scope.batterylevel > 0 && args.level >= $scope.batterylevel){//check $scope.batterylevel > 0 so that alert is not fired on app start
        		  $scope.changerJustUnplugged = true; 
        	  }else {
        		  $scope.changerJustUnplugged = false;
        	  }
          }
          $scope.batterylevel = args.level;
          
          //3. check if alerts needs to be fired
          $scope.useChargerUnplugEvent = dataRestore.getFromCache("useChargerUnplugEvent",'boolean');
         if($scope.changerJustUnplugged && !$scope.myData.redAlert && $scope.useChargerUnplugEvent ) {//When every thing was ok and you unplugged the phone to signal danger
        	 navigator.geolocation.getCurrentPosition($scope.inspectLocation, $scope.fireRedAlert, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
        	 
        }
         
     });
	 
	$scope.fireRedAlert = function() {
		$scope.toggleRedAlert();
   	 	$state.transitionTo('tab.home');
   	 	dataRestore.saveInCache("useChargerUnplugEvent", false);//So that charger fault (charger that gets plugged and unplugged frequently) don't effect application
	}
	$scope.inspectLocation = function(position) {
		var lat = position.coords.latitude;
	    var lon = position.coords.longitude;
	    if(!$scope.LocationInSafeZone(lat,lon)){
	    	$scope.fireRedAlert();
	    }else {
	    	$ionicPopup.alert({
			     title: 'Charger unplugged!',
			     template: 'Charger unplug detected. Not sending SOS alerts at this time because you are in safe zone. If you still want to send alerts press red colored "Help" button.'
			   });
	    	
	    }
	}
	$scope.LocationInSafeZone = function(lat,lon) {
		var withInSafeZone = false;
		
		var safeDistance = dataRestore.getFromCache('safeDistance', 'number');
		if (safeDistance === 0){
			safeDistance = 500;
		}
		$scope.myData.myLocations = dataRestore.restoreSavedLocations();
		for (var i=0; i<$scope.myData.myLocations.length;i++){
			var location = $scope.myData.myLocations[i].details;
			location = location.split(",");
			if ($scope.getDistanceFromLatLonInMeters(lat,lon,parseFloat(location[0]),parseFloat(location[1])) < safeDistance ){
				withInSafeZone = true;
				break;
			}
		}
		
		return withInSafeZone;
	}
	 $scope.getDistanceFromLatLonInMeters = function(lat1,lon1,lat2,lon2) {
		  var R = 6371; // Radius of the earth in km
		  var dLat = $scope.deg2rad(lat2-lat1);  // deg2rad below  
		  var dLon = $scope.deg2rad(lon2-lon1); 
		  var a = 
		    Math.sin(dLat/2) * Math.sin(dLat/2) +
		    Math.cos($scope.deg2rad(lat1)) * Math.cos($scope.deg2rad(lat2)) * 
		    Math.sin(dLon/2) * Math.sin(dLon/2)
		    ; 
		  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		  var d = R * c*1000; // Distance in meters
		  return d;
		}

	$scope.deg2rad = function (deg) {
		  return deg * (Math.PI/180)
	}
	var activeContacts = dataRestore.getActiveContacts();
	if (activeContacts.length <=0){
		$ionicPopup.alert({
		     title: 'No Contact details!',
		     template: 'Please add contacts details so that we can send them your updates, when required.'
		   });
		$state.transitionTo('tab.contacts');
	}
	
	
	$scope.sendSMS = function(phoneNumber, message) {
		//alert(phoneNumber + message);
		var options = {
			    replaceLineBreaks: false, // true to replace \n by a new line, false by default
			    android: {
			      intent: '' // send SMS with the native android SMS messaging
			        //intent: '' // send SMS without open any other app
			        //intent: 'INTENT' // send SMS inside a default SMS app
			    }
			  };
		$cordovaSms.send(phoneNumber, message, options)
	      .then(function() {
	      }, function(error) {
	      });
	  }
	
	
	$ionicPlatform.ready( function() {
		
		// Enable background mode
		cordova.plugins.backgroundMode.enable();
		cordova.plugins.autoStart.enable(); 
		
		//Ask for location permission from user
		navigator.geolocation.getCurrentPosition(function(){}, $scope.noLocation, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
		
		//turn on location if off
		 
		cordova.plugins.diagnostic.isLocationAvailable(function(available){
				   if(!available){
					   $ionicPopup.alert({
						     title: 'Not able to locate you!',
						     template: 'Please trun on location settings and allow app to access it.'
						   });
					   
					  if ('true' === window.localStorage.getItem("userGaveLocationPermission")){//user gave access some time back but now location is not availabe
						   //probably cause is user turned off his location , another reason could be used revoked permission for app 
						 cordova.plugins.diagnostic.switchToLocationSettings(); 
						}
				 }else{
					 window.localStorage.setItem("userGaveLocationPermission",'true');// When use gave access to location save his agrement
					 
				 }
				}, function(error){
				    alert("The following error occurred while trying to retrive location: "+error);
		});
			
			//setTimeout(function(){}, 2000);
		
		
       
		
		
		 
		  
		 
		  
		});
	
	
	 $scope.foundLocation = function(position) {

	    var lat = position.coords.latitude;
	    var lon = position.coords.longitude;
	    $scope.userLocation = lat + ',' + lon;
	    $scope.userLocationGoogle = $scope.userLocation+',15z';
	    //window.open('https://www.google.co.in/maps/@'+$scope.userLocationGoogle,'_system');
	    //window.open('https://maps.mapmyindia.com/@'+$scope.userLocation,'_system');
	 }
	  $scope.noLocation = function() {
		  
	  }
	  /*$scope.mapMe = function(){
			cordova.plugins.diagnostic.isLocationAvailable(function(available){
			   if(!available){
				   cordova.plugins.diagnostic.switchToLocationSettings();
			   }else{
				   navigator.geolocation.getCurrentPosition($scope.foundLocation, $scope.noLocation, {maximumAge:60000, timeout:5000, enableHighAccuracy:true}); 
			   }
			}, function(error){
			    console.error("The following error occurred: "+error);
			});
			
			
		}*/
	  /*$scope.sendEmail = function(){
		  cordova.plugins.diagnostic.isLocationAvailable(function(available){
			   if(!available){
				   cordova.plugins.diagnostic.switchToLocationSettings();
			   }else{
				   navigator.geolocation.getCurrentPosition($scope.emailWithLocation, noLocation, {maximumAge:60000, timeout:5000, enableHighAccuracy:true}); 
			   }
			}, function(error){
			    console.error("The following error occurred: "+error);
			});
		  
		  
	  }
	$scope.emailWithLocation = function(position){
		 var lat = position.coords.latitude;
		    var lon = position.coords.longitude;
		    $scope.userLocation = lat + ',' + lon;
		    $scope.userLocationGoogle = $scope.userLocation+',15z';
		    //cordova plugin add https://github.com/katzer/cordova-plugin-email-composer.git#0.8.2
		cordova.plugins.email.open({
		    to:      'sonu.hooda@gmail.com',
		    subject: 'Save me',
		    body:    'Map my india Maps '+'https://maps.mapmyindia.com/@'+$scope.userLocation +'<br/>'+'Google maps '+'https://www.google.co.in/maps/@'+$scope.userLocationGoogle
		});
	}  
	$scope.mapMe = function(){
		cordova.plugins.diagnostic.isLocationAvailable(function(available){
		   if(!available){
			   cordova.plugins.diagnostic.switchToLocationSettings();
		   }else{
			   navigator.geolocation.getCurrentPosition(foundLocation, noLocation, {maximumAge:60000, timeout:5000, enableHighAccuracy:true}); 
		   }
		}, function(error){
		    console.error("The following error occurred: "+error);
		});
		
		
	}
	  var onShake = function () {
		  $cordovaFlashlight.toggle()
		    .then(
		      function (success) {  },
		      function (error) {  });
		 
		  //alert('Stop shaking me');
		};

		var onError = function () {
		  // Fired when there is an accelerometer error (optional)
		};

		$scope.enableShake =function(){
			// Start watching for shake gestures and call "onShake"
			// with a shake sensitivity of 40 (optional, default 30)
			shake.startWatch(onShake, 40 );
		}
		
		$scope.disableShake =function(){
			// Stop watching for shake gestures
			shake.stopWatch();
		}*/
	  /*$scope.addFence = function(){
		window.geofence.addOrUpdate({
		    id:             "Home", //A unique identifier of geofence
		    latitude:       Number, //Geo latitude of geofence
		    longitude:      Number, //Geo longitude of geofence
		    radius:         Number, //Radius of geofence in meters
		    transitionType: Number, //Type of transition 1 - Enter, 2 - Exit, 3 - Both
		    notification: {         //Notification object
		        id:             Number, //optional should be integer, id of notification
		        title:          String, //Title of notification
		        text:           String, //Text of notification
		        smallIcon:      String, //Small icon showed in notification area, only res URI
		        icon:           String, //icon showed in notification drawer
		        openAppOnClick: Boolean,//is main app activity should be opened after clicking on notification
		        vibration:      [Integer], //Optional vibration pattern - see description
		        data:           Object  //Custom object associated with notification
		    }
		}).then(function () {
		    console.log('Geofence successfully added');
		}, function (reason) {
		    console.log('Adding geofence failed', reason);
		});
	}
	
	window.geofence.initialize().then(function () {
	        console.log("Successful initialization");
	    }, function (error) {
	        console.log("Error", error);
	    });
	*/
		
	}
])