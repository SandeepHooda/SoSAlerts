APP.SERVICES.service('dataRestore', function($rootScope) {
	
	this.saveInCache = function (key, value) {
		window.localStorage.setItem(key, value)
	}
	this.getFromCache = function (key, type) {
		var value = "";
		
		if (type === 'boolean'){
			value = false;
			if (window.localStorage.getItem(key) === 'true'){
				value = true;
			}
		}
		
		if (type === 'number'){
			value = parseInt(window.localStorage.getItem(key))
			if (isNaN(value) ){
				value = 0; 
			}
		}
		
		if (type === 'str' || type == undefined || type == null){
			value = window.localStorage.getItem(key)
			if (value == null || value == 'null'){
				value = "";
			}
			
		}
		return value;
	}
	this.getGoogleKeyforLocationSrv = function(){
		return "AIzaSyCJPCOYQwrjsZ2O8CPOIdW-O3BUlfyHP8Y";
	}
	this.deleteAllSavedLocation = function(){
		for (var i =0; i< 100;i++){
			window.localStorage.setItem('Location'+i, null);	
		}
	}
	
	this.getTripTimeSelectValues = function(){
		return ["15 Minutes","30 minutes","45 minutes", "1 hour","2 Hour","3 Hour","4 Hour","5 Hour","6 Hour","7 Hour","8 Hour"];
		
	}
	this.listOfStates = function(){
		return [{"name":"Home","state":"menu.tab.home"},{"name":"My Locations","state":"menu.tab.savedlocations"},{"name":"Start a trip","state":"menu.tab.starttrip"},{"name":"Near me","state":"menu.tab.nearme"}];
	}
	 this.getDistanceFromLatLonInMeters = function(lat1,lon1,lat2,lon2) {
		  var R = 6371; // Radius of the earth in km
		  var dLat = this.deg2rad(lat2-lat1);  // deg2rad below  
		  var dLon = this.deg2rad(lon2-lon1); 
		  var a = 
		    Math.sin(dLat/2) * Math.sin(dLat/2) +
		    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
		    Math.sin(dLon/2) * Math.sin(dLon/2)
		    ; 
		  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		  var d = R * c*1000; // Distance in meters
		  return d;
		}

	this.deg2rad = function (deg) {
		  return deg * (Math.PI/180)
	}
	this.restoreSavedLocations = function () {
		var myLocations = [];
		for (var i =0; i< 100;i++){
			var location = window.localStorage.getItem('Location'+i);
			if (location === null || location === 'null'){
				break;
			}
			myLocations.push(JSON.parse(location));
		}
		
		return myLocations;
	}
	this.getStoredNFCTags = function(){
		var storedNFC = [];
		var data = window.localStorage.getItem('StoredNFCTags');
		if (null != data){
			storedNFC = JSON.parse(data);
		}
		return storedNFC;
	}
	this.addNFCTagsAction = function(newTag){
		var storedNFC = [];
		var nfcToBeStored = [];
		var data = window.localStorage.getItem('StoredNFCTags');
		if (null != data){
			storedNFC = JSON.parse(data);
			for (var i =0;i<storedNFC.length;i++){//Remove any previously action for that tag if any
				if (storedNFC.tagID !== newTag.newTag){
					nfcToBeStored.push(storedNFC[i]);
				}
			}
		}
		nfcToBeStored.push(newTag);
		window.localStorage.setItem('StoredNFCTags',JSON.stringify(nfcToBeStored));
	}
	this.getNfcAction= function(nfcID){
		var storedNFC = this.getStoredNFCTags();
		for (var i =0;i<storedNFC.length;i++){
			if (storedNFC.tagID !== nfcID){
				return storedNFC[i].tagAction.state;
			}
		}
		return null;
	}
    this.restoreSettings = function (myData) {
    	if (window.localStorage.getItem("mapType") && window.localStorage.getItem("mapType") != null){
			myData.mapType = window.localStorage.getItem("mapType");
		}else {
			myData.mapType = "mapMyIndia"
		}
		
		if(window.localStorage.getItem("frequencyOfGreenAlerts") && window.localStorage.getItem("frequencyOfGreenAlerts") != null){
			myData.frequencyOfGreenAlerts = parseInt(window.localStorage.getItem("frequencyOfGreenAlerts"));
		}else {
			myData.frequencyOfGreenAlerts = 5;
		}
		
		if(window.localStorage.getItem("frequencyOfRedAlerts") && window.localStorage.getItem("frequencyOfRedAlerts") != null){
			myData.frequencyOfRedAlerts = parseInt(window.localStorage.getItem("frequencyOfRedAlerts"));
		}else {
			myData.frequencyOfRedAlerts = 5;
		}
		
		/*if(window.localStorage.getItem("cacheMyLocationFrequency") && window.localStorage.getItem("cacheMyLocationFrequency") != null){
			myData.cacheMyLocationFrequency = parseInt(window.localStorage.getItem("cacheMyLocationFrequency"));
		}else {
			myData.cacheMyLocationFrequency = 60;
		}*/
		
		
		if (window.localStorage.getItem("useChargerUnplugEvent") === 'true'){
			myData.useChargerUnplugEvent = true;
		}else {
			myData.useChargerUnplugEvent = false;
		}
		
		if (window.localStorage.getItem("listenShakeEvent") === 'true'){
			myData.listenShakeEvent = true;
		}else {
			myData.listenShakeEvent = false;
		}
		
		if (window.localStorage.getItem("anounceSMSText") === 'true'){
			myData.anounceSMSText = true;
		}else {
			myData.anounceSMSText = false;
		}
		if (window.localStorage.getItem("autoReplyToWRU") === 'true' || null == window.localStorage.getItem("autoReplyToWRU")){
			myData.autoReplyToWRU = true;
		}else {
			myData.autoReplyToWRU = false;
		}
		
		if(window.localStorage.getItem("shakeIntensity") && window.localStorage.getItem("shakeIntensity") != null){
			myData.shakeIntensity = parseInt(window.localStorage.getItem("shakeIntensity"));
		}else {
			myData.shakeIntensity = 15;
		}
		/*if (window.localStorage.getItem("cacheMyLocation") === 'true'){
			myData.cacheMyLocation = true;
		}else {
			myData.cacheMyLocation = false;
		}*/
    }
    this.getChargerUnplugEventSetting = function(){
    	var useChargerUnplugEvent = false;
    	if (window.localStorage.getItem("useChargerUnplugEvent") === 'true'){
			useChargerUnplugEvent = true;
		}
    	return useChargerUnplugEvent;
    }
    this.getWRUContacts = function(){
    	var contacts =  window.localStorage.getItem("getWRUContacts");
    	if (null == contacts){
    		contacts = "";
    	}
    	var wruContacts =  contacts.split(";");
    	var knowncontacts = [];
    	if (wruContacts)
    		for (var i=0; i< wruContacts.length;i++){
    			if (wruContacts[i] != "" && wruContacts[i] != "undefined" && wruContacts[i] != "null"){
    				knowncontacts.push(wruContacts[i]);
    			}
    		}
    	return this.addNameToContacts( knowncontacts);
    }
    this.addNameToContacts = function(knowncontacts){
    	var knowncontactsWithNames = []; 
    	if (knowncontacts.length > 0) {
    		for (var i=0;i<knowncontacts.length;i++){
    			var obj = {};
    			obj.number = knowncontacts[i];
    			obj.name = this.findPhoneNoInContactBook(obj.number);
    			knowncontactsWithNames.push(obj);
    		}
    		
    	}
    	console.log(knowncontactsWithNames)
    	return knowncontactsWithNames;
    }
    this.findPhoneNoInContactBook = function(searchNo){
    	if (searchNo.length > 10){
   		 var extra = searchNo.length - 10;
   		searchNo = searchNo.substring(extra)
    	}
    	
		  var contacts = this.phoneBook;
		  
	      for(var i = 0; i < contacts.length; i++) {
	        // console.log(contacts[i].id + " - " + contacts[i].displayName);
	         for(var j = 0; j < contacts[i].phoneNumbers.length; j++) {
	            var phone = contacts[i].phoneNumbers[j];
	            if (null != phone && null != phone.number ){
	            	var number = phone.normalizedNumber ;
	            	if (number.length > 10){
	            		 var extra = number.length - 10;
	            		 number = number.substring(extra)
	            	}
	            	
		  			if (number == searchNo) {
		  				return contacts[i].displayName;
		  			}
		  		 }
	            //console.log("===> " + phone.type + "  " + phone.number + " (" + phone.normalizedNumber+ ")");
	         }
	      }
	      return "";
	  };
    this.addWRUContacts = function(phoneno){
    	if (phoneno.length > 10){
      		 var extra = phoneno.length - 10;
      		phoneno = phoneno.substring(extra)
       	}
    	var contacts = window.localStorage.getItem("getWRUContacts");
    	if (null == contacts){
    		contacts = "";
    	}
    	contacts +=";"+phoneno;
    	 window.localStorage.setItem("getWRUContacts",contacts);
    }
    this.deleteWRUContacts = function(phoneno){
    	var contactTobeSaved = "";
    	var contacts = window.localStorage.getItem("getWRUContacts");
    	if (null == contacts){
    		contacts = "";
    	}
    	var wruContacts = contacts.split(";");
    	if (wruContacts != null && wruContacts.length > 0){
    		for (var i=0;i<wruContacts.length;i++){
    			if (wruContacts[i] != phoneno && wruContacts[i] != 'undefined' && wruContacts[i] != "") {
    				contactTobeSaved += ";"+phoneno;
    			}
    		}
    	}
    	
    	if (contactTobeSaved == ""){
    		window.localStorage.removeItem("getWRUContacts");
    	}else {
    		window.localStorage.setItem("getWRUContacts",contactTobeSaved);
    	}
    	
    }
    this.isInWRUContacts = function(phoneno){
    	var contacts = window.localStorage.getItem("getWRUContacts");
    	if (null == contacts){
    		contacts = "";
    	}
    	var wruContacts = contacts.split(";");
    	if (wruContacts != null && wruContacts.length > 0){
    		for (var i=0;i<wruContacts.length;i++){
    			if (wruContacts[i] == phoneno) {
    				return true;
    			}
    		}
    	}
    	
    	return false;
    }
    this.isInContactList = function(number){
    	var contact = null;
    	var mydata = {};
    	this.restoreContacts (mydata);
    	mydata.inactive1 = window.localStorage.getItem("inactive1");
		mydata.contact1 = window.localStorage.getItem("contact1");
		mydata.relationWithMe1 = window.localStorage.getItem("relationWithMe1");
    	if (mydata.contact1 == number ){
    		contact = {};
    		contact.phoneNo = number;
    		contact.relationWithMe = mydata.relationWithMe1;
    	}
    	
    	if (mydata.contact2 == number ){
    		contact = {};
    		contact.phoneNo = number;
    		contact.relationWithMe = mydata.relationWithMe2;
    	}
    	
    	if (mydata.contact3 == number ){
    		contact = {};
    		contact.phoneNo = number;
    		contact.relationWithMe = mydata.relationWithMe3;
    	}
    	
    	if (mydata.contact4 == number ){
    		contact = {};
    		contact.phoneNo = number;
    		contact.relationWithMe = mydata.relationWithMe4;
    	}
    	
    	if (mydata.contact5 == number ){
    		contact = {};
    		contact.phoneNo = number;
    		contact.relationWithMe = mydata.relationWithMe5;
    	}
    	return contact;
    }
    this.getActiveContacts = function (){
    	var mydata = {};
    	this.restoreContacts (mydata);
    	
    	var activeContacts = [];
    	
    	if (!mydata.inactive1){
    		if(mydata.contact1){
    			var obj = {};
    			obj.phone = mydata.contact1.replace(/[^0-9]/g, "");
    			
    			if (mydata.relationWithMe1){
    				obj.relation = mydata.relationWithMe1;
    			}else {
    				obj.relation = "";
    			}
    			activeContacts.push(obj);
    		}
    	}
    	
    	if (!mydata.inactive2){
    		if(mydata.contact2){
    			var obj = {};
    			obj.phone = mydata.contact2.replace(/[^0-9]/g, "");
    			
    			if (mydata.relationWithMe2){
    				obj.relation = mydata.relationWithMe2;
    			}else {
    				obj.relation = "";
    			}
    			activeContacts.push(obj);
    		}
    	}
    	
    	if (!mydata.inactive3){
    		if(mydata.contact3){
    			var obj = {};
    			obj.phone = mydata.contact3.replace(/[^0-9]/g, "");
    			
    			if (mydata.relationWithMe3){
    				obj.relation = mydata.relationWithMe3;
    			}else {
    				obj.relation = "";
    			}
    			activeContacts.push(obj);
    		}
    	}
    	
    	
    	if (!mydata.inactive4){
    		if(mydata.contact4){
    			var obj = {};
    			obj.phone = mydata.contact4.replace(/[^0-9]/g, "");
    			
    			if (mydata.relationWithMe4){
    				obj.relation = mydata.relationWithMe4;
    			}else {
    				obj.relation = "";
    			}
    			activeContacts.push(obj);
    		}
    	}
    	
    	if (!mydata.inactive5){
    		if(mydata.contact5){
    			var obj = {};
    			obj.phone = mydata.contact5.replace(/[^0-9]/g, "");
    			
    			if (mydata.relationWithMe5){
    				obj.relation = mydata.relationWithMe5;
    			}else {
    				obj.relation = "";
    			}
    			activeContacts.push(obj);
    		}
    	}
    	
    	return activeContacts;
    }
    
    this.restoreContacts = function (mydata) {
    	mydata.inactive1 = window.localStorage.getItem("inactive1");
		mydata.contact1 = window.localStorage.getItem("contact1");
		mydata.relationWithMe1 = window.localStorage.getItem("relationWithMe1");
		
		mydata.inactive2 = window.localStorage.getItem("inactive2");
		mydata.contact2 = window.localStorage.getItem("contact2");
		mydata.relationWithMe2 = window.localStorage.getItem("relationWithMe2");
		
		mydata.inactive3 = window.localStorage.getItem("inactive3");
		mydata.contact3 = window.localStorage.getItem("contact3");
		mydata.relationWithMe3 = window.localStorage.getItem("relationWithMe3");
		
		mydata.inactive4 = window.localStorage.getItem("inactive4");
		mydata.contact4 = window.localStorage.getItem("contact4");
		mydata.relationWithMe4 = window.localStorage.getItem("relationWithMe4");
		
		mydata.inactive5 = window.localStorage.getItem("inactive5");
		mydata.contact5 = window.localStorage.getItem("contact5");
		mydata.relationWithMe5 = window.localStorage.getItem("relationWithMe5");
		
		if(mydata.inactive1 === 'true'){
			mydata.inactive1 = true;
		}else{
			mydata.inactive1 = false;
		}
		
		if(mydata.inactive2 === 'true'){
			mydata.inactive2 = true;
		}else{
			mydata.inactive2 = false;
		}
		
		if(mydata.inactive3 === 'true'){
			mydata.inactive3 = true;
		}else{
			mydata.inactive3 = false;
		}
		
		if(mydata.inactive4 === 'true'){
			mydata.inactive4 = true;
		}else{
			mydata.inactive4 = false;
		}
		
		if(mydata.inactive5 === 'true'){
			mydata.inactive5 = true;
		}else{
			mydata.inactive5 = false;
		}
		
		if (!mydata.contact1 || mydata.contact1 === 'null'){
			mydata.contact1 = ""
		}
		
		if (!mydata.contact2 || mydata.contact2 === 'null'){
			mydata.contact2 = ""
		}
		
		if (!mydata.contact3 || mydata.contact3 === 'null'){
			mydata.contact3 = ""
		}
		
		if (!mydata.contact4 || mydata.contact4 === 'null'){
			mydata.contact4 = ""
		}
		
		if (!mydata.contact5 || mydata.contact5 === 'null'){
			mydata.contact5 = ""
		}
		
		if (!mydata.relationWithMe1 || mydata.relationWithMe1 === 'null' || mydata.relationWithMe1 === 'undefined'){
			mydata.relationWithMe1 = ""
		}
		if (!mydata.relationWithMe2 || mydata.relationWithMe2 === 'null' || mydata.relationWithMe2 === 'undefined'){
			mydata.relationWithMe2 = ""
		}
		if (!mydata.relationWithMe3 || mydata.relationWithMe3 === 'null' || mydata.relationWithMe3 === 'undefined'){
			mydata.relationWithMe3 = ""
		}
		if (!mydata.relationWithMe4 || mydata.relationWithMe4 === 'null' || mydata.relationWithMe4 === 'undefined'){
			mydata.relationWithMe4 = ""
		}
		if (!mydata.relationWithMe5 || mydata.relationWithMe5 === 'null' || mydata.relationWithMe5 === 'undefined'){
			mydata.relationWithMe5 = ""
		}
    }
    
    this.getStateName = function (someText) {
    	if (!someText) return 'menu.tab.home';
    	someText = someText.toLowerCase();
    	if(someText.indexOf('location') >=0 ){
        	return 'menu.tab.savedlocations';
        }
    	if(someText.indexOf('trip') >=0 ){
        	return 'menu.tab.starttrip';
        }
    	if(someText.indexOf('near') >=0 ){
        	return 'menu.tab.nearme';
        }
    	if(someText.indexOf('contact') >=0 ){
        	return 'menu.contacts';
        }
    	if(someText.indexOf('setting') >=0 ){
        	return 'menu.settings';
        }
    	if(someText.indexOf('nfc') >=0 ){
        	return 'menu.nfc';
        }
    	if(someText.indexOf('about') >=0 ){
        	return 'menu.about';
        }
    	if(someText.indexOf('demo') >=0 ){
        	return 'menu.demo';
        }
    	
    	
    	return 'menu.tab.home';
    }
    this.recognition = null; 
    this.initSpeach = function(){
    	if (this.recognition != null) return;
    	this.recognition = new SpeechRecognition();
    	//console#.log("new SpeechRecognition ")
    	this.recognition.onresult = function(event) {
	        if (event.results.length > 0) {
	            var recognizedText = event.results[0][0].transcript;
	            //console#.log(recognizedText)
	            $rootScope.$emit('voiceCommandOver',recognizedText);
	            
	          
	        }
	    };
	    this.recognition.onend = function(){
	    	$rootScope.$emit('voiceCommandStop');
	    	setTimeout(function(){
	    		//console#.log(" Start again")
	    		$rootScope.$emit('voiceCommandStartAgain');
	    	},300)
	    }
	    
	    
	    
    }
    this.unmuteVolume = function(){
    	var recognition = new SpeechRecognition();
    	recognition.onresult = function(event) {
    		
    	}
    	recognition.start();
    	recognition.unmute();
    	
    }
    this.unmuteStreamVolume = function(){
    	this.recognition.unmute();
    }
    this.stopSpeach = function(){
    	this.recognition.stop();
    	this.recognition.abort();
    }
   this.recordingTime = new Date(); 
    this.record = function() {
    	/*if ( (new Date().getTime() - this.recordingTime.getTime()) <100 ){
    		return;
    	}
    	this.recordingTime = new Date();
    	var delayTime = 0;
    	var welcomeMsg = window.localStorage.getItem("playWelcomeMessage");
		if(welcomeMsg == 'true'){
			delayTime = 9000;
		}
    	if (delayTime > 0){
    		TTS.speak({
 	           text: 'After the beep tell me which page do you want to navigate to? You can say things like settings, contact, my locations.',
 	           locale: 'en-GB',
 	           rate: 1
 	       }, function () {
 	           // Do Something after success
 	       }, function (reason) {
 	           // Handle the error case
 	       });
     	
    	}*/
    	this.recognition.start()
	   
	    
	    
	  };
	  this.phoneBook = null;
	 
	  this.printPhonebook = function(){
		  var contacts = this.phoneBook;
		  console.log(contacts.length + ' contacts found');
	      for(var i = 0; i < contacts.length; i++) {
	         console.log(contacts[i].id + " - " + contacts[i].displayName);
	         for(var j = 0; j < contacts[i].phoneNumbers.length; j++) {
	            var phone = contacts[i].phoneNumbers[j];
	            console.log("===> " + phone.type + "  " + phone.number + " (" + phone.normalizedNumber+ ")");
	         }
	      }
	  };
	  
    
});