<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PharmacienCommand extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'pharmacien_command';
    protected $fillable = [
        'pharmacien_id','status','total','date_livred_prevenu','date_livred',
        'userInformation','shippingAddress','paymentInfo'
    ];

    public function pharmacien()
    {
        return $this->belongsTo(Pharmacien::class);
    }
    public function produits()
    {
        return $this->belongsToMany(Produit::class ,'pharmacien_command_produits')->withPivot(['qty','total']);
    }
}
