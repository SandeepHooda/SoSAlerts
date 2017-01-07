APP.CONTROLLERS.controller ('CTRL_NFC',['$scope','nfcService','dataRestore','$state','$ionicPopup',
    function($scope,nfcService,dataRestore,$state,$ionicPopup){
	$scope.mydata = {};
	$scope.mydata.listOfStates= dataRestore.listOfStates();
	$scope.mydata.ActionForNewTag = null;
	$scope.tagData = nfcService.readTag();
	$scope.mydata.currentTag = null;
	$scope.mydata.currentTag_back = null;
	$scope.mydata.modeOfNFC = dataRestore.getFromCache('changeOfNFCMode','boolean');
	if ($scope.tagData != null && $scope.tagData.indexOf('SOS Alerts Pro') >=0 ){//known tag
		$scope.mydata.currentTag = null;
		var storedNFC = dataRestore.getStoredNFCTags();
		if(storedNFC && storedNFC.length > 0){
			for(var i=0; i< storedNFC.length;i++){
				var currentTag = storedNFC[i];
				if (currentTag.tagID == $scope.tagData){
					$scope.mydata.currentTag = currentTag;
				}
			}
		}
		
		if ($scope.mydata.currentTag){
			if (!$scope.mydata.modeOfNFC){//In read NFC mode
				if ( ((new Date()).getTime() - nfcService.getTagReadTime().getTime()) < 2000 ){// Tag just read
					$state.transitionTo($scope.mydata.currentTag.tagAction.state);
				}
				
			}
		}else {//Existing card reconfigured
			$scope.mydata.currentTag = {};
			 dataRestore.addNFCTagsAction($scope.mydata.currentTag);
		}
		$scope.mydata.currentTag_back = $scope.mydata.currentTag;	
		
	}else {//New Tag
		
		nfcService.addTagToKnownList();
		$scope.tagData  = "New Tag";
	}
	
	
	$scope.defineActionForTag = function(){
		if($scope.mydata.modeOfNFC && $scope.mydata.currentTag != null && $scope.mydata.ActionForNewTag != null ){//Known tag with no action
			$scope.mydata.currentTag = {"tagID":$scope.tagData,"tagAction":$scope.mydata.ActionForNewTag};
			 $scope.mydata.currentTag_back = $scope.mydata.currentTag;
			dataRestore.addNFCTagsAction($scope.mydata.currentTag);
			$ionicPopup.alert({
			     title: 'Card configuration success',
			     template: 'Card action: move to '+$scope.mydata.ActionForNewTag.name+ ' page.'
			   });
			$scope.mydata.modeOfNFC = false;
			$scope.changeOfNFCMode();
		}
	}
	$scope.changeOfNFCMode = function(){
		dataRestore.saveInCache('changeOfNFCMode', $scope.mydata.modeOfNFC);
		if ($scope.mydata.modeOfNFC){
			$scope.mydata.currentTag_back = $scope.mydata.currentTag;
			$scope.mydata.currentTag = null;
		}else {
			$scope.mydata.currentTag = $scope.mydata.currentTag_back;
		}
	}
	
}])