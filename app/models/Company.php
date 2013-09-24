<?php

class Company extends Eloquent {
	protected $guarded = array();

	public static $rules = array();
	
	public function projects() {
		return $this->hasMany('Project');
	}
}
