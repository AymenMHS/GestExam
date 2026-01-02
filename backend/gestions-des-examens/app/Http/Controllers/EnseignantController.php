<?php

namespace App\Http\Controllers;

use App\Models\Enseignant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class EnseignantController extends Controller
{
    // Lister tous les enseignants avec leurs infos user
    public function index()
    {
        $enseignants = Enseignant::with('user')->get();
        return response()->json($enseignants);
    }

    // Ajouter un nouvel enseignant
    public function store(Request $request)
    {
        // Validation basique
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:100',
            'prenom' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email',
            'identifiant' => 'required|string|unique:users,identifiant',
            'password' => 'required|string|min:4',
            'surveillancesMax' => 'required|integer|min:0',
            'statut' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            DB::beginTransaction();

            // 1. Créer le User
            $user = User::create([
                // Génération d'un matricule car la colonne est NOT NULL
                'matricule' => 'ENS' . time(), 
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'email' => $request->email,
                'identifiant' => $request->identifiant,
                'password' => $request->password, // Sera hashé par le mutateur User
                'role' => 'enseignant',
            ]);

            // Normalisation du statut
            $statutMap = [
                'Actif' => 'actif',
                'En congé' => 'en_conge',
                'Inactif' => 'inactif'
            ];
            $statutDb = $statutMap[$request->statut] ?? strtolower($request->statut);
            
            // Validations statut SQL ENUM
            if(!in_array($statutDb, ['actif', 'en_conge', 'inactif'])) {
                $statutDb = 'actif'; // Fallback
            }

            // 2. Créer l'Enseignant
            $enseignant = Enseignant::create([
                'user_id' => $user->id,
                'surveillance_max' => $request->surveillancesMax,
                'statut' => $statutDb,
            ]);

            DB::commit();

            $enseignant->load('user');

            return response()->json(['message' => 'Enseignant ajouté avec succès', 'enseignant' => $enseignant], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            // Retourner l'exception exacte pour debug
            return response()->json(['message' => 'Erreur technique: ' . $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $enseignant = Enseignant::find($id);
        if (!$enseignant) {
            return response()->json(['message' => 'Enseignant introuvable'], 404);
        }

        try {
            DB::beginTransaction();
            $user = User::find($enseignant->user_id);
            if ($user) {
                $user->delete(); 
            }
            // Au cas où cascade ne marche pas
            if(Enseignant::find($id)) {
                $enseignant->delete();
            }

            DB::commit();
            return response()->json(['message' => 'Enseignant supprimé avec succès']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Erreur suppression: ' . $e->getMessage()], 500);
        }
    }
}
