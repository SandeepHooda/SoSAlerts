APP.FACTORY.factory('nfcService', function ($rootScope, $ionicPlatform,$state,$ionicPopup) {

    var tag = "#";
    var tagReadTime = null;
    $ionicPlatform.ready(function() {
    	nfc.addNdefListener(function (nfcEvent) {
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
                setTimeout(function(){
                	$state.transitionTo('menu.nfc');
    			}, 1);
                $state.transitionTo('menu.tab.home');
            });
        }, function () {
            console.log("Listening for NDEF Tags.");
        }, function (reason) {
        	$ionicPopup.alert({
			     title: 'Error adding NFC Listener',
			     template: reason
			   });
            
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