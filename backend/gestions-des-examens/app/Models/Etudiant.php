<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    use HasFactory;

    protected $table = 'etudiants';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'niveau', // ex: "L1", "M1"
        'groupe', // ex: "Groupe 1"
        'specialite', // Facultatif, peut être déduit du niveau ou explicite
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
