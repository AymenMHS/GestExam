# Guide de Démarrage - Authentification Laravel & React

L'authentification est maintenant configurée pour relier votre frontend React à votre backend Laravel.

## 1. Prérequis Backend (Laravel)

Assurez-vous que votre base de données est configurée et que les tables sont créées.

Lancez les commandes suivantes dans le dossier `gestions-des-examens` :

```bash
# Installer les dépendances si ce n'est pas fait
composer install

# Lancer les migrations (crée les tables users, etc.)
php artisan migrate

# Lancer le serveur de développement Laravel
php artisan serve
```

Le serveur doit tourner sur `http://127.0.0.1:8000`.

## 2. Démarrage Frontend (React)

Lancez le serveur React (si ce n'est pas déjà fait) :

```bash
npm run dev
```

## 3. Test de Connexion

1. Ouvrez `http://localhost:5173/login`.
2. Utilisez un compte existant dans votre base de données Laravel.
   - Si vous n'avez pas de compte, vous pouvez en créer un via la commande `php artisan tinker` ou en insérant directement dans la base de données, ou utiliser l'inscription si vous l'avez implémentée côté React (le service API est prêt).

Exemple de création de user test via Tinker :
```php
// Dans un terminal : php artisan tinker

User::create([
    'nom' => 'Admin',
    'prenom' => 'System',
    'email' => 'admin@univ.local',
    'identifiant' => 'admin',
    'password' => 'password123', // sera hashé automatiquement par le modèle
    'role' => 'chef_departement',
    'matricule' => 'ADMIN01'
]);
```

## Fonctionnement

- **Login.jsx** : Envoie les identifiants à l'API Laravel (`/api/login`).
- **AuthContext** : Stocke le token et les infos utilisateur.
- **Redirection** : Après connexion, redirige vers `/dashboard`.
- **Dashboard** : Affiche le contenu adapté (Enseignant, Étudiant, etc.) grâce au rôle récupéré.
