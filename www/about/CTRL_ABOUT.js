APP.CONTROLLERS.controller ('CTRL_ABOUT',['$scope','$http','dataRestore',
    function($scope,$http,dataRestore){
	$scope.record = function() {
		  dataRestore.record();
	}
	var url = "";
	if(ionic.Platform.isAndroid()){
		url = "/android_asset/www/";
	}
	$scope.groups = [];
	$http.get(url+'js/data/about.json').success(function(response){ 
	for (var i=0; i<response.length; i++) {
		
	    $scope.groups[i] = {
	    		heading: response[i].heading,
	    		details:[]
	    };
	    for (var j=0; j<response[i].details.length;j++){
	    	$scope.groups[i].details.push(response[i].details[j]);
	    }
	    
	  }

	});
	
	$scope.toggleAccordian = function(index){
		var accordion = angular.element( document.querySelector( '#accordionfaq'+index ) );
		var panelShow = false;
		
		
			if (accordion.hasClass('active')){
				accordion.removeClass('active');
				panelShow = false;
				//panel.removeClass('show');
			}else {
				accordion.addClass('active');
				panelShow = true;
				//panel.addClass('show');
			}
		
		for (var i=0; i<$scope.groups[index].details.length;i++){
			var id = '#panelfaq'+index+i
			var panel = angular.element( document.querySelector(id  ) );
			if(panelShow){
				panel.addClass('show');
			}else{
				panel.removeClass('show');
			}
		}
		
	}
}])