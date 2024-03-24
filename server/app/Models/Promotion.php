<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Promotion extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'promotions';
    protected $fillable = [
        'name','image','pourcentage'
    ];
    public function products()
    {
        return $this->hasMany(Produit::class);
    }
}
