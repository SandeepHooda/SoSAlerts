APP.CONTROLLERS.controller ('CTRL_CONTACTS',['$scope','$ionicPlatform','dataRestore','$state',
    function($scope,$ionicPlatform,dataRestore,$state){
	$scope.record = function() {
		  dataRestore.record();
	}
		$scope.mydata = {}
		$scope.mydata.allrelations = ["Mom", "Dad", "Honey", "Dear"];
		$scope.mydata.contact1 = $scope.mydata.contact2 = $scope.mydata.contact3 = $scope.mydata.contact4 = $scope.mydata.contact5 ="";
		
		$scope.restoreFromStorage = function(){
			dataRestore.restoreContacts($scope.mydata);
		}
		$scope.saveContactDetails = function(){
			
			window.localStorage.setItem("inactive1",$scope.mydata.inactive1);
			window.localStorage.setItem("contact1",$scope.mydata.contact1);
			window.localStorage.setItem("relationWithMe1",$scope.mydata.relationWithMe1);
			
			window.localStorage.setItem("inactive2",$scope.mydata.inactive2 );
			window.localStorage.setItem("contact2",$scope.mydata.contact2);
			window.localStorage.setItem("relationWithMe2",$scope.mydata.relationWithMe2 );
			
			window.localStorage.setItem("inactive3",$scope.mydata.inactive3 );
			window.localStorage.setItem("contact3",$scope.mydata.contact3 );
			window.localStorage.setItem("relationWithMe3",$scope.mydata.relationWithMe3 );
			
			window.localStorage.setItem("inactive4",$scope.mydata.inactive4 );
			window.localStorage.setItem("contact4",$scope.mydata.contact4 );
			window.localStorage.setItem("relationWithMe4",$scope.mydata.relationWithMe4);
			
			window.localStorage.setItem("inactive5",$scope.mydata.inactive5 );
			window.localStorage.setItem("contact5",$scope.mydata.contact5 );
			window.localStorage.setItem("relationWithMe5",$scope.mydata.relationWithMe5 );
			
		}
		$ionicPlatform.ready( function() {
			$scope.restoreFromStorage();
		});
		//$state.transitionTo('menu.tab.home');
	}
])