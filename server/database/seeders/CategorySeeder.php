<?php

namespace Database\Seeders;

use App\Models\Category;
use Faker\Factory as Faker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $data = [];

        for ($i = 0; $i < 20; $i++) {
            $data[] = [
                'name' => $faker->title,
                'image' => $faker->imageUrl()
            ];
        }
        foreach ($data as $category){
            Category::create($category);
        }
    }
}
