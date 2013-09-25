angular.module("myApp").controller('ProjectsController', function($scope, $location, ApiService, flash, projects, SessionService) {
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
  
  $scope.jsonify = function (data) {
	  return JSON.stringify(data, null, "\t");
  }
  
  
  //$scope.title = "Project";
  $scope.myProject = {}; //project.data;
  $scope.activeId = '';
  
  $scope.newTime = {
	  date: moment().format("YYYY-MM-DD")
  };
  
  $scope.hasProject = function(project) {
	  if ( project.id !== undefined ) return true;
	  else return false;
  }
  
  $scope.displayDate = function(date) {
	  return moment(date).format("MMM D YYYY");
  }
  
  $scope.loadProject = function(id) {

	  var r = ApiService.projects(id);
		r.success(function(data) {
			$scope.myProject = data;
		});
  }
  
  $scope.basecampProjectUrl = function() {
  	 return SessionService.get('basecamp_url') + '/projects/' + $scope.myProject.basecamp_url;
  }
  
  $scope.addHours = function(time, project) {
  	  if ( time.hrs !== undefined ) {
		if ( time.date !== undefined ) {
			time.user = SessionService.getUser();
			time.project_id = project.id;
			project.times.push(angular.copy(time));
			ApiService.addTime(time).error(function() {
				project.times.pop();
			});
		}
		else {
			flash.error = 'You must enter a date!'; 
		}
	  }
	  else {
	  	//alert(JSON.stringify($scope.newTime, null, "\t") + JSON.stringify(time, null, "\t") );
	  	flash.error = 'You must enter some hours, even 0 if you have to!';
	  }
  }
  
  
  
});


angular.module("myApp").controller('ProjectController', function($scope, $location, ApiService, flash, project, SessionService) {
  $scope.title = "Project";
  $scope.myProject = project.data;
  $scope.newTime = {
	  date: moment().format("YYYY-MM-DD")
  };
  
  $scope.displayDate = function(date) {
	  return moment(date).format("MMM D YYYY");
  }
  
  $scope.basecampProjectUrl = SessionService.get('basecamp_url') + '/projects/' + $scope.myProject.basecamp_url;
  
  $scope.jsonify = function (data) {
	  return JSON.stringify(data, null, "\t");
  }
  
  $scope.addHours = function(time, project) {
  	  if ( time.hrs !== undefined && time.date !== undefined ) {
	  	  time.user = SessionService.getUser();
	  	  time.project_id = project.id;
	  	  project.times.push(time);
	  	  ApiService.addTime(time).error(function() {
	  	  	project.times.pop();
	  	  });
	  }
	  else {
	  	alert(JSON.stringify($scope.newTime, null, "\t") + JSON.stringify(time, null, "\t") );
	  	flash.error = 'Missing hours or date, please try again!';
	  }
  	  //alert(moment());
	  //alert('adding ' + time.hours + " hours to project.");
  }
  
});