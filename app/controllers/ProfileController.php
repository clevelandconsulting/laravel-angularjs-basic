<?php

class ProfileController extends BaseController {

	/*
	|--------------------------------------------------------------------------
	| Default Home Controller
	|--------------------------------------------------------------------------
	|
	| You may wish to use controllers instead of, or in addition to, Closure
	| based routes. That's great! Here is an example controller method to
	| get you started. To route to this controller, just add the route:
	|
	|	Route::get('/', 'HomeController@showWelcome');
	|
	*/

	public function showProfile()
	{
		return View::make('profile');
	}
	
	public function updateProfile()
	{
	
		Auth::user()->first_name = Input::get('firstName');
		Auth::user()->last_name = Input::get('lastName');
		Auth::user()->email = Input::get('email');
		
		Auth::user()->save();
		
		return Redirect::route('home')->with('flash_notice', 'Profile has been updated.');
	}

}