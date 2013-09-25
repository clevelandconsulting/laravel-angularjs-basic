angular.module("myApp").controller('ProfileController', function($scope, $location, ApiService, flash, user) {
  $scope.title = "Login";
  $scope.user = user.data;
  
  $scope.update = function(user) {

  	  // START HACK 
  	  // to handle the browser autocompletes (angularjs doesn't read these into the scope's model)
  	  
  	  if ( user.first_name === '' ) {
  	    var un = document.querySelector('#firstname');
  	  	user.first_name = angular.element(un).val();
  	  }
  	  if ( user.last_name === '' ) {
  	  	var pw = document.querySelector('#lastname');
  	  	user.last_name = angular.element(pw).val();
  	  }
  	  
  	  // END HACK
  	  
  	  if ( ( user.email !== '' && user.email !== undefined ) ) {

		  var r = ApiService.updateUser(user);
	  
		  r.success(function(data){
		  	$scope.flashHeader = 'Yeah!';
		  });
		  r.error(function(data) {
		  	$scope.flashHeader = 'Doh!';
		  });
		  return r;
		  
	  } else {

	  	  $scope.flashHeader = 'Hey!';
		  flash.error = "You must have an email address.";
		  return null;
		  
	  }
	  
  }
});