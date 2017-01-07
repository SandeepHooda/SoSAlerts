// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var APP = {};
APP.DIRECTIVE = angular.module('allDirective',[]);
APP.CONTROLLERS = angular.module('allControllers',[]);
APP.SERVICES = angular.module('allServices',[]);
APP.FACTORY = angular.module('allFact',[]);
APP.DEPENDENCIES = ['allControllers',
                    'allServices',
                    'allDirective',
                    'allFact'
                    ];
APP.OTHERDEPENDENCIES = ['ionic','ngCordova','nfcFilters'];
angular.module('starter', APP.DEPENDENCIES.concat(APP.OTHERDEPENDENCIES))
.config(['$urlRouterProvider','$stateProvider','$ionicConfigProvider',
         function($urlRouterProvider,$stateProvider,$ionicConfigProvider){
	$ionicConfigProvider.tabs.position('bottom');
	 // setup an abstract state for the tabs directive
				$stateProvider.state('menu',{
					url:'/menu',
					abstract: true,
					templateUrl:'menu.html'	
					 
					
				}).state('menu.about',{
					url:'/about',
					templateUrl:'about/about.html',
					controller: 'CTRL_ABOUT'
					 
					
				}).state('menu.contacts',{
					url:'/contacts',
					templateUrl: 'contacts/contacts.html',
					controller: 'CTRL_CONTACTS'
				}).state('menu.settings',{
					cache: false,
					url:'/settings',
					templateUrl: 'settings/settings.html',
					controller: 'CTRL_SETTINGS'

				}).state('menu.nfc',{
					cache: false,
					url:'/nfc',
					templateUrl: 'nfc/nfc.html',
					controller: 'CTRL_NFC'

				}).state('menu.tab',{
					url:'/tab',
					abstract: true,
					templateUrl:'tabs.html'	
					 
					
				}).state('menu.tab.home',{
					url:'/home',
					views: {
						 'tab-home': {
						 templateUrl: 'home/home.html',
						 controller: 'CTRL_HOME'
						 }
					}	
					
				}).state('menu.tab.savedlocations',{
					url:'/savedlocations',
					views: {
						 'tab-savedlocations': {
						 templateUrl: 'savedlocations/savedlocations.html',
						 controller: 'CTRL_SAVEDLOCATIONS'
						 }
					}	
					
				}).state('menu.tab.starttrip',{
					url:'/starttrip',
					views: {
						 'tab-starttrip': {
						 templateUrl: 'trip/StartTrip.html',
						 controller: 'CTRL_StartTrip'
						 }
					}	
					
				}).state('menu.tab.nearme',{
					url:'/nearme',
					views: {
						 'tab-nearme': {
						 templateUrl: 'nearme/nearme.html',
						 controller: 'CTRL_NearMe'
						 }
					}	
					
				})
				$urlRouterProvider.otherwise('/menu/tab/home');
			}
         ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
