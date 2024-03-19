<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Produit extends Model
{
    use HasFactoryn,SoftDeletes;
    protected $table = 'produits';
    protected $fillable = [
        'name','image','description','prix_achat','prix_vendre','qty','fourniseur_id','category_id',
        'date_fab','date_exp'
    ];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function fourniseur()
    {
        return $this->belongsTo(Fourniseur::class);
    }
    public function commandsClient()
    {
        return $this->belongsToMany(ClientCommand::class);
    }
    public function commandsPharmacien()
    {
        return $this->belongsToMany(PharmacienCommand::class);
    }
}
