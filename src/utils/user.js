// src/utils/user.js
// Utilitaire simple pour obtenir le rôle / nom d'utilisateur.
// En prod tu remplaceras ça par ton contexte d'auth (token / user API).
export const getUserRole = () => {
  // Exemple : pour tester en local tu peux faire dans la console :
  // localStorage.setItem('userRole', 'Enseignant')
  // localStorage.setItem('userName', 'Benomar Omar')
  // "Enseignant", "Chef Département", "Responsable de planification" , "Etudiant"
  return localStorage.getItem('userRole') || 'Etudiant';
};

export const getUserName = () => {
  return localStorage.getItem('userName') || 'Benomar Omar';
};
