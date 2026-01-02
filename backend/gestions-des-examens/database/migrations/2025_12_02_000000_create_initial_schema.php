<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Users
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('matricule', 50)->unique();
            $table->string('nom', 100);
            $table->string('prenom', 100);
            $table->string('email', 255)->unique();
            $table->string('identifiant', 100)->unique();
            $table->string('password', 255);
            $table->enum('role', ['chef_departement', 'planificateur', 'enseignant', 'etudiant']);
            $table->date('date_naissance')->nullable();
            $table->text('bio')->nullable();
            $table->string('photo_profil', 255)->nullable();
            $table->enum('statut', ['actif', 'inactif', 'en_conge'])->default('actif');
            $table->timestamp('date_creation')->useCurrent();
            $table->timestamp('last_login')->nullable();
            $table->string('reset_token', 255)->nullable();
            $table->timestamp('reset_token_expiry')->nullable();
        });

        // Niveaux
        Schema::create('niveaux', function (Blueprint $table) {
            $table->id();
            $table->string('code', 10)->unique();
            $table->string('nom', 50);
            $table->enum('cycle', ['Licence', 'Master', 'Ingenieur']);
            $table->integer('annee');
        });

        // Specialites
        Schema::create('specialites', function (Blueprint $table) {
            $table->id();
            $table->string('code', 10)->unique();
            $table->string('nom', 100);
            $table->unsignedBigInteger('niveau_id')->nullable();

            $table->foreign('niveau_id')->references('id')->on('niveaux')->onDelete('cascade');
        });

        // Modules
        Schema::create('modules', function (Blueprint $table) {
            $table->id();
            $table->string('code_module', 50)->unique();
            $table->string('nom_module', 255);
            $table->decimal('coefficient', 5, 2);
            $table->unsignedBigInteger('specialite_id');
            $table->enum('semestre', ['S1', 'S2']);
            $table->boolean('a_cc')->default(true);
            $table->boolean('a_tp')->default(false);
            $table->boolean('a_examen')->default(true);

            $table->foreign('specialite_id')->references('id')->on('specialites')->onDelete('cascade');
            $table->index(['specialite_id', 'semestre'], 'idx_specialite_semestre');
        });

        // Salles
        Schema::create('salles', function (Blueprint $table) {
            $table->id();
            $table->string('code_salle', 20)->unique();
            $table->string('nom_salle', 100);
            $table->integer('capacite');
            $table->enum('statut', ['disponible', 'occupee', 'maintenance'])->default('disponible');
        });

        // Groupes
        Schema::create('groupes', function (Blueprint $table) {
            $table->id();
            $table->string('nom_groupe', 50);
            $table->unsignedBigInteger('specialite_id');
            $table->integer('capacite_max')->nullable();

            $table->foreign('specialite_id')->references('id')->on('specialites')->onDelete('cascade');
            $table->unique(['nom_groupe', 'specialite_id'], 'unique_groupe_specialite');
        });

        // Enseignants
        Schema::create('enseignants', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->unique();
            $table->integer('surveillance_max')->default(10);
            $table->enum('statut', ['actif', 'en_conge', 'inactif'])->default('actif');

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        // ChefDepartement
        Schema::create('chef_departement', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->unique();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        // Planificateurs
        Schema::create('planificateurs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->unique();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        // Etudiants
        Schema::create('etudiants', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->unique();
            $table->unsignedBigInteger('groupe_id');
            $table->unsignedBigInteger('specialite_id');
            $table->integer('annee_inscription');

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('groupe_id')->references('id')->on('groupes');
            $table->foreign('specialite_id')->references('id')->on('specialites');
        });

        // Examens
        Schema::create('examens', function (Blueprint $table) {
            $table->id();
            $table->string('code_examen', 50)->unique();
            $table->unsignedBigInteger('module_id');
            $table->enum('type_examen', ['EF', 'CC', 'TP', 'RATT_EF', 'REMP_EF', 'REMP_CC', 'REMP_TP']);
            $table->date('date_examen');
            $table->time('heure_debut');
            $table->integer('duree_minutes');
            $table->unsignedBigInteger('salle_id');
            $table->unsignedBigInteger('groupe_id');
            $table->unsignedBigInteger('enseignant_responsable_id');
            $table->enum('statut', ['planifie', 'confirme', 'annule', 'termine'])->default('planifie');
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamp('date_creation')->useCurrent();

            $table->foreign('module_id')->references('id')->on('modules')->onDelete('cascade');
            $table->foreign('salle_id')->references('id')->on('salles');
            $table->foreign('groupe_id')->references('id')->on('groupes');
            $table->foreign('enseignant_responsable_id')->references('id')->on('enseignants');
            $table->foreign('created_by')->references('id')->on('users');

            $table->index('date_examen', 'idx_date_examen');
            $table->index('statut', 'idx_statut');
            $table->index(['salle_id', 'date_examen'], 'idx_salle_date');
        });

        // SurveillantsExamens
        Schema::create('surveillants_examens', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('examen_id');
            $table->unsignedBigInteger('enseignant_id');

            $table->foreign('examen_id')->references('id')->on('examens')->onDelete('cascade');
            $table->foreign('enseignant_id')->references('id')->on('enseignants');
            $table->unique(['examen_id', 'enseignant_id'], 'unique_surveillant_examen');
        });

        // Reclamations
        Schema::create('reclamations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('enseignant_id');
            $table->unsignedBigInteger('examen_id');
            $table->enum('raison', ['conflit_horaire', 'indisponibilite', 'autre']);
            $table->text('message');
            $table->enum('statut', ['en_attente', 'accepte', 'refuse'])->default('en_attente');
            $table->unsignedBigInteger('traite_par')->nullable();
            $table->timestamp('date_reclamation')->useCurrent();
            $table->timestamp('date_traitement')->nullable();

            $table->foreign('enseignant_id')->references('id')->on('enseignants');
            $table->foreign('examen_id')->references('id')->on('examens')->onDelete('cascade');
            $table->foreign('traite_par')->references('id')->on('users');

            $table->index('statut', 'idx_statut_reclamations');
        });

        // Publications
        Schema::create('publications', function (Blueprint $table) {
            $table->id();
            $table->string('titre', 255);
            $table->text('contenu');
            $table->enum('type_publication', ['annonce', 'planning', 'decalage', 'autre']);
            $table->string('fichier_pdf', 255)->nullable();
            $table->unsignedBigInteger('publie_par');
            $table->timestamp('date_publication')->useCurrent();
            $table->boolean('visible_tous')->default(true);

            $table->foreign('publie_par')->references('id')->on('users');
            $table->index('date_publication', 'idx_date_publication');
        });

        // PublicationsSpecialites
        Schema::create('publications_specialites', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('publication_id');
            $table->unsignedBigInteger('specialite_id');

            $table->foreign('publication_id')->references('id')->on('publications')->onDelete('cascade');
            $table->foreign('specialite_id')->references('id')->on('specialites');
            $table->unique(['publication_id', 'specialite_id'], 'unique_publication_specialite');
        });

        // Notifications
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('titre', 255);
            $table->text('message');
            $table->enum('type_notification', ['surveillance', 'reclamation', 'publication', 'examen', 'systeme']);
            $table->unsignedBigInteger('reference_id')->nullable();
            $table->boolean('lue')->default(false);
            $table->timestamp('date_notification')->useCurrent();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->index(['user_id', 'lue'], 'idx_user_lue');
        });

        // ParametresUtilisateur
        Schema::create('parametres_utilisateur', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->unique();
            $table->boolean('notifications_email')->default(true);
            $table->boolean('notifications_site')->default(true);
            $table->enum('theme', ['clair', 'sombre', 'auto'])->default('clair');
            $table->enum('langue', ['fr', 'en', 'ar'])->default('fr');

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        // Logs
        Schema::create('logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('action', 100);
            $table->string('table_concernee', 50)->nullable();
            $table->unsignedBigInteger('entite_id')->nullable();
            $table->json('anciennes_valeurs')->nullable();
            $table->json('nouvelles_valeurs')->nullable();
            $table->timestamp('date_action')->useCurrent();
            $table->string('ip_address', 45)->nullable();

            $table->foreign('user_id')->references('id')->on('users');
        });

        // Optional: add the CHECK constraint for duree_minutes if DB supports it
        try {
            DB::statement("ALTER TABLE examens ADD CONSTRAINT check_duree_minutes CHECK (duree_minutes IN (30,45,60,75,90,120))");
        } catch (\Exception $e) {
            // ignore if the driver/engine does not support check constraints
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('logs');
        Schema::dropIfExists('parametres_utilisateur');
        Schema::dropIfExists('notifications');
        Schema::dropIfExists('publications_specialites');
        Schema::dropIfExists('publications');
        Schema::dropIfExists('reclamations');
        Schema::dropIfExists('surveillants_examens');
        Schema::dropIfExists('examens');
        Schema::dropIfExists('etudiants');
        Schema::dropIfExists('planificateurs');
        Schema::dropIfExists('chef_departement');
        Schema::dropIfExists('enseignants');
        Schema::dropIfExists('groupes');
        Schema::dropIfExists('salles');
        Schema::dropIfExists('modules');
        Schema::dropIfExists('specialites');
        Schema::dropIfExists('niveaux');
        Schema::dropIfExists('users');
    }
};
