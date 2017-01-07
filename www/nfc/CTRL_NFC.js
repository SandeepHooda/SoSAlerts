APP.CONTROLLERS.controller ('CTRL_NFC',['$scope','nfcService',
    function($scope,nfcService){
	$scope.tagData = nfcService.readTag();
	
}])