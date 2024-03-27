<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class Client extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable,SoftDeletes;
    protected $table = "clients";
    protected $fillable = [
        'username','name','phone','address','CNN','email','password'
    ];
    protected $hidden = ['password'];
    public function commands()
    {
        return $this->hasMany(ClientCommand::class,'client_id');
    }
}
