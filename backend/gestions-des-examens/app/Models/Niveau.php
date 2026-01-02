<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Niveau extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'nom',
        'cycle',
        'annee'
    ];

    public function specialites()
    {
        return $this->hasMany(Specialite::class);
    }

    // نطاقات
    public function scopeByCycle($query, $cycle)
    {
        return $query->where('cycle', $cycle);
    }

    public function scopeByAnnee($query, $annee)
    {
        return $query->where('annee', $annee);
    }
}