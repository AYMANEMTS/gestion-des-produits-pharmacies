<?php

namespace Database\Seeders;

use App\Models\Pharmacien;
use App\Models\Pharmacy;
use Faker\Factory as Faker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PharmacienSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $data = [];
        $pharmacyIds = Pharmacy::pluck('id')->toArray();
        for ($i = 0; $i < 30; $i++) {
            $randomPharmacyId = $faker->randomElement($pharmacyIds);
            $data[] = [
                'username' => $faker->userName,
                'name' => $faker->company,
                'phone' => $faker->phoneNumber,
                'address' => $faker->address,
                'CNN' => 'C'.$i.$i*2,
                'pharmacy_id' => $randomPharmacyId,
                'email' => $faker->email,
                'password' => Hash::make('password')
            ];
        }
        foreach ($data as $pharmacien){
            Pharmacien::create($pharmacien);
        }
    }
}
