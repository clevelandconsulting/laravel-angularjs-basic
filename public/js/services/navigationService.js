//service to provide the navigation paths
angular.module("myApp").factory("NavigationService", function($location,AuthenticationService) {
	var LoggedInPaths = [{ name: 'Projects', url: '/projects'}, { name: 'Profile', url: '/profile'}];
	var GuestPaths = [{ name: 'Login', url: '/login'} ];
	
	var obj = {
		isActive: function(current) { 
						if( current.url !== undefined ) {
							if ( $location.path() == current.url ) return 'active';
							else {
								if ( $location.path().substr(0, current.url.length ) == current.url ) return 'active';
								return '';
							}
							return ( $location.path() === current.url ? 'active' : '' ); 
						}
						return '';
					},
		getPaths: function() {
						return AuthenticationService.isLoggedIn() ? LoggedInPaths : GuestPaths;
					}
	};
	
	return obj;

});