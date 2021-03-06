<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

/* Home Route */
Route::get('/', array('as'=>'home', "uses"=>"HomeController@showMain"));

Route::get('/expiry',function() {
	return Response::json(array('flash'=>'Your out!'), 401);
});

/* API Routes */
Route::group(array('prefix'=>'api/v1'), function() {
	Route::post('auth/login', "LoginController@authLogin");
	Route::get('auth/logout', "LoginController@authLogout");
	Route::get('user', function() {
		return Response::json(Auth::user());
	})->before('auth');
	Route::put('user', function() {
		
		Auth::user()->first_name = Input::json('first_name');
		Auth::user()->last_name = Input::json('last_name');
		Auth::user()->email = Input::json('email');
		
		$result = Auth::user()->save();
		
		//$result = false;
		
		if ( $result ) {
			return Response::json(array('flash'=>'User Updated!', 'result'=>$result), 200);
		}
		else {
			return Response::json(array('flash'=>'Could not update the user.'), 500);
		}
	})->before('auth');
});

Route::group(array('prefix'=>'basic'), function() {
	/* Routes for logging in and out */
	Route::get('login', array('as'=>'login', "uses"=>"LoginController@showLogin"))->before('guest');
	Route::post('login', "LoginController@doLogin");
	Route::get('logout',array('as'=>'logout',"uses"=>"LoginController@doLogout"))->before('auth');
	
	/*Routes for the Profile*/
	Route::get('profile', array('as'=>'profile', "uses"=>"ProfileController@showProfile"))->before('auth');
	Route::put('updateuser', array('as'=>'updateuser', 'uses'=>'ProfileController@updateProfile'))->before('auth');
});