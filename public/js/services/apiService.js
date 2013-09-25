//service to handle authentication
angular.module("myApp").factory("ApiService", function($http, flash, SessionService) {
	var baseUri = 'api/v1/';
	
	var flashError = function(data) {
		if ( data.flash != undefined ) flash.error = data.flash;
		if ( data.error != undefined ) flash.error = data.error.message;
		else flash.error = 'An unknown error occurred.  Cold not process what you want.';
	}
	
	var flashSuccess = function(data) {
		if ( data.flash != undefined ) flash.success = data.flash;
	}
	
	return {
		authLogin: function(credentials) {
			var r = $http.post(baseUri + 'auth/login',credentials);
			
			r.success(flashSuccess);
			r.error(flashError);
			return r;
		},
		authLogout: function() {
			
			var r = $http.get(baseUri + 'auth/logout');
			r.error(flashError);
			return r;
		},
		basecampUri: function() {
			var r = $http.get(baseUri + 'basecamp/uri');
			r.error(flashError);
			return r;
		},
		user: function() {
			var r =  $http.get(baseUri + 'user');
			r.error(flashError);
			return r;
		},
		updateUser: function(user) {
			var r = $http.put(baseUri + 'user', user);
	 
			r.success(flashSuccess);
			r.error(flashError);
			
			return r;
		},
		projects: function(_id) {
			 var uri = baseUri + 'project';
			 if ( _id !== undefined ) uri = uri + '/' + _id;
			 var r =  $http.get(uri);
			 r.error(flashError);
			 return r;
		},
		
		addTime: function(time) {
			var r = $http.post(baseUri + 'time', time);
	  
			r.success(flashSuccess);
			r.error(flashError);
			
			return r;
		},
	};
});