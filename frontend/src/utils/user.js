// src/utils/user.js
// Utilitaire pour obtenir le rôle / nom d'utilisateur depuis le stockage de session
export const getUserRole = () => {
  try {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      return user.role;
    }
  } catch (e) {
    console.error("Erreur lecture role", e);
  }
  return localStorage.getItem('userRole') || 'Etudiant';
};

export const getUserName = () => {
  try {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      return user.name || user.username;
    }
  } catch (e) {
    console.error("Erreur lecture nom", e);
  }
  return localStorage.getItem('userName') || 'Utilisateur';
};
