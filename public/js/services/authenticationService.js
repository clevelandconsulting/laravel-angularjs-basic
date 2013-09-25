//service to handle authentication
angular.module("myApp").factory("AuthenticationService", function(flash, ApiService, SessionService) {
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
			var p = ApiService.authLogin(credentials)
			.success(function(data) {
				ApiService.basecampUri().success(function(data) {
					addUri(data);
				});
				cacheSession(data.user);
				
			})
			return p;
		},
		logout: function() {
			
			var p = ApiService.authLogout().success(unCacheSession);
			return p;
		},
		isLoggedIn: function() {
			return checkSession();
		}
	}
});