<?php

class ProjectTableSeeder extends Seeder {

	public function run()
	{
		// Uncomment the below to wipe the table clean before populating
		// DB::table('projects')->truncate();

		$projects = array(
			'name' => 'First Project',
            'basecamp_url' => '',
            'company'		=> 'A Company',
            'created_at'	=> new DateTime(),
            'updated_at'	=> new DateTime()
		);

		// Uncomment the below to run the seeder
		DB::table('projects')->insert($projects);
	}

}
