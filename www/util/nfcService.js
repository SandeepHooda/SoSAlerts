APP.FACTORY.factory('nfcService', function ($rootScope, $ionicPlatform,$state,$ionicPopup,dataRestore) {

    var tag = "#";
   
    window.localStorage.removeItem('mostRecentTag')
    console.log(" Setting most recent tag to null")
    var tagReadTime = null;
    $ionicPlatform.ready(function() {
    	console.log(" Registerinh NFC")
    	nfc.addNdefListener(function (nfcEvent) {//Called when NFC card is read
            //console.log(JSON.stringify(nfcEvent, null, 4));
    		var textData = "";
    		if (nfcEvent.tag && nfcEvent.tag.ndefMessage){
    			for (var j = 0; j<nfcEvent.tag.ndefMessage.length; j++){
                	var payLoad = nfcEvent.tag.ndefMessage[j].payload;
                    
                    for (var i=0;i<payLoad.length;i++){
                    	textData += String.fromCharCode(payLoad[i]);
                    }
                    
                    console.log(textData)
                    this.tag = ":"+ textData;
                }
    		}
            
            window.localStorage.setItem('mostRecentTag', textData);
            //nfc.showSettings();
            $rootScope.$apply(function(){
            	tagReadTime = new Date();
                this.tag = textData;
                
                //if (dataRestore.getFromCache('changeOfNFCMode','boolean') == false){//in NFC read mode
                	setTimeout(function(){
                		$state.transitionTo('menu.nfc');//rom NFC state we will redirect to the NFC action state
        			});
                	$state.transitionTo('menu.tab.home');
                //}
                
            });
        }, function () {
            console.log("Listening for NDEF Tags.");
        }, function (reason) {
        	if ('NO_NFC' != reason){
        		$ionicPopup.alert({
   			     title: 'Error adding NFC Listener',
   			     template: reason
   			   });
        	}else {
        		dataRestore.saveInCache('nfcError','NO_NFC' );
        	}
        	
            
        });
    	
    	

    });
    function getTagReadTime(){
    	return tagReadTime;
    }
    return {
        tag: tag,
        getTagReadTime: getTagReadTime,
        readTag: function () {
        	var tagData = window.localStorage.getItem('mostRecentTag');
        	if (tagData == null ){
        		tagData = "";
        	}
            return tagData;
        },
        addTagToKnownList: function () {
    	var mimeType = "text/pg",
        payload = "SOS Alerts Pro # "+((new Date()).getTime()),
        record = ndef.mimeMediaRecord(mimeType, nfc.stringToBytes(payload));
    	var message = [
    		ndef.mimeMediaRecord(mimeType, nfc.stringToBytes(payload))
    	];

    	nfc.write(message, function(){
    		$ionicPopup.alert({
			     title: 'New card',
			     template: 'Card read successfully.'
			   });

    		
    	},function(){
    		$ionicPopup.alert({
			     title: 'New card',
			     template: 'Card read error.'
			   });
    	});
    }
    };
});