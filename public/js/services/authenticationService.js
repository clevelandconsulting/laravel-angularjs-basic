//service to handle authentication
angular.module("myApp").factory("AuthenticationService", function($http, flash, SessionService) {
	var cacheSession = function(user) {
		SessionService.set('authenticated',true);
		SessionService.setUser(user);
	};
	var unCacheSession = function() {
		SessionService.unset('authenticated');
		SessionService.unset('basecamp_url');
		SessionService.unsetUser();
	};
	var checkSession = function() {
		return SessionService.get('authenticated') == "true";
	};
	
	var addUri = function(uri) {
		SessionService.set('basecamp_url',uri);
	};
	
	return {
		login: function(credentials) {
			var p = $http.post('api/v1/auth/login',credentials)
			.success(function(data) {
				$http.get('api/v1/basecamp/uri').success(function(data) {
					addUri(data);
				});
				cacheSession(data.user);
				flash.success = data.flash;
				
			})
			.error(function(data) {
				debugger;
				flash.error = data.flash;
				
			});
			return p;
		},
		logout: function() {
			
			var p = $http.get('api/v1/auth/logout').success(unCacheSession);
			return p;
		},
		isLoggedIn: function() {
			return checkSession();
		}
	}
});