<?php

namespace Database\Seeders;

use App\Models\Client;
use Faker\Factory as Faker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $data = [];

        for ($i = 0; $i < 35; $i++) {
            $data[] = [
                'username' => $faker->userName,
                'name' => $faker->company,
                'phone' => $faker->phoneNumber,
                'address' => $faker->address,
                'CNN' => 'C'.$i.$i*2,
                'email' => $faker->email,
                'password' => Hash::make('password')
            ];
        }
        foreach ($data as $client){
            Client::create($client);
        }
    }
}
