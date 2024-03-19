<?php

namespace Database\Seeders;

use App\Models\Pharmacy;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class PharmacySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $data = [];

        for ($i = 0; $i < 15; $i++) {
            $data[] = [
                'name' => $faker->company,
                'address' => $faker->address,
                'contact' => $faker->phoneNumber,
            ];
        }
        foreach ($data as $pharmacy){
            Pharmacy::create($pharmacy);
        }
    }
}
