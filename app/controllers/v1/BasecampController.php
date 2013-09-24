<?php

namespace v1;

use BaseController;
use App;
use Project;
use Company;
use User;
use Hash;
use Projectpersons;
use Clevelandconsulting\Basecamp\Basecamp;


class BasecampController extends BaseController {
	
	function getBasecampUri() {
		$b = App::make('basecamp');
		return $b->getBaseUri();
		//dd($b);
	}
	
	function getAllCompanies() {
		$b = App::make('basecamp'); //
		$companies = $b->getAllCompanies();
		
		return $companies;
	}
	
	function updateAllProjects() {
		$b = App::make('basecamp'); //
		$bc_projects = $b->getAllProjects();
		
		foreach($bc_projects as $bc_project) {
		
			//update the company
			$bc_company = $bc_project['company'];
			//dd((string) $company->name[0]);
			
			$company_basecamp_id = (integer)$bc_company->id[0];
			
			$companies = Company::where('basecamp_id','=',$company_basecamp_id);
			
			if($companies->count()>0) {
				$company = $companies->first();
			}
			else {
				$company = new Company();
				$company->basecamp_id = $company_basecamp_id;
			}
			
			$company->name = (string) $bc_company->name[0];
			
			$company->save();
			
			$company_id = $company->id;
		
			//update the project
			$projects = Project::where('basecamp_id','=',$bc_project['id'])->get();
			
			if($projects->count()>0) {
				$project = $projects->first();
			}
			else {
				$project = new Project();
				$project->basecamp_id = $bc_project['id'];
			}
			
			$project->name = $bc_project['name'];
			$project->company_id = $company_id;
			$project->basecamp_url = $bc_project['start_page'];
			$project->status = $bc_project['status'];
		
			$project->save();
			
			$project_id = $project->id;
			
			//Add the permissions
			
			$bc_people = $b->getPersonsInstance()->startAllByProjectId($bc_project['__id']);
			
			foreach($bc_people as $bc_person) {
				$id = $bc_person->getId()->get();
				
				$users = User::where('basecamp_id','=',$id)->get();
				if ( $users->count()>0 ) {			
					$user_id = $users->first()->id;
					$projectpersons = Projectpersons::where('user_id','=',$user_id)->where('project_id','=',$project_id)->get();
					
					if (! ($projectpersons->count() > 0) ) {
						$projectperson = new Projectpersons();
						$projectperson->user_id = $user_id;
						$projectperson->project_id = $project_id;
						
						$projectperson->save();
						
					}
				}
			}
			
		}
		
		return array('flash'=>'Updated!');
		
	}
	
	//802836
	function updateAllPeople($companyId) {
		$tempPass = Hash::make('pass');
		$b = App::make('basecamp');
		$persons = $b->getPersonsInstance()->startAll();
		
		$all = array();
		foreach($persons as $person) {
			if ( (integer) $person->getCompanyId()->get() == $companyId ) {
				$basecamp_user_id = $person->getId()->get();
				
				$users = User::where('basecamp_id','=',$basecamp_user_id)->get();
				
				if($users->count()>0) {
					$user = $users->first();
				}
				else {
					$user = new User();
					$user->basecamp_id = $basecamp_user_id;
					$user->password = $tempPass;
					$user->username = $person->getUsername();
				}
				
				$user->first_name = $person->getFirstname();
				$user->last_name = $person->getLastname();
				$user->email = $person->getEmailAddress();
				
				$user->save();
			}
		}
		
		return array('flash'=>'Updated!');

	}
}