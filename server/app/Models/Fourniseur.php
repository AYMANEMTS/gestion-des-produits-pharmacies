<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Fourniseur extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'fourniseurs';
    protected $fillable = [
        'name','phone','address','contact','description'
    ];
    public function produits()
    {
        return $this->hasMany(Produit::class);
    }
}
