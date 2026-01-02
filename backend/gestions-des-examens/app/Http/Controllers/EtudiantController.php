<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class EtudiantController extends Controller
{
    public function index()
    {
        // On charge la relation 'user'
        $etudiants = Etudiant::with('user')->get();
        return response()->json($etudiants);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:100',
            'prenom' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email',
            'identifiant' => 'required|string|unique:users,identifiant',
            'password' => 'required|string|min:4',
            'niveau' => 'required|string',
            // code (matricule) est optionnel dans la requête, s'il est fourni on l'utilise, sinon on génère
            'code' => 'nullable|string|unique:users,matricule',
            'groupe' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            DB::beginTransaction();

            // Génération matricule si absent
            $matricule = $request->code ?: ('ETU' . time());

            // 1. Créer User
            $user = User::create([
                'matricule' => $matricule,
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'email' => $request->email,
                'identifiant' => $request->identifiant,
                'password' => $request->password, // Mutator hashes it
                'role' => 'etudiant',
                'date_naissance' => $request->dateNaissance, // Si la colonne existe (sinon ignoré si pas fillable)
            ]);

            // 2. Créer Etudiant
            $etudiant = Etudiant::create([
                'user_id' => $user->id,
                'niveau' => $request->niveau,
                'groupe' => $request->groupe,
            ]);

            DB::commit();
            $etudiant->load('user');

            return response()->json(['message' => 'Étudiant ajouté', 'etudiant' => $etudiant], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Erreur technique: ' . $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            DB::beginTransaction();
            $etudiant = Etudiant::find($id);
            if (!$etudiant) {
                return response()->json(['message' => 'Étudiant introuvable'], 404);
            }

            $user = User::find($etudiant->user_id);
            if ($user) {
                $user->delete();
            }
            // Cascade delete normally handles etudiant deletion but safe to explicit
            if(Etudiant::find($id)) {
                $etudiant->delete();
            }

            DB::commit();
            return response()->json(['message' => 'Étudiant supprimé']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Erreur suppression: ' . $e->getMessage()], 500);
        }
    }
}
