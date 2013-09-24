//service to provide the navigation paths
angular.module("myApp").factory("NavigationService", function($location,AuthenticationService) {
	var LoggedInPaths = [{ name: 'Profile', url: '/profile'}, { name: 'Projects', url: '/projects'}];
	var GuestPaths = [{ name: 'Login', url: '/login'} ];
	
	var obj = {
		isActive: function(current) { 
						if( current.url !== undefined ) return ( $location.path() === current.url ? 'active' : '' ); 
						return '';
					},
		getPaths: function() {
						return AuthenticationService.isLoggedIn() ? LoggedInPaths : GuestPaths;
					}
	};
	
	return obj;

});