angular.module("myApp").controller('ProjectsController', function($scope, $location, $http, flash, projects, SessionService) {
  $scope.title = "Projects";
  $scope.useFilter = true;
  $scope.myProjects = projects.data;
  $scope.myFilteredProjects = _.filter(
  	$scope.myProjects, 
  	
  	function(project){ 
  		if ($scope.useFilter) return project.status == 'active'; 
  		else return true;
  	}
  	
  );
  
  $scope.myProjectGroups = _.groupBy(
  	$scope.myFilteredProjects, 
  	function(project) {
  		return project.company.name;
  	}
  );
  
  $scope.basecampUrl = SessionService.get('basecamp_url') + '/projects/';
  
  
  $scope.user = SessionService.getUser();
  
  $scope.isActive = function(project) {
	  return project.status == "active";
  }
  
  $scope.sort = function(company) {
	  return company;
  }
  
  $scope.jsonify = function (project) {
	  return JSON.stringify(project, null, "\t");
  }
});


angular.module("myApp").controller('ProjectController', function($scope, $location, $http, flash, project, SessionService) {
  $scope.title = "Project";
  $scope.myProject = project.data;
  
  $scope.basecampProjectUrl = SessionService.get('basecamp_url') + '/projects/' + $scope.myProject.basecamp_url;
  
  $scope.jsonify = function (data) {
	  return JSON.stringify(data, null, "\t");
  }
  
});