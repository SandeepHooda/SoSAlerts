APP.FACTORY.factory('nfcService', function ($rootScope, $ionicPlatform,$state) {

    var tag = "#";

    $ionicPlatform.ready(function() {
    	nfc.addNdefListener(function (nfcEvent) {
            //console.log(JSON.stringify(nfcEvent, null, 4));
    		var textData = "";
            for (var j = 0; j<nfcEvent.tag.ndefMessage.length; j++){
            	var payLoad = nfcEvent.tag.ndefMessage[j].payload;
                
                for (var i=0;i<payLoad.length;i++){
                	textData += String.fromCharCode(payLoad[i]);
                }
                
                console.log(textData)
                this.tag = ":"+ textData;
            }
            window.localStorage.setItem('mostRecentTag', textData);
            //nfc.showSettings();
            $rootScope.$apply(function(){
                this.tag = textData;
                $state.transitionTo('menu.nfc');
            });
        }, function () {
            console.log("Listening for NDEF Tags.");
        }, function (reason) {
            alert("Error adding NFC Listener " + reason);
        });
    	
    	

    });

    return {
        tag: tag,

        readTag: function () {
        	var tagData = window.localStorage.getItem('mostRecentTag');
        	if (tagData == null ){
        		tagData = "";
        	}
            return tagData;
        },
    writeData: function (data) {
    	if (data == null || data == undefined){
    		data = "";
    	}
    	var mimeType = "text/pg",
        payload = "SOS Alerts Pro # "+data,
        record = ndef.mimeMediaRecord(mimeType, nfc.stringToBytes(payload));
    	var message = [
    		ndef.mimeMediaRecord(mimeType, nfc.stringToBytes(payload))
    	];

    	nfc.write(message, function(){
    		alert("data written")
    	},function(){
    		alert("data failed ")
    	});
    }
    };
});