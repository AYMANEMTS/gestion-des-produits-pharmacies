<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ClientCommand extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'client_command';
    protected $fillable = [
      'client_id','status','total','date_livred_prevenu','date_livred',
        'userInformation','shippingAddress','paymentInfo'
    ];
    public function client()
    {
        return $this->belongsTo(Client::class);
    }
    public function produits()
    {
        return $this->belongsToMany(Produit::class ,'client_command_produits')->withPivot(['qty','total','promo']);
    }
}
