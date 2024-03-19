<?php

namespace Database\Seeders;

use App\Models\Fourniseur;
use Faker\Factory as Faker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FourniseurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $data = [];

        for ($i = 0; $i < 10; $i++) {
            $data[] = [
                'name' => $faker->company,
                'phone' => $faker->phoneNumber,
                'address' => $faker->address,
                'contact' => $faker->companyEmail,
                'description' => $faker->titleMale .' '. $faker->titleFemale
            ];
        }
        foreach ($data as $fourniseur){
            Fourniseur::create($fourniseur);
        }
    }
}
