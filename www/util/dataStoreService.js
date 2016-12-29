APP.SERVICES.service('dataRestore', function() {
	
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
		
		return value;
	}
	
	this.deleteAllSavedLocation = function(){
		for (var i =0; i< 100;i++){
			window.localStorage.setItem('Location'+i, null);	
		}
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
		
		if (!mydata.relationWithMe1 || mydata.relationWithMe1 === 'null'){
			mydata.relationWithMe1 = ""
		}
		if (!mydata.relationWithMe2 || mydata.relationWithMe2 === 'null'){
			mydata.relationWithMe2 = ""
		}
		if (!mydata.relationWithMe3 || mydata.relationWithMe3 === 'null'){
			mydata.relationWithMe3 = ""
		}
		if (!mydata.relationWithMe4 || mydata.relationWithMe4 === 'null'){
			mydata.relationWithMe4 = ""
		}
		if (!mydata.relationWithMe5 || mydata.relationWithMe5 === 'null'){
			mydata.relationWithMe5 = ""
		}
    }
    
});