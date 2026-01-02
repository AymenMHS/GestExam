<?php

namespace App\Http\Controllers;

use App\Models\Salle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SalleController extends Controller
{
    // Lister toutes les salles
    public function index()
    {
        $salles = Salle::all();
        return response()->json($salles);
    }

    // Ajouter une nouvelle salle
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'code_salle' => 'required|string|unique:salles,code_salle|max:20',
            'nom_salle'  => 'required|string|max:100',
            'capacite'   => 'required|integer|min:1',
            'statut'     => 'required|in:disponible,occupee,maintenance',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $salle = Salle::create([
            'code_salle' => $request->code_salle,
            'nom_salle'  => $request->nom_salle,
            'capacite'   => $request->capacite,
            'statut'     => $request->statut,
        ]);

        return response()->json(['message' => 'Salle ajoutée avec succès', 'salle' => $salle], 201);
    }

    // Mettre à jour (optionnel, prêt pour futur usage)
    public function update(Request $request, $id)
    {
        $salle = Salle::find($id);
        if (!$salle) return response()->json(['message' => 'Salle introuvable'], 404);

        $validator = Validator::make($request->all(), [
            'code_salle' => 'string|unique:salles,code_salle,'.$id.'|max:20',
            'nom_salle'  => 'string|max:100',
            'capacite'   => 'integer|min:1',
            'statut'     => 'in:disponible,occupee,maintenance',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $salle->update($request->all());

        return response()->json(['message' => 'Salle mise à jour', 'salle' => $salle]);
    }

    // Supprimer
    public function destroy($id)
    {
        $salle = Salle::find($id);
        if (!$salle) return response()->json(['message' => 'Salle introuvable'], 404);

        $salle->delete();
        return response()->json(['message' => 'Salle supprimée avec succès']);
    }
}
