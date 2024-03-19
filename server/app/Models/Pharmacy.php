<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pharmacy extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'pharmacies';
    protected $fillable = [
      'name','address','contact'
    ];
    public function pharmaciens()
    {
        return $this->hasMany(Pharmacien::class);
    }
}
