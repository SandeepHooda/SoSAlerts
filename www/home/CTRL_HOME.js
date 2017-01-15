APP.CONTROLLERS.controller ('CTRL_HOME',['$scope','$cordovaSms','$cordovaFlashlight','$ionicPlatform','$rootScope','$cordovaMedia','dataRestore','$state','$ionicPopup','$http','nfcService','$cordovaDeviceMotion',
    function($scope,$cordovaSms,$cordovaFlashlight,$ionicPlatform,$rootScope,$cordovaMedia,dataRestore,$state,$ionicPopup,$http, nfcService,$cordovaDeviceMotion){
	//cordova plugin add phonegap-nfc 
	//cordova plugin add cordova-plugin-vibration
	//cordova plugin add https://github.com/katzer/cordova-plugin-email-composer.git#0.8.2
	//cordova plugin add https://github.com/cowbell/cordova-plugin-geofence
	//cordova plugin add cordova-plugin-vibration
	//cordova plugin add cordova-plugin-device-motion
	//cordova plugin add cordova-plugin-whitelist
	//cordova plugin add cordova-plugin-shake
	//cordova plugin add cordova-plugin-sms
	//cordova plugin add cordova-plugin-android-permissions@0.6.0
	//cordova plugin add cordova-plugin-tts
	//cordova plugin add https://github.com/macdonst/SpeechRecognitionPlugin org.apache.cordova.speech.speechrecognition
	//cordova plugin add https://github.com/SandeepHooda/Speachrecognization org.apache.cordova.speech.speechrecognition
	//cordova plugin add https://github.com/katzer/cordova-plugin-background-mode.git
	//cordova plugin add cordova-plugin-whitelist
	
	$scope.name ="Sandeep";
	$scope.myData ={};
	$scope.userLocation ="";
	$scope.userLocationGoogle = "";
	$scope.tag = nfcService.tag;
	
	$scope.data = {
		    speechText: ''
		  };
		  $scope.recognizedText = '';
		 
		  
	
	

	//function to call when shake occurs
	$scope.shakeEventRedAlert = function() {
		if($scope.myData.redAlert) return;
		$scope.myData.redAlert = true;
		$scope.redAlertOn();
		$scope.$apply();
        //console#.log('shake!');
	}
	
	$scope.myShakeEvent = new Shake({
	    threshold: 15, // optional shake strength threshold
	    timeout: 1000 // optional, determines the frequency of event generation
	});
	$scope.registerShake = function() {
		if ($scope.shakeEventRegistered) return;
		window.addEventListener('shake', $scope.shakeEventRedAlert, false);
		$scope.myShakeEvent.start();
		//console#.log('shake Registered!');
	}
	
	$scope.deRegisterShake = function() {
		if (!$scope.shakeEventRegistered) return;
		window.removeEventListener('shake', $scope.shakeEventRedAlert, false);
		$scope.myShakeEvent.stop();
		//console#.log('shake de-Registered!');
	}
	$scope.shakeEventRegistered =dataRestore.getFromCache('listenShakeEvent', 'boolean');
	if($scope.shakeEventRegistered){
		$scope.registerShake();
	}

	$rootScope.$on('settingsChanged',function(event, data){
		$scope.myShakeEvent.options.threshold = dataRestore.getFromCache('shakeIntensity', 'number');
		$scope.deRegisterShake();
		$scope.shakeEventRegistered = false;
		if(dataRestore.getFromCache('listenShakeEvent', 'boolean') && !$scope.shakeEventRegistered){
			$scope.registerShake();
			$scope.shakeEventRegistered = true;
			
		}else if($scope.shakeEventRegistered) {
			$scope.deRegisterShake();
			$scope.shakeEventRegistered = false;
		}
	});
	
	//Device shake mode
	// watch Acceleration options
	/*$scope.options = { 
	    frequency: 100, // Measure every 100ms
	    deviation : 25  // We'll use deviation to determine the shake event, best values in the range between 25 and 30
	};
	 
	// Current measurements
	$scope.measurements = {
	    x : null,
	    y : null,
	    z : null,
	    timestamp : null
	}
	 
	// Previous measurements    
	$scope.previousMeasurements = {
	    x : null,
	    y : null,
	    z : null,
	    timestamp : null
	}
	// Watcher object
    $scope.watch = null;
	//Start Watching method
	$scope.startWatching = function() {     
		 //console#.log('Start watching');
	    // Device motion configuration
	    $scope.watch = $cordovaDeviceMotion.watchAcceleration($scope.options);
	 
	    // Device motion initilaization
	    $scope.watch.then(null, function(error) {
	        //console#.log('Error in shake '+error);
	    },function(result) {
	 
	        // Set current data  
	        $scope.measurements.x = result.x;
	        $scope.measurements.y = result.y;
	        $scope.measurements.z = result.z;
	        $scope.measurements.timestamp = result.timestamp;                 
	 
	        // Detecta shake  
	        $scope.detectShake(result);  
	 
	    });     
	};  
	$scope.startWatching();
	// Stop watching method
	$scope.stopWatching = function() {  
	    $scope.watch.clearWatch();
	} 
	
	// Detect shake method      
	$scope.detectShake = function(result) { 
		 //console#.log('detect shake...');
	    //Object to hold measurement difference between current and old data
	    var measurementsChange = {};
	 
	    // Calculate measurement change only if we have two sets of data, current and old
	    if ($scope.previousMeasurements.x !== null) {
	        measurementsChange.x = Math.abs($scope.previousMeasurements.x, result.x);
	        measurementsChange.y = Math.abs($scope.previousMeasurements.y, result.y);
	        measurementsChange.z = Math.abs($scope.previousMeasurements.z, result.z);
	    }
	 
	    // If measurement change is bigger then predefined deviation
	    if (measurementsChange.x + measurementsChange.y + measurementsChange.z > $scope.options.deviation) {
	        $scope.stopWatching();  // Stop watching because it will start triggering like hell
	        //console#.log('Shake detected'); // shake detected
	        setTimeout($scope.startWatching(), 1000);  // Again start watching after 1 sec
	 
	        // Clean previous measurements after succesfull shake detection, so we can do it next time
	        $scope.previousMeasurements = { 
	            x: null, 
	            y: null, 
	            z: null
	        }               
	 
	    } else {
	        // On first measurements set it as the previous one
	        $scope.previousMeasurements = {
	            x: result.x,
	            y: result.y,
	            z: result.z
	        }
	    }           
	 
	}  */
	
	$scope.myData.demoActionTaken = dataRestore.getFromCache("demoActionTaken",'boolean');;
	$scope.demoActionTaken = function(){
		$scope.myData.demoActionTaken = true;
		dataRestore.saveInCache("demoActionTaken",true);
	}
	$scope.myData.showDemo = false;
	$scope.showDemo = function () {
		$scope.myData.showDemo = true;
		setTimeout(function(){
			$scope.myData.showDemo = false;
			$scope.$apply();
			
		}, 1000*60*2);
	};
	$scope.skipDemo = function () {
		$scope.myData.showDemo = false;
		
	};
    
	/*function onNfc(nfcEvent) {
	    // display the tag as JSON
	    alert(JSON.stringify(nfcEvent.tag));
	}
	function success(result) {
	    //console#.log("Listening for NFC Messages");
	}
	function failure(reason) {
	    alert("Failed to add NDEF listener");
	}
	nfc.addNdefListener(onNfc, success, failure);
*/
	
	$scope.myData.periodicAlerts = false;
	$scope.myData.redAlert = false;
	
	$scope.vibrate = function(){
		
		navigator.vibrate(1000);
	}
	//Listen to period push
	$scope.periodicCheckBoxClicked = function(){
		 //nfcService.writeData();
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
	
	$scope.redAlertOff = function(){
		$scope.myData.redAlert = false;
		dataRestore.saveInCache('redAlert',$scope.myData.redAlert);
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
	}
	$scope.redAlertOn = function(){
		$scope.myData.redAlert = true;
		dataRestore.saveInCache('redAlert',$scope.myData.redAlert);
		
		$scope.myData.periodicAlerts = false;// turn off period alerts as it is now emergency 
		var mySettings = {};
		dataRestore.restoreSettings(mySettings);
		var activeContacts = dataRestore.getActiveContacts();
		navigator.geolocation.getCurrentPosition($scope.foundLocation, $scope.noLocation, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
		setTimeout(function(){
			$scope.sendRedAlertSMS(mySettings, activeContacts);
		}, 1000*mySettings.frequencyOfRedAlerts);
	}
	//listen to alert button
	$scope.toggleRedAlert = function(){
		if($scope.myData.redAlert){
			$scope.redAlertOff();   
		}else {
			$scope.redAlertOn();
			
		}
	}
 
	$rootScope.$on('sendSMS',function(event, data){
		$scope.reachedSafelyWithMessage(data, false, false);
	});
	
	$scope.reachedSafelyWithMessage = function(messagePassed, showConfirmationAlert, appendLocationName){
		navigator.geolocation.getCurrentPosition($scope.foundLocation, $scope.noLocation, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
		setTimeout(function(){
			var settings = {};
			dataRestore.restoreSettings(settings);
			var activeContacts = dataRestore.getActiveContacts();
			
			var message = null;
				if (messagePassed == null){
					message =" I reached safely. My location is: "
				}else{
					message = messagePassed;
				}
			if ($scope.userLocation && $scope.userLocation.indexOf(",") > 0){
				var location = $scope.userLocation.split(",");
				var findLocation = $scope.LocationInSafeZone(parseFloat(location[0]), parseFloat(location[1]));
				
				if (findLocation.withInSafeZone && messagePassed === ''){
					message = "I reached "+findLocation.NameOfLocation+" safely. My location is: "
				}
			}
			
			
			if (settings.mapType === 'googleMaps' || settings.mapType === 'bothMaps'){
				message += ' https://www.google.co.in/maps/@'+$scope.userLocationGoogle;
			}
			if (settings.mapType === 'mapMyIndia'  || settings.mapType === 'bothMaps'){
				message +=' https://maps.mapmyindia.com/@'+$scope.userLocation
			}
			
			if (activeContacts && activeContacts.length > 0){
				for (var i =0; i<activeContacts.length;i++ ){
					if (appendLocationName){
						$scope.sendSMS (activeContacts[i].phone,activeContacts[i].relation+ message, showConfirmationAlert);
					}else{
						$scope.sendSMSWithLocationName (activeContacts[i].phone,activeContacts[i].relation+ message, showConfirmationAlert, '');
					}
					
				}
			}
			
		}, 2000);
		
	}
	
	$scope.reachedSafely = function(){
		
		$scope.reachedSafelyWithMessage(null,true, true);	
		
	}
	$scope.sendRedAlertSMS = function(settings, activeContacts){
		//console#.log(" Sending Red alert")
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
				$scope.sendSMS (activeContacts[i].phone,activeContacts[i].relation+ message, false)
			}
		}
		if(dataRestore.getFromCache('redAlert','boolean')){
			//console#.log(" Setting time out for Sending Red alert")
			setTimeout(function(){
				$scope.sendRedAlertSMS(settings,activeContacts);
			}, 1000*settings.frequencyOfRedAlerts);
		}else {
			//console#.log(" Canceling Red alert")
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
				$scope.sendSMS (activeContacts[i].phone,activeContacts[i].relation+ message, false)
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
        	 /*$scope.RedAlertFiredAfterUnplug = false;
        	 shake.startWatch($scope.watchFoShake, 40 );
        	 setTimeout(function(){//User must shake phone with in five minutes
        		 $scope.RedAlertFiredAfterUnplug = false;
        		 shake.stopWatch(); 
        	 }, 1000*60*5);*/
        }
         
     });
	$scope.RedAlertFiredAfterUnplug = false;
	$scope.watchFoShake = function(){
		if(!$scope.RedAlertFiredAfterUnplug){
			$scope.RedAlertFiredAfterUnplug = true;
			$scope.fireRedAlert();
		}
		
	}
	$scope.fireRedAlert = function() {
		$scope.toggleRedAlert();
   	 	$state.transitionTo('menu.tab.home');
   	 	dataRestore.saveInCache("useChargerUnplugEvent", false);//So that charger fault (charger that gets plugged and unplugged frequently) don't effect application
	}
	$scope.inspectLocation = function(position) {
		var lat = position.coords.latitude;
	    var lon = position.coords.longitude;
	    var foundLocation = $scope.LocationInSafeZone(lat,lon);
	    if(!foundLocation.withInSafeZone){
	    	$http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+","+lon+'&key='+dataRestore.getGoogleKeyforLocationSrv()).then(function(response){
				if (response.data.status == 'OK'){
					$ionicPopup.alert({
					     title: 'Charger unplugged!',
					     template: 'Your location : '+response.data.results[0].formatted_address +" lat lon : "+lat+","+lon
					   });
				}
				
	    	},function(response){
					
			});
	    	$scope.fireRedAlert();
	    }else {
	    	$state.transitionTo('menu.tab.home');
	    	$ionicPopup.alert({
			     title: 'Charger unplugged!',
			     template: 'Charger unplug detected. Not sending SOS alerts at this time because you are at '+foundLocation.NameOfLocation+'. If you still want to send alerts press red colored "Help" button.'
			   });
	    	
	    }
	}
	$scope.LocationInSafeZone = function(lat,lon) {
		
		var withInSafeZone = {"withInSafeZone":false, "NameOfLocation":""};
		
		var safeDistance = dataRestore.getFromCache('safeDistance', 'number');
		if (safeDistance === 0){
			safeDistance = 500;
		}
		$scope.myData.myLocations = dataRestore.restoreSavedLocations();
		for (var i=0; i<$scope.myData.myLocations.length;i++){
			var location = $scope.myData.myLocations[i].details;
			location = location.split(",");
			if ($scope.getDistanceFromLatLonInMeters(lat,lon,parseFloat(location[0]),parseFloat(location[1])) < safeDistance ){
				withInSafeZone.withInSafeZone = true;
				withInSafeZone.NameOfLocation = $scope.myData.myLocations[i].name;
				break;
			}
		}
		return withInSafeZone;
	}
	$scope.speakText = function(){
		
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
		$scope.data.speechText = "Welcome and thanks for letting me help you. Please add your contact details here. Make sure you have atleast one contact detail here and that is not marked inactive. Also don't forget to save your location from My Locations page, when you are at home and when you are at work."
		
		setTimeout(function(){
			$scope.$apply();
			$scope.speakText();
			$state.transitionTo('menu.contacts');
		}, 5000);
		
		
	}else {
		$scope.data.speechText = " Welcome again, thanks for letting me help you."
			setTimeout(function(){
				var welcomeMsg = window.localStorage.getItem("playWelcomeMessage");
				if(welcomeMsg == 'true'){
					$scope.$apply();
					$scope.speakText();
				}
				
				if (window.localStorage.getItem("settingPageVisited") == null){
					setTimeout(function(){
						$scope.data.speechText = "Please visit settings page by clicking Hamburger icon on top left side of page, and then click settings. Please make sure you have the right settings that works best for you.";
						$scope.$apply();
						$scope.speakText();
					},7000);
					
				}
			}, 1000);
	}
	
		
	$scope.sendSMSWithLocationName = function(phoneNumber, message, showConfirmationAlert,locationName){
		message += ' '+locationName
		var options = {
			    replaceLineBreaks: false, // true to replace \n by a new line, false by default
			    android: {
			      intent: '' // send SMS with the native android SMS messaging
			        //intent: '' // send SMS without open any other app
			        //intent: 'INTENT' // send SMS inside a default SMS app
			    }
			  };
		$scope.vibrate();
		if (showConfirmationAlert){
			$ionicPopup.alert({
			     title: 'SMS being Sent!',
			     template: 'Phone #: '+phoneNumber +' Message: '+message
			     
			   });
		}
		$cordovaSms.send(phoneNumber, message, options)
	      .then(function() {
	    	 
	      }, function(error) {
	    	  $ionicPopup.alert({
				     title: 'Warning : SMS could not be Sent: '+error,
				     template: 'Phone #: '+phoneNumber +' Message: '+message
				     
				   });
	      });
	}
	$scope.sendSMS = function(phoneNumber, message, showConfirmationAlert) {
		$http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+$scope.userLocation+'&key='+dataRestore.getGoogleKeyforLocationSrv()).then(function(response){
			if (response.data.status == 'OK'){
				$scope.sendSMSWithLocationName(phoneNumber, message , showConfirmationAlert, response.data.results[0].formatted_address)
			}else {
				$scope.sendSMSWithLocationName(phoneNumber, message , showConfirmationAlert, '')
			}

			},function(response){
				$scope.sendSMSWithLocationName(phoneNumber, message , showConfirmationAlert,'')
			});
	}
	
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
	 //startWatch(successCallback, failureCallback onSMSArrive https://github.com/floatinghotpot/cordova-plugin-sms/tree/master/docs
	  $scope.readSMS = function(){
		  var filter = {
	                box : 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

	                // following 4 filters should NOT be used together, they are OR relationship
	                read : 0, // 0 for unread SMS, 1 for SMS already read
	               // _id : 1234, // specify the msg id
	                //address : '+8613601234567', // sender's phone number
	                //body : 'You missed  a call from me at 8:38 AM.', // content to match

	                // following 2 filters can be used to list page up/down
	                indexFrom : 0, // start from index 0
	                maxCount : 10, // count of SMS to return each time
	            };
			SMS.listSMS(filter, function(data){
  			if(Array.isArray(data)) {
      			for(var i in data) {
      				var sms = data[i];
      				
      				//console#.log( sms.address + ": " + sms.body );
      			}
      		}
      		
      		
      	}, function(err){
      		//console#.log('error list sms: ' + err);
      	}); 
	  }
	  $scope.replyToWRU = function(phoneNo){
		  if (null != phoneNo && phoneNo.length > 10){
			  var extra = phoneNo.length - 10;
			  phoneNo = phoneNo.substring(extra)
		  }
		  var contact = dataRestore.isInContactList(phoneNo);
		  if (null != contact){
			  //console#.log(contact.relationWithMe + " wants to know where are you?")
			  /*TTS.speak({
		           text: contact.relationWithMe + " wants to know where are you?",
		           locale: 'en-GB',
		           rate: 1
		       }, function () {
		           // Do Something after success
		       }, function (reason) {
		           // Handle the error case
		       });*/
		  }
		  
	  }
	  $scope.smsMonitoringStarted = false;
	$scope.monitorSMS = function(){
		if(!$scope.smsMonitoringStarted ){
			$scope.smsMonitoringStarted = true;
			SMS.startWatch(function(){
	            //console#.log("SMS monitoring started");
	            document.addEventListener('onSMSArrive', function(e){
	                var sms = e.data;
	                ////console#.log('SMS arrived, count: ' + sms.body );
	                var anounceSMSText = dataRestore.getFromCache("anounceSMSText","boolean")
	                if(anounceSMSText){
	                	TTS.speak({
	 	 		           text: sms.body,
	 	 		           locale: 'en-GB',
	 	 		           rate: 1
	 	 		       }, function () {
	 	 		           // Do Something after success
	 	 		       }, function (reason) {
	 	 		           // Handle the error case
	 	 		       });
	                }
	                var smsBody = sms.body.toLowerCase();
	                //console#.log(" smsBody ="+smsBody)
	                if (smsBody == "wru" || smsBody == "where are you" || smsBody == "whr r u"){
	                	var autoReplyToWRU = (window.localStorage.getItem("autoReplyToWRU") === 'true' || null == window.localStorage.getItem("autoReplyToWRU"))
		                if(autoReplyToWRU){
		                	$scope.replyToWRU(sms.address);
		                }
	                }
	                
	                
	            });
	        }, function(){
	        	//console#.log("SMS monitoring failed");
	        });
		}
		
	}
	 $scope.deviceReady = false;
	$ionicPlatform.ready( function() {
		for(var i=0; i<100000;i++){
			a =6;
			b=7;
			c= a+b;
		}
		if ($scope.deviceReady) return;
		$scope.deviceReady = true;
		//console#.log('Plat form ready $ ##########################');
		if(SMS) {
			$scope.monitorSMS();
			function checkPermissionCallback(status){
				 if (!status.hasPermission) {
					 
			          var errorCallback = function () {
			            //console#.log('no sms permisions');
			          }
			          //console#.log('requesting permisions');
			          
			          permissions.requestPermission( function (status) {
			        	  
			            if (!status.hasPermission) {
			            	errorCallback();
			            }else {
			            	
			            	$scope.readSMS();
			            }
			          }, errorCallback,permissions.READ_SMS);
			          
			        }else {
			        	 
			        	$scope.readSMS();
			        }
			} 
			
			var permissions = window.plugins.permissions;
			permissions.hasPermission(checkPermissionCallback, null, permissions.READ_SMS);
		}else {
			//console#.log(" No SMS- not a phone" );
		}
		
		dataRestore.initSpeach();
		$scope.voiceRecordingOn = false;
		$scope.speakText = function() {
		    TTS.speak({
		           text: $scope.data.speechText,
		           locale: 'en-GB',
		           rate: 1
		       }, function () {
		           // Do Something after success
		       }, function (reason) {
		           // Handle the error case
		       });
		  };
		 
		  $rootScope.$on('voiceCommandOver',function(event,recognisedText){
			 //console#.log("recognisedText = "+recognisedText)
			  $state.transitionTo(dataRestore.getStateName(recognisedText));
		  })
		  $rootScope.$on('voiceCommandStartAgain',function(event){
			  if (window.localStorage.getItem("voiceRecording") == "started"){
				  $scope.StartVoiceRecognizationNow();
			  }
			    
		  })
		  $rootScope.$on('voiceCommandStop',function(event){
			  if (window.localStorage.getItem("voiceRecording") == "started"){
				  dataRestore.stopSpeach();
			  }
			    
		  })
		  $scope.StopRecording = function() {
			  window.localStorage.removeItem("voiceRecording");
			  $scope.voiceRecordingOn = false;
			  dataRestore.unmuteStreamVolume();
			  
		  }
		  $scope.StartVoiceRecognizationNow = function(){
			  $scope.voiceRecordingOn = true;
			  window.localStorage.setItem("voiceRecording","started");
			  dataRestore.record();
		  }
		  $scope.record = function() {
			  var welcomeMsg = window.localStorage.getItem("playWelcomeMessage");
				if(welcomeMsg == 'true'){
					delayTime = 8000;
				}
				if (delayTime > 0){
		    		TTS.speak({
		 	           text: 'Tell me which page do you want to navigate to? You can say things like settings, contact, my locations.',
		 	           locale: 'en-GB',
		 	           rate: 1
		 	       }, function () {
		 	    	  $scope.StartVoiceRecognizationNow();
		 	       }, function (reason) {
		 	           // Handle the error case
		 	       });
		     	
		    	}else {
		    		 $scope.StartVoiceRecognizationNow();
		    	}
		    
			  
			 
		  };
		
		
		// Enable background mode
		cordova.plugins.backgroundMode.enable();
		cordova.plugins.backgroundMode.onactivate = function() {
		   
			/*setTimeout(function(){
				TTS.speak({
			           text: 'Please don\'t put SOS alert in background. You may lock your phone though.',
			           locale: 'en-GB',
			           rate: 1
			       }, function () {
			           // Do Something after success
			       }, function (reason) {
			           // Handle the error case
			       });
			},100);*/
			}
		
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
			  
		});//Platform ready
	
	
	 
	  	
	}
])