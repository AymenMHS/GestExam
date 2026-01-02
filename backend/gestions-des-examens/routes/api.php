<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExamenController;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\GroupeController;
use App\Http\Controllers\EnseignantController;
use App\Http\Controllers\ReclamationController;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

// Authentication routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

// Public routes
// Route::get('/publications', [PublicationController::class, 'indexPublic']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);
    
    // Dashboard
    // Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
    // Route::get('/dashboard/upcoming-exams', [DashboardController::class, 'upcomingExams']);
    
    // Examens routes
    // Route::apiResource('examens', ExamenController::class);
    // Route::post('examens/{examen}/surveillants', [ExamenController::class, 'addSurveillant']);
    // Route::delete('examens/{examen}/surveillants/{enseignant}', [ExamenController::class, 'removeSurveillant']);
    // Route::get('examens/{examen}/surveillants', [ExamenController::class, 'getSurveillants']);
    // Route::put('examens/{examen}/statut', [ExamenController::class, 'changeStatut']);
    // Route::get('examens/planning/planning', [ExamenController::class, 'planning']);
    // Route::get('examens/upcoming/upcoming', [ExamenController::class, 'upcoming']);
    
    // Salles routes
    Route::apiResource('salles', SalleController::class);
    // Route::get('salles/disponibilite/check', [SalleController::class, 'checkDisponibilite']);
    // Route::get('salles/disponibles/disponibles', [SalleController::class, 'disponibles']);
    // Route::get('salles/occupation/occupation', [SalleController::class, 'occupation']);
    // Route::put('salles/{salle}/statut', [SalleController::class, 'changeStatut']);
    
    // Modules routes
    // Route::apiResource('modules', ModuleController::class);
    // Route::get('modules/specialite/{specialiteId}', [ModuleController::class, 'bySpecialite']);
    // Route::get('modules/semestre/{semestre}', [ModuleController::class, 'bySemestre']);
    // Route::get('modules/needs-planning', [ModuleController::class, 'needsPlanning']);
    
    // Groupes routes
    // Route::apiResource('groupes', GroupeController::class);
    // Route::get('groupes/specialite/{specialiteId}', [GroupeController::class, 'bySpecialite']);
    // Route::get('groupes/{groupe}/etudiants', [GroupeController::class, 'etudiants']);
    // Route::post('groupes/{groupe}/add-etudiant', [GroupeController::class, 'addEtudiant']);
    
    // Enseignants routes
    Route::apiResource('enseignants', EnseignantController::class);
    // Route::get('enseignants/{id}/disponibilite', [EnseignantController::class, 'checkDisponibilite']);
    // Route::get('enseignants/{id}/surveillances', [EnseignantController::class, 'surveillances']);
    // Route::get('enseignants/{id}/examens-responsable', [EnseignantController::class, 'examensResponsable']);
    
    // Etudiants routes
    Route::apiResource('etudiants', EtudiantController::class);
    
    // Reclamations routes
    // Route::apiResource('reclamations', ReclamationController::class);
    // Route::post('reclamations/{reclamation}/traiter', [ReclamationController::class, 'traiter']);
    // Route::get('reclamations/enseignant/{enseignantId}', [ReclamationController::class, 'byEnseignant']);
    // Route::get('reclamations/examen/{examenId}', [ReclamationController::class, 'byExamen']);
    // Route::get('reclamations/statistiques/statistiques', [ReclamationController::class, 'statistiques']);
    
    // Publications routes
    // Route::apiResource('publications', PublicationController::class);
    // Route::get('publications/type/{type}', [PublicationController::class, 'byType']);
    // Route::get('publications/recent/recent', [PublicationController::class, 'recent']);
    // Route::post('publications/{publication}/specialites', [PublicationController::class, 'addSpecialite']);
    
    // Notifications routes
    // Route::get('/notifications', [NotificationController::class, 'index']);
    // Route::get('/notifications/unread', [NotificationController::class, 'unread']);
    // Route::put('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
    // Route::put('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
    // Route::delete('/notifications/{id}', [NotificationController::class, 'destroy']);
    
    // Paramètres
    // Route::get('/parametres', [ParametresController::class, 'show']);
    // Route::put('/parametres', [ParametresController::class, 'update']);
});