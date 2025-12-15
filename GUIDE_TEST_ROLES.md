# Guide de Test des Rôles

## 🎯 Comment tester chaque rôle

J'ai ajouté un **sélecteur de rôle temporaire** dans votre application pour faciliter les tests.

### 📍 Où le trouver ?

Quand vous ouvrez `http://localhost:5173/dashboard`, vous verrez une **barre jaune** en haut de la page (juste sous le header) avec 4 boutons :

```
🧪 Mode Test - Changer de rôle:  [Chef Département] [Responsable de planification] [Enseignant] [Etudiant]
```

### 🔄 Comment tester

1. **Ouvrez votre navigateur** et allez sur `http://localhost:5173/dashboard`
2. **Cliquez sur un bouton** de rôle dans la barre jaune
3. **La sidebar change instantanément** pour afficher les menus du rôle sélectionné
4. **Testez chaque rôle** pour vérifier que tout fonctionne

### 📋 Ce que vous devriez voir pour chaque rôle

#### 👔 Chef Département
```
Tableau de bord
---
Calendrier
Examens
Niveaux/Modules
Etudiants
Salles
Réclamations
---
Publications  ← NOUVEAU
---
Profil
Parametres
```

#### 📊 Responsable de planification
```
Tableau de bord
---
Calendrier
Examens
Niveaux/Modules
Etudiants
Salles
Réclamations  ← NOUVEAU
---
Profil
Parametres
```

#### 👨‍🏫 Enseignant
```
Tableau de bord
---
Mes surveillances
Mes réclamations
---
Profil
Parametres
```

#### 🎓 Etudiant
```
Tableau de bord
Calendrier
---
Mes Examens
Mes Controles Continues
Mes Remplacements
Mes Rattrapages
---
Profil
Parametres
```

### ⚠️ Important

- **Les liens non implémentés** (comme "Réclamations", "Publications", etc.) ne navigueront pas quand vous cliquez dessus - c'est normal !
- **La barre jaune est temporaire** - supprimez-la en production en remplaçant le contenu de `DashboardLayout.jsx`

### 🗑️ Pour supprimer le sélecteur de rôle en production

Quand vous aurez votre système d'authentification, remplacez simplement :

```javascript
const [userRole, setUserRole] = useState("Responsable de planification");
```

par :

```javascript
const userRole = user.role; // ou depuis votre contexte d'auth
```

Et supprimez la div avec la classe `bg-yellow-100` (lignes 48-67).

### 🐛 Si le serveur ne démarre pas

Vérifiez le terminal où `npm run dev` tourne et cherchez les erreurs. Les erreurs courantes :
- Import manquant
- Syntaxe incorrecte
- Problème de dépendances

Relancez le serveur si nécessaire :
```bash
npm run dev
```
