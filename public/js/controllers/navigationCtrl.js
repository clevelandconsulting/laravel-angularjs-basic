angular.module("myApp").controller("NavigationController", function($scope,$location,NavigationService,AuthenticationService) {
	$scope.n = NavigationService;
	
	$scope.loggedIn = function() {
		return AuthenticationService.isLoggedIn();
	}
	
	$scope.logout = function() {
	  AuthenticationService.logout().success( function() {
	  	$location.path('/login');
	  });
    }
    
});