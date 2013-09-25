<?php


namespace v1;

use BaseController;
use Time;
use View;
use User;
use Input;
use Auth;
use Response;

class TimeController extends BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$user = Auth::user();
		
		$times = $user->times;
				
		return $times;
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
        return View::make('time.create');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		return $this->makeTime(Input::all());
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		return Time::find($id);
        //return View::make('time.show');
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
        return View::make('time.edit');
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$input = Input::all();
		$input['id'] = $id;
		
		return $this->makeTime($input);
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}
	
	protected function makeTime($input) {
		if ( 
			( isset($input['user']) || isset ($input['user_id']) ) && 
			isset($input['project_id']) && 
			isset($input['hrs']) && 
			isset($input['date'])
		) {
		
			if ( !isset($input['user_id']) ) {
				$username = $input['user']['username'];
				$user = User::where('username','=',$username)->get();
				
				if($user->count() > 0 ) {
					$user_id = $user->first()->id;
				}
				else {
					return Response::json(array('flash'=>'Could not find the user ' + $username + ' to add time to.'), 500);
				}
			}
			else {
				$user_id = $input['user_id'];
			}
			
			if ( isset ($input['id']) ) {
				$t = Time::find($input['id']);
				
				if ( !$t ) return Response::json(array('flash'=>'Could not find time record to update.'), 500);
			}
			else {
				$t = new Time();
			}
			
			$t->user_id = $user_id;
			$t->project_id = $input['project_id'];
			$t->hrs = $input['hrs'];
			$t->comment = isset($input['comment']) ? $input['comment'] : '';
			$t->date = $input['date'];
			
			$t->save();
			
			return Response::json(array('flash'=>'Added Time!', 'time'=>$t));
			
		}
		else {
			return Response::json(array('flash'=>'Missing information. Could not add time.'), 500);
		}
	}

}
