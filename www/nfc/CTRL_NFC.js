APP.CONTROLLERS.controller ('CTRL_NFC',['$scope','nfcService','dataRestore','$state','$ionicPopup',
    function($scope,nfcService,dataRestore,$state,$ionicPopup){
	$scope.mydata = {};
	$scope.mydata.listOfStates= dataRestore.listOfStates();
	$scope.mydata.ActionForNewTag = null;
	$scope.tagData = nfcService.readTag();
	$scope.currentTag = null;
	$scope.currentTag_back = null;
	if ($scope.tagData != null && $scope.tagData.indexOf('SOS Alerts Pro') >=0 ){//known tag
		$scope.currentTag = null;
		var storedNFC = dataRestore.getStoredNFCTags();
		if(storedNFC && storedNFC.length > 0){
			for(var i=0; i< storedNFC.length;i++){
				var currentTag = storedNFC[i];
				if (currentTag.tagID == $scope.tagData){
					$scope.currentTag = currentTag;
				}
			}
		}
		
		$scope.currentTag_back = $scope.currentTag;	
		if (!$scope.mydata.modeOfNFC && $scope.currentTag){//In read NFC mode
			if ( ((new Date()).getTime() - nfcService.getTagReadTime().getTime()) < 2000 ){// Tag just read
				$state.transitionTo($scope.currentTag.tagAction.state);
			}
			
		}
	}else {//New Tag
		
		nfcService.addTagToKnownList();
		$scope.tagData  = "New Tag";
	}
	
	
	$scope.defineActionForTag = function(){
		if($scope.mydata.modeOfNFC && $scope.currentTag != null && $scope.mydata.ActionForNewTag != null ){//Known tag with no action
			$scope.currentTag = {"tagID":$scope.tagData,"tagAction":$scope.mydata.ActionForNewTag};
			 $scope.currentTag_back = $scope.currentTag;
			dataRestore.addNFCTagsAction($scope.currentTag);
			$ionicPopup.alert({
			     title: 'Card configuration success',
			     template: 'Card action: move to '+$scope.mydata.ActionForNewTag.name+ ' page.'
			   });
		}
	}
	$scope.changeOfNFCMode = function(){
		if ($scope.mydata.modeOfNFC){
			$scope.currentTag_back = $scope.currentTag;
			$scope.currentTag = null;
		}else {
			$scope.currentTag = $scope.currentTag_back;
		}
	}
	
}])