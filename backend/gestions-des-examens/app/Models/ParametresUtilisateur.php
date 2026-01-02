<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParametresUtilisateur extends Model
{
    use HasFactory;

    protected $table = 'parametres_utilisateur';

    protected $fillable = [
        'user_id',
        'notifications_email',
        'notifications_site',
        'theme',
        'langue'
    ];

    protected $casts = [
        'notifications_email' => 'boolean',
        'notifications_site' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}