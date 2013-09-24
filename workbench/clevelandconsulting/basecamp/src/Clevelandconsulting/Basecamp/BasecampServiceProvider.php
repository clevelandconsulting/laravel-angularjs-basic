<?php namespace Clevelandconsulting\Basecamp;

use Illuminate\Support\ServiceProvider;
use Config;

class BasecampServiceProvider extends ServiceProvider {

	/**
	 * Indicates if loading of the provider is deferred.
	 *
	 * @var bool
	 */
	protected $defer = false;

	/**
	 * Bootstrap the application events.
	 *
	 * @return void
	 */
	public function boot()
	{
		$this->package('clevelandconsulting/basecamp');
	}

	/**
	 * Register the service provider.
	 *
	 * @return void
	 */
	public function register()
	{
		$app = $this->app;
			
		$this->app['basecamp'] = $this->app->share(function($app)
        {
    		$baseUri = Config::get('packages/clevelandconsulting/basecamp.basecamp_url');
			$un = Config::get('packages/clevelandconsulting/basecamp.username');
			$pw = Config::get('packages/clevelandconsulting/basecamp.password');
			
        	$config = array(
				'baseUri' => $baseUri,
				'username' => $un,
				'password' => $pw
			);
			
        	//dd($config);
            return new Basecamp($config);
        });
		
		/*
        $app->bind('basecamp', function() {
	        
			
			return new Basecamp($config);
        });*/
	}

	/**
	 * Get the services provided by the provider.
	 *
	 * @return array
	 */
	public function provides()
	{
		return array('basecamp');
	}

}