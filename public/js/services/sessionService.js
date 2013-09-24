//service that handles client side session storage
angular.module("myApp").factory("SessionService", function() {
	return {
		set: function(key,value) {
			return sessionStorage.setItem(key,value);
		},
		get: function(key) {
			return sessionStorage.getItem(key);
		},
		unset: function(key) {
			return sessionStorage.removeItem(key);
		},
		setUser: function(user) {
			return this.set('user',JSON.stringify(user));
		},
		getUser: function() {
			return JSON.parse(this.get('user'));
		},
		unsetUser: function() {
			return this.unset('user');
		}
	}
});