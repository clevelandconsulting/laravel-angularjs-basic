var app = angular.module("myApp", ['angular-flash.service', 'angular-flash.flash-alert-directive' ]);
	
app.config(function($routeProvider, $locationProvider, flashProvider) {

 
  flashProvider.errorClassnames.push('alert-danger'); 
  //$locationProvider.html5Mode(true);

  $routeProvider.when('/', {
    templateUrl: 'templates/home.html',
    controller: 'HomeController'
  });
  
  $routeProvider.when('/login', {
    templateUrl: 'templates/login.html',
    controller: 'LoginController'
  });
  
  $routeProvider.when('/profile', {
    templateUrl: 'templates/profile.html',
    controller: 'ProfileController',
    resolve: {
	    "user": function($http, $location) {
	    	if ( $location.path() == '/profile') return $http.get('/api/v1/user');
	    	return null;
	    }
    }
  });
  
  $routeProvider.when('/projects', {
	 templateUrl: 'templates/projects.html',
	 controller: 'ProjectsController',
	 resolve: {
		 "projects": function($http, $location) {
			 if ( $location.path() == '/projects') {
			 	return $http.get('/api/v1/project');
			 }
			 return null;
		 }
	 } 
  });
  
  
   $routeProvider.when('/projects/:id', {
	 templateUrl: 'templates/project.html',
	 controller: 'ProjectController',
	 resolve: {
		 "project": function($http,$route) {
			 return $http.get('/api/v1/project/'+$route.current.params.id);
			 //return null;
		 }
	 } 
  });
 
 
  
  $routeProvider.when('/404', {
	  templateUrl: 'templates/404.html',
	  /*resolve: {
	    "expiry": function($http) {
		    return $http.get('/expiry');
	    }
	  }*/
  });

  $routeProvider.otherwise({ 
  	redirectTo: '/404' 
  });

});

angular.module("myApp").config(function($httpProvider) {
	var logsOutUserOn401 = function($location, $q, SessionService, flash) {
		var success = function(response) {
			return response;	
		};
		
		var error = function(response) {
			if(response.status === 401 && $location.path() != '/login') {
				//indicates the session has expired
				SessionService.unset('authenticated');
				$location.path('/login');
				//flash.clean();
				flash.error = response.data.flash;
				//debugger;
				return $q.reject(response);
				
			} else {
			
				return $q.reject(response);
			}
		};
		
		
		return function(promise) {
			return promise.then(success,error);
		}
	};
	
	$httpProvider.responseInterceptors.push(logsOutUserOn401);
})

angular.module("myApp").run(function($rootScope,$location,AuthenticationService,flash) {
	var routesWithoutAuth = ['/login', '/404', '/'];
	
	// Determine if the user is authenticated to access parts of the system
	//debugger;
	
	$rootScope.$on('$routeChangeStart', function(event, next, current) {
		if(!_(routesWithoutAuth).contains($location.path()) && !AuthenticationService.isLoggedIn()) {
			if ($location.path() !== '' ) {
				flash.error = 'You need to login!';
				$rootScope.flashHeader = 'Doh!';
			}
			$location.path('/login');
		}
		else {
			//if ( $location.path() === '/login' && AuthenticationService.isLoggedIn()) {
			//	flash.error = 'You\'re logged in!';
			//	$location.path('/home');
			//}
		}
	});
	
});