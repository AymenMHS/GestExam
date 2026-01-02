<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // register (optionnel)
    public function register(Request $request)
    {
        $v = Validator::make($request->all(), [
            'email' => 'required|email|unique:users,email',
            'identifiant' => 'required|unique:users,identifiant',
            'password' => 'required|min:6|confirmed',
            'nom' => 'required',
            'prenom' => 'required',
            'role' => 'required|in:chef_departement,planificateur,enseignant,etudiant',
        ]);

        if ($v->fails()) {
            return response()->json(['errors' => $v->errors()], 422);
        }

        $data = $v->validated();
        $user = User::create([
            'matricule' => $data['identifiant'] . '-' . Str::random(4),
            'nom' => $data['nom'],
            'prenom' => $data['prenom'],
            'email' => $data['email'],
            'identifiant' => $data['identifiant'],
            'password' => $data['password'], // mutator hashera
            'role' => $data['role'],
        ]);

        return response()->json(['message' => 'Registered', 'user' => $user], 201);
    }

    // login uses session + Sanctum for SPA
    // login (Version simplifiée TP - Mots de passe en clair)
    public function login(Request $request)
    {
        $identifiant = $request->input('identifiant') ?? $request->input('email');
        $password = $request->input('password');

        if (!$identifiant || !$password) {
             return response()->json(['message' => 'Identifiant et mot de passe requis'], 422);
        }

        // 1. Chercher l'utilisateur (par email ou identifiant)
        $user = User::where('email', $identifiant)
                    ->orWhere('identifiant', $identifiant)
                    ->first();

        // 2. Comparaison SIMPLE (Texte clair)
        // ATTENTION : Uniquement pour TP/Dev
        if ($user && $user->password === $password) {
            
            // Connecter manuellement l'utilisateur pour créer la session
            Auth::login($user);
            $request->session()->regenerate();

            return response()->json(['message' => 'Logged in', 'user' => $user]);
        }

        return response()->json(['message' => 'Identifiants incorrects (Mode simple)'], 401);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out']);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    // profile update minimal
    // Modifié pour inclure validation et nouveaux champs
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $v = Validator::make($request->all(), [
            'email' => 'required|email|unique:users,email,'.$user->id,
            'nom' => 'required',
            'prenom' => 'required',
            'adresse' => 'nullable|string',
            'specialite' => 'nullable|string',
            'bio' => 'nullable|string',
        ]);

        if ($v->fails()) {
            return response()->json(['errors' => $v->errors()], 422);
        }

        // Récupérer les données texte
        $data = $request->only(['nom', 'prenom', 'bio', 'email', 'adresse', 'specialite', 'date_naissance']);

        // GESTION UPLOAD IMAGE
        if ($request->hasFile('photo')) {
            // 1. Supprimer l'ancienne photo si ce n'est pas une photo par défaut
            // (Optionnel, à faire plus tard pour nettoyer)

            // 2. Stocker la nouvelle photo dans storage/app/public/photos
            // php artisan storage:link doit être exécuté !
            $path = $request->file('photo')->store('photos', 'public');
            
            // 3. Générer l'URL complète
            // http://localhost:8000/storage/photos/xyz.jpg
            $url = asset('storage/' . $path);
            
            $data['photo_profil'] = $url;
        }

        $user->update($data);
        
        return response()->json(['message' => 'Profile updated', 'user' => $user]);
    }

    public function changePassword(Request $request)
    {
        $v = Validator::make($request->all(), [
            'current_password' => 'required',
            'new_password' => 'required|min:6|confirmed',
        ]);

        if ($v->fails()) {
            return response()->json(['errors'=>$v->errors()], 422);
        }

        $user = $request->user();

        if (! Hash::check($request->input('current_password'), $user->password)) {
            return response()->json(['message'=>'Current password incorrect'], 403);
        }

        $user->password = $request->input('new_password'); // mutator hashes
        $user->save();

        return response()->json(['message'=>'Password changed']);
    }

    // forgot password: create token and store in user table
    public function forgotPassword(Request $request)
    {
        $v = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email'
        ]);

        if ($v->fails()) {
            return response()->json(['errors'=>$v->errors()], 422);
        }

        $user = User::where('email', $request->email)->first();
        $token = Str::random(64);
        $user->reset_token = hash('sha256', $token);
        $user->reset_token_expiry = now()->addMinutes(60);
        $user->save();

        // ici normalement envoi d'email, pour dev on renvoie le token brut (ou le lien)
        // mais pour sécurité on renvoie message et token si dev
        return response()->json([
            'message' => 'Reset token generated',
            'reset_token' => $token // en prod supprime ceci et envoie email
        ]);
    }

    public function resetPassword(Request $request)
    {
        $v = Validator::make($request->all(), [
            'token' => 'required',
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:6|confirmed',
        ]);

        if ($v->fails()) {
            return response()->json(['errors'=>$v->errors()], 422);
        }

        $hashed = hash('sha256', $request->token);
        $user = User::where('email', $request->email)
            ->where('reset_token', $hashed)
            ->where('reset_token_expiry', '>', now())
            ->first();

        if (! $user) {
            return response()->json(['message' => 'Invalid or expired token'], 400);
        }

        $user->password = $request->password; // mutator hash
        $user->reset_token = null;
        $user->reset_token_expiry = null;
        $user->save();

        return response()->json(['message' => 'Password reset successful']);
    }
}
