<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salle extends Model
{
    use HasFactory;

    protected $table = 'salles';

    public $timestamps = false; // Désactivé selon la structure SQL fournie

    protected $fillable = [
        'code_salle',
        'nom_salle',
        'capacite',
        'statut',
    ];
}
