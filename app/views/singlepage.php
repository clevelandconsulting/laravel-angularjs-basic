<!doctype html>
<html data-ng-app='myApp'>
<head>
	<meta charset="UTF-8">
	 <title>SingePage Version</title>
	<link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet">
	<link href="css/styles.css" rel="stylesheet">
	<!--<link href="//netdna.bootstrapcdn.com/bootswatch/3.0.0/simplex/bootstrap.min.css" rel="stylesheet">-->
	<script type='text/javascript' src='js/vendor/underscore-min.js'></script>
	<script type='text/javascript' src='js/vendor/moment.min.js'></script>
	<script type='text/javascript' src='js/vendor/angular.min.js'></script>
	
</head>
<body>

	<div class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class='navbar-brand active' href='/#/'>CCI Project Mgmt</a>
        </div>
        
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav" data-ng-controller='NavigationController'>
          	<li data-ng-repeat="path in n.getPaths()" class="{{ n.isActive(path) }}">
            	<a href='/#{{ path.url }}'>{{ path.name }}</a>
            </li>
            <li data-ng-switch on="loggedIn()"><a ng-switch-when="true" data-ng-click="logout()">Logout</a>
          </ul>
        </div><!--/.nav-collapse -->
        
      </div>
    </div>

	<div style="margin-top: 61px" class="container" data-ng-view>

    </div><!-- end container -->   
    <script type='text/javascript' src='js/vendor/angular-flash.min.js'></script>
	<script type='text/javascript' src='js/vendor/angular-route.min.js'></script>
	<script type='text/javascript' src='js/app.js'></script>
	<script type='text/javascript' src='js/directives/projectDirective.js'></script>
	<script type='text/javascript' src='js/services/sessionService.js'></script>
	<script type='text/javascript' src='js/services/apiService.js'></script>
	<script type='text/javascript' src='js/services/authenticationService.js'></script>
	<script type='text/javascript' src='js/services/navigationService.js'></script>
	<script type='text/javascript' src='js/controllers/navigationCtrl.js'></script>
	<script type='text/javascript' src='js/controllers/homeCtrl.js'></script>
	<script type='text/javascript' src='js/controllers/loginCtrl.js'></script>
	<script type='text/javascript' src='js/controllers/profileCtrl.js'></script>
	<script type='text/javascript' src='js/controllers/projectCtrl.js'></script>
</body>
</html>