<?php

class Project extends Eloquent {
	protected $guarded = array();

	public static $rules = array();
	
	public function users() 
	{
		return $this->belongsToMany('User','Projectpersons');
	}
	
	public function company()
	{
		return $this->belongsTo('Company');
	}
	
	public function times()
	{
		return $this->hasMany('Time')->with('user');
	}
}
