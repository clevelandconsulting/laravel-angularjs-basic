angular.module("myApp").directive("company", function() {
	return {
		restrict: 'E',
		scope: {
			name: '@',
			projects: '='
			
		},
		replace: true,
		template: '<div class="panel panel-primary" ><div class="panel-heading" data-ng-click="displayProjects()"><h3 class="panel-title">{{ name }}</h3></div><div class="list-group" data-ng-show="showProjects"><a data-ng-repeat="project in projects" class="list-group-item" href="/#/projects/{{project.id}}">{{ project.name }}</a></div></div>',
		link: function(scope,element,attrs) {
			
			scope.showProjects = false;
			scope.displayProjects = function() {
				scope.showProjects = ! scope.showProjects;
			}
		}
	}
});