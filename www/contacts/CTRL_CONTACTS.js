APP.CONTROLLERS.controller ('CTRL_CONTACTS',['$scope','$ionicPlatform','dataRestore','$state','$ionicPopup',
    function($scope,$ionicPlatform,dataRestore,$state,$ionicPopup){
	
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
		//dataRestore.addWRUContacts("9216");
		//window.localStorage.setItem("getWRUContacts","");
		$scope.getWruContacts = function(){
			$scope.mydata.otherKnownContacts = dataRestore.getWRUContacts(); 
			
		}
		$scope.getWruContacts();
		$scope.deleteContact = function(index){
			var confirmPopup = $ionicPopup.confirm({
			     title: 'Delete contact',
			     template: 'Are you sure you want to delete this contact?'
			   });

			   confirmPopup.then(function(res) {
			     if(res) {
			    	 dataRestore.deleteWRUContacts($scope.mydata.otherKnownContacts[index]); 
						$scope.mydata.otherKnownContacts = dataRestore.getWRUContacts();
						
			     }
			   })
			
			
		}
		
	}
])