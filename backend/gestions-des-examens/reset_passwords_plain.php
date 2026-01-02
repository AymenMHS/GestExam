<?php

use App\Models\User;

echo "Passage des mots de passe en CLAIR (Mode TP simple)...\n\n";

$users = [
    // [ Identifiant, Email, MotDePasseEnClair ]
    ['admin', 'admin@example.com', 'Admin123'],
    ['prof',  'prof@univ.local',   'Prof123!'],
];

foreach ($users as $u) {
    [$identifiant, $email, $password] = $u;
    
    // On cherche l'utilisateur
    $user = User::where('email', $email)->orWhere('identifiant', $identifiant)->first();

    if ($user) {
        // IMPORTANT: Pour faire ça, il faut que le mutator setPasswordAttribute ne hashe pas automatiquement.
        // On va faire un update brut via la méthode update() en espérant que le modèle ne l'intercepte pas trop,
        // ou alors on modifie l'attribut directement.
        
        // Comme dans User.php j'ai un setPasswordAttribute, je dois le contourner temporairement.
        // Le plus simple c'est de faire un update SQL brut.
        
        DB::table('users')->where('id', $user->id)->update(['password' => $password]);
        
        echo " -> $identifiant : $password (OK)\n";
    } else {
        echo "Utilisateur $identifiant non trouvé.\n";
    }
}
