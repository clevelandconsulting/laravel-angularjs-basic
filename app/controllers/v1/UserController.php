<?php


namespace v1;

use BaseController;
use User;
use Auth;
use Input;
use Response;

class UserController extends BaseController {

	public function index() {
		return Response::json(Auth::user());
	}

	public function store() {
		Auth::user()->first_name = Input::json('first_name');
		Auth::user()->last_name = Input::json('last_name');
		Auth::user()->email = Input::json('email');
		$result = Auth::user()->save();
		if ( $result ) {
			return Response::json(array('flash'=>'User Updated!', 'result'=>$result), 200);
		}
		else {
			return Response::json(array('flash'=>'Could not update the user.'), 500);
		}
	}

}