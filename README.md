# 🎓 Plateforme de gestion & planification des examens

**Exam Planning & Management Platform** — application web React pour gérer la planification des examens : étudiants, surveillants, salles, rôles, détection de conflits et calendrier.


## Fonctionnalités

- Authentification et gestion des rôles (Admin, Planificateur, Surveillant, Étudiant)
- Gestion des étudiants (CRUD, import CSV)
- Gestion des surveillants (disponibilités, affectations)
- Gestion des salles (capacité, disponibilités)
- Création / planification des examens (wizard multi-étapes)
- Moteur de détection d'**indisponibilités / conflits** (salle ou surveillant)
- Vue calendrier interactive (jour/semaine/mois)
- Notifications UI (toasts) et templates d'email (si backend configuré)
- Export CSV / PDF (si implémenté)

---

## Technos

- **Frontend** : React
- **Routing** : React Router
- **HTTP** : Axios (ou fetch)
- **Calendrier** : FullCalendar (ou équivalent)
- **State** : Context API / Redux (selon implémentation)
- **Styling** : CSS / Tailwind / Material UI (selon implémentation)
- Bundler : Vite / Create React App (selon implémentation)

---

## Prérequis

- Node.js ≥ 18
- npm (ou yarn)
- Un backend API REST en local ou distant (ex. : Laravel, Node/Express). L'application frontend suppose une API disponible pour l'auth et les ressources.
- Git (pour cloner)

---

## Installation et lancement (local)

### 1. Cloner le dépôt
```bash
git clone https://github.com/AymenMHS/GestExam.git
cd GestExam
