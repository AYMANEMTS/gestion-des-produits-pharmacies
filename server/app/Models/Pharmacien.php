<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Pharmacien extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable,SoftDeletes;
    protected $table = 'pharmaciens';
    protected $fillable = [
            'username','name','phone','address','pharmacy_id','CNN','email','password'
    ];
    protected $hidden = ['password'];
    public function pharmacy()
    {
        return $this->belongsTo(Pharmacy::class);
    }
    public function commands()
    {
        return $this->hasMany(PharmacienCommand::class,'pharmacien_id');
    }
}
