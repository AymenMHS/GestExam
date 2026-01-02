<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

echo "Correction des mots de passe utilisateurs...\n\n";

$users = [
    // [ Identifiant, Email, NouveauMotDePasse ]
    ['admin', 'admin@example.com', 'Admin123'],
    ['omar',  'omar@univ.local',   'Omar2025'],
    ['etud',  'etud1@univ.local',  'Etude123'],
    ['prof',  'prof@univ.local',   'Prof123!'], // Celui que j'ai créé tout à l'heure
];

foreach ($users as $u) {
    [$identifiant, $email, $password] = $u;
    
    // Cherche par email ou identifiant
    $user = User::where('email', $email)->orWhere('identifiant', $identifiant)->first();

    if ($user) {
        echo "Mise à jour de : " . $user->name . " ($email)\n";
        // On force le hashage explicite via bcrypt pour être sûr
        $user->password = Hash::make($password);
        $user->save();
        echo " -> Mot de passe corrigé : $password\n";
    } else {
        echo "Utilisateur non trouvé pour : $email / $identifiant - Ignoré.\n";
    }
}

echo "\nFait ! Vous pouvez vous connecter.";
