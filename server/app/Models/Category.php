<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = "categories";
    protected $fillable = [
        'name','image'
    ];
    public function produits()
    {
        return $this->hasMany(Produit::class);
    }
    public function getTopCategories($limit = 9)
    {
        return Category::withCount('produits')
            ->orderByDesc('produits_count')
            ->limit($limit)
            ->with(['produits','produits.category','produits.promotion'])->get();
    }
}
