<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Fourniseur;
use App\Models\Produit;
use Faker\Factory as Faker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProduitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $fourniseurIds = Fourniseur::all()->pluck('id');
        $categoryIds = Category::all()->pluck('id');
        $data = [];

        for ($i = 0; $i < 30; $i++) {
            $randomFourniseurId = $faker->randomElement($fourniseurIds);
            $randomCategoryId = $faker->randomElement($categoryIds);
            $data[] = [
                'name' => $faker->word,
                'image' => $faker->imageUrl(),
                'description' => $faker->sentence(),
                'prix_achat' => $faker->randomFloat(2, 1, 1000),
                'prix_vendre' => $faker->randomFloat(2, 1, 2000),
                'qty' => $faker->numberBetween(1, 400),
                'fourniseur_id' => $randomFourniseurId,
                'category_id' => $randomCategoryId,
                'date_fab' => $faker->date(),
                'date_exp' => $faker->dateTimeBetween('now', '+1 year')->format('Y-m-d'),
            ];
        }
        foreach ($data as $produit){
            Produit::create($produit);
        }
    }
}
