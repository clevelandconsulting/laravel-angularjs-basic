<?php

class UserTableSeeder extends Seeder {

	public function run()
	{
		// Uncomment the below to wipe the table clean before populating
		// DB::table('user')->truncate();

		$user = array(
			'username' => 'max',
            'password' => Hash::make('my_pass'),
            'email'		=> 'email@email.com'
		);

		// Uncomment the below to run the seeder
		//DB::table('users')->insert($user);
	}

}
