angular.module("myApp").controller('LoginController', function($scope, $location, AuthenticationService, flash) {
  $scope.title = "Login";
  $scope.credentials = { username: '', password: '' };
  
  $scope.login = function(cred) {

  	  // START HACK 
  	  // to handle the browser autocompletes (angularjs doesn't read these into the scope's model)
  	  
  	  if ( cred.username === '' ) {
  	    var un = document.querySelector('#username');
  	  	cred.username = angular.element(un).val();
  	  }
  	  if ( cred.password === '' ) {
  	  	var pw = document.querySelector('#password');
  	  	cred.password = angular.element(pw).val();
  	  }
  	  
  	  // END HACK
  	  
  	  if ( ( cred.username !== '' && cred.username !== undefined ) && ( cred.password !== '' && cred.password !== undefined ) ) {

		  var r = AuthenticationService.login(cred);
	  
		  r.success(function(data){
		  	$scope.flashHeader = 'Yeah!';
			$location.path('');
		  });
		  r.error(function(data) {
		  	$scope.flashHeader = 'Doh!';
		  });
		  return r;
		  
	  } else {

	  	  $scope.flashHeader = 'Hey!';
		  flash.error = "You must fill out both a username and a password.";
		  return null;
		  
	  }
	  
  }
});
