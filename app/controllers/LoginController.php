<?php

class LoginController extends BaseController {

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

	public function showLogin() {
		return View::make('login');	
	}

	public function doLogin()
	{
		$user = array(
			'username'=>Input::get('username'),
			'password'=>Input::get('password')
		);
		
		if ( Auth::attempt($user)) {
			return Redirect::route('home')->with('flash_notice','You are successfully logged in!');
		}
		
		return Redirect::route('login')->with('flash_error','Your username/password combination was incorrect!')->withInput();
	}
	
	public function doLogout() {
		Auth::logout();
	
		return Redirect::route('home')->with('flash_notice','You are successfully logged out.');
	}
	
	public function authLogin()
	{
		$user = array(
			'username'=>Input::get('username'),
			'password'=>Input::get('password')
		);
		
		if ( Auth::attempt($user)) {
			$u = Auth::user();
			$obj = array(
				'username'=> $u->username,
				'email'=> $u->email,
				'first_name'=>$u->first_name,
				'last_name'=>$u->last_name
			);
			return Response::json(array('flash'=>'You made it!', 'user'=>$obj),200);
		}
		
		return Response::json(array('flash'=>'Your username/password combination was incorrect!'), 401);
	}
	
	public function authLogout() {
		Auth::logout();
	
		return Response::json(array('flash'=>'You\'re out!'),200);
	}

}