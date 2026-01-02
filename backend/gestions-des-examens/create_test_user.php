<?php
try {
    $user = App\Models\User::first();
    if ($user) {
        echo "User found: " . $user->email . "\n";
    } else {
        echo "No users found. Creating admin...\n";
        $u = App\Models\User::create([
             'nom' => 'Admin',
             'prenom' => 'System',
             'email' => 'admin@univ.local',
             'identifiant' => 'admin',
             'password' => 'Admin123',
             'role' => 'Chef Département', // Attention aux majuscules/espaces, AuthContext map 'chef_departement' -> 'Chef Département'.
                                           // Mais wait, AuthContext map les roles Laravel VERS React labels.
                                           // Dans AuthController, validateur attend: 'role' => 'required|in:chef_departement,planificateur,enseignant,etudiant'.
                                           // Donc je dois utiliser 'chef_departement'.
             'role' => 'chef_departement', 
             'matricule' => 'ADM001'
        ]);
        echo "User created: " . $u->email . " / Admin123\n";
    }
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
