<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'users';
    public $timestamps = false; // Désactiver si les colonnes created_at/updated_at n'existent pas

    protected $fillable = [
        'matricule',
        'nom',
        'prenom',
        'email',
        'identifiant',
        'password',
        'role',
        'date_naissance',
        'bio',
        'photo_profil',
        'statut',
        'adresse',
        'specialite',
    ];

    protected $hidden = [
        'password',
        'reset_token',
    ];

    protected $casts = [
        'date_naissance' => 'date',
        'date_creation' => 'datetime',
        'last_login' => 'datetime',
    ];

    // si tu veux vérifier le mot de passe
    public function setPasswordAttribute($value)
    {
        // si le mot de passe est déjà hashé, évite de double hasher :
        if (\Illuminate\Support\Str::startsWith($value, '$2y$')) {
            $this->attributes['password'] = $value;
        } else {
            $this->attributes['password'] = bcrypt($value);
        }
    }
}
