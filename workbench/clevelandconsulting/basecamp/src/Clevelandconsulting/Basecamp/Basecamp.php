<?php

namespace Clevelandconsulting\Basecamp;

use sirprize\basecamp\Service;

class Basecamp extends Service {
	
	public static function foo() {
		return 'foo';
	}
	
	public function getAllProjects() {
		$bc_projects = $this->getProjectsInstance()->startAll();
	
		$projects = array();
	
		foreach($bc_projects as $bc_project)
		{
			//dd($bc_project->getId());
			$id = $bc_project->getId()->get();
			$name = $bc_project->getName();
			
			$project = array(
				'name' 		=> $name,
				'company'	=> $bc_project->getCompany(),
				'id'		=> (integer) $id,
				'status'	=> $bc_project->getStatus(),
				'start_page'=> $id . "-" . str_replace(array(" ","/"), "-", strtolower($name)) . "/" . $bc_project->getStartPage(),
				'__id'		=> $bc_project->getId()
			);
			
			array_push($projects,$project);
		}
		
		return $projects;
	}
	
	public function getAllCompanies() {
		$projects = $this->getProjectsInstance()->startAll();
	
		$companies = array();
		$ids = array();
	
		foreach($projects as $project)
		{
			$bc_company = $project->getCompany();
			//dd((string) $bc_company->id[0]);
			//dd($bc_project->getId());
			$id = (integer) $bc_company->id[0];
			
			if ( !in_array($id,$ids) ) {
				array_push($ids,$id);
				
				$name = (string) $bc_company->name[0];
				$company = array(
					'id'		=> $id,
					'name' 		=> $name
				);
				
				array_push($companies,$company);
			}
		}
		
		return $companies;
	}
}