<?php

class TimeTableSeeder extends Seeder {

	public function run()
	{
		// Uncomment the below to wipe the table clean before populating
		// DB::table('times')->truncate();

		$times = array(
			'user_id' => 1,
            'project_id' => 1,
            'hrs'		=> 1.25,
            'comment'	=> 'A great time!',
            'created_at'	=> new DateTime(),
            'updated_at'	=> new DateTime()
		);

		// Uncomment the below to run the seeder
		DB::table('times')->insert($times);
	}

}
