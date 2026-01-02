<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enseignant extends Model
{
    use HasFactory;

    protected $table = 'enseignants';
    public $timestamps = false; // Pas vu de created_at/updated_at dans le SQL fourni

    protected $fillable = [
        'user_id',
        'surveillance_max',
        'statut',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
