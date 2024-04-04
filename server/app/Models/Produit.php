<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Produit extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'produits';
    protected $fillable = [
        'name','image','description','prix_achat','prix_vendre','qty','fourniseur_id','category_id',
        'date_fab','date_exp','promotion_id'
    ];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function fourniseur()
    {
        return $this->belongsTo(Fourniseur::class);
    }
    public function promotion()
    {
        return $this->belongsTo(Promotion::class);
    }
    public function calculTotalAmount($qty)
    {
        if ($this->promotion !== null && $this->promotion->pourcentage !== null) {
            $discountedPrice = $this->prix_vendre * (1 - ($this->promotion->pourcentage / 100));
            return $discountedPrice * $qty;
        } else {
            return $this->prix_vendre * $qty;
        }
    }
    public function finalPrice()
    {
        return $this->promotion ? $this->prix_vendre - ($this->prix_vendre * ($this->promotion->pourcentage / 100)) : $this->prix_vendre;
    }

}
