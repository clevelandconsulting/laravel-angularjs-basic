/*angular.module("myApp").directive("company", function(ApiService) {
	return {
		restrict: 'E',
		scope: {
			name: '@',
			projects: '=',
			select: '&'
		},
		replace: true,
		template: '<div class="panel panel-primary" ><div class="panel-heading" data-ng-click="displayProjects()"><h3 class="panel-title">{{ name }}</h3></div><div class="list-group" data-ng-show="showProjects"><a data-ng-repeat="project in projects" class="list-group-item" data-ng-click="select({id:project.id})">{{ project.name }}</a></div></div>',
		link: function(scope,element,attrs) {
			
			scope.showProjects = false;
			scope.displayProjects = function() {
				scope.showProjects = ! scope.showProjects;
			}
		}
	}
});*/

angular.module("myApp").directive("company", function(ApiService) {
	return {
		restrict: 'E',
		scope: {
			name: '@',
			cname: '@',
			projects: '=',
			select: '&',
			isActive: '&'
		},
		replace: true,
		template: '<li class="{{ active }}"><a class="{{cname}}" data-ng-click="displayProjects()">{{ name }}</a><ul class="nav" data-ng-show="showProjects"><li data-ng-repeat="project in projects" class="{{ project.selected }}"><a data-ng-click="select({id:project.id})">{{ project.name }}</a></li></ul></li>',
		link: function(scope,element,attrs) {
			scope.active='';
			scope.showProjects = false;
			scope.displayProjects = function() {
				scope.active = scope.active == '' ? 'active' : '';
				scope.showProjects = ! scope.showProjects;
			}
		}
	}
});

angular.module("myApp").directive("bspanel", function() {
	return {
		restrict: 'E',
		scope: {
			title: '@',
			pclass: '@'
		},
		replace: true,
		transclude: true,
		template: '<div class="panel {{ pclass }}"><div class="panel-heading"><h3 class="panel-title">{{ title }}</h3></div><div class="panel-body" ng-transclude></div></div>'
		
	}
});