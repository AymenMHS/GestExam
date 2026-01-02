<?php
try {
    $email = 'prof@univ.local';
    $u = App\Models\User::where('email', $email)->first();
    if ($u) {
        // Update password just in case
        $u->password = 'Prof123!';
        $u->save();
        echo "User updated: $email / Prof123!\n";
    } else {
        $u = App\Models\User::create([
             'nom' => 'Professeur',
             'prenom' => 'Test',
             'email' => $email,
             'identifiant' => 'prof',
             'password' => 'Prof123!',
             'role' => 'enseignant', 
             'matricule' => 'ENS001'
        ]);
        echo "User created: $email / Prof123!\n";
    }
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
