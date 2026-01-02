// src/services/api.js
import axios from 'axios';

// Configuration de l'URL de base de votre API Laravel
const API_BASE_URL = 'http://localhost:8000/api';

// Créer une instance axios avec configuration par défaut
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // Important pour les cookies de session
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const isAuthCheck = error.config?.url === '/me' || error.config?.url?.endsWith('/me');
        const isLoginPage = window.location.pathname === '/login';

        if (error.response?.status === 401 && !isAuthCheck && !isLoginPage) {
            // Token expiré ou invalid, mais on ne redirige PAS si on vérifie juste l'auth ou si on est déjà au login
            localStorage.removeItem('auth_token');
            localStorage.removeItem('userRole');
            sessionStorage.removeItem('currentUser');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Services d'authentification
export const authService = {
    // Connexion (Simplifiée sans CSRF pre-flight)
    login: async (credentials) => {
        try {
            // Pour le TP sans sécurité CSRF, on appelle directement le login
            const response = await api.post('/login', {
                email: credentials.email || undefined,
                identifiant: credentials.username || undefined,
                password: credentials.password,
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Déconnexion
    logout: async () => {
        try {
            const response = await api.post('/logout');
            localStorage.removeItem('auth_token');
            localStorage.removeItem('userRole');
            sessionStorage.removeItem('currentUser');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Obtenir l'utilisateur actuel
    me: async () => {
        try {
            const response = await api.get('/me');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Mettre à jour le profil (Support Multipart/form-data)
    updateProfile: async (data) => {
        try {
            // Si c'est du FormData (pour upload fichier), axios doit laisser le browser mettre le Content-Type
            // Et Laravel préfère POST avec _method=PUT pour les fichiers
            if (data instanceof FormData) {
                data.append('_method', 'PUT'); // Spoofing PUT
                const response = await api.post('/profile', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                return response.data;
            } else {
                // JSON standard
                const response = await api.put('/profile', data);
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    },

    // Inscription (optionnel)
    register: async (userData) => {
        try {
            const response = await api.post('/register', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Mot de passe oublié
    forgotPassword: async (email) => {
        try {
            const response = await api.post('/forgot-password', { email });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Réinitialiser le mot de passe
    resetPassword: async (data) => {
        try {
            const response = await api.post('/reset-password', data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

// Export de l'instance axios pour d'autres services
export default api;
