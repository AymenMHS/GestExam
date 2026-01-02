// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Vérifier si l'utilisateur est connecté au chargement
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            // On essaie de récupérer l'utilisateur frais depuis le serveur
            // Si le cookie de session est valide, ça marchera.
            const userFromApi = await authService.me();

            if (userFromApi) {
                const mappedUser = {
                    ...userFromApi, // Garde tous les champs bruts (nom, prenom, photo_profil...)
                    role: mapRole(userFromApi.role), // Map le role pour l'UI
                    name: `${userFromApi.nom} ${userFromApi.prenom}`, // Helper pour affichage simple
                };

                setUser(mappedUser);
                setIsAuthenticated(true);
                // Mise à jour du cache session pour référence rapide si besoin
                sessionStorage.setItem('currentUser', JSON.stringify(mappedUser));
            }
        } catch (error) {
            // Si api.me() échoue (401), on regarde si on avait quelque chose en cache pour éviter un flash,
            // mais idéalement on considère déconnecté.
            // console.error('Error checking auth:', error);

            // Fallback : si on a vraiment des données en session mais que le serveur répond 401 (session expirée), on nettoie.
            // Si c'est une erreur réseau, on garde peut-être ? Non, pour la sécu, on nettoie.
            setUser(null);
            setIsAuthenticated(false);
            sessionStorage.removeItem('currentUser');
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        try {
            const response = await authService.login(credentials);

            if (response.user) {
                const userData = {
                    ...response.user, // TOUTES les propriétés (id, nom, prenom, photo_profil, bio, etc.)
                    role: mapRole(response.user.role),
                    name: `${response.user.nom} ${response.user.prenom}`,
                };

                // Stocker les informations utilisateur
                sessionStorage.setItem('currentUser', JSON.stringify(userData));
                localStorage.setItem('userRole', userData.role);

                setUser(userData);
                setIsAuthenticated(true);

                return { success: true, user: userData };
            }
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Erreur de connexion',
            };
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            sessionStorage.removeItem('currentUser');
            localStorage.removeItem('userRole');
            localStorage.removeItem('auth_token');
        }
    };

    // Mapper les rôles Laravel vers les rôles React
    const mapRole = (laravelRole) => {
        const roleMap = {
            'chef_departement': 'Chef Département',
            'planificateur': 'Responsable de planification',
            'enseignant': 'Enseignant',
            'etudiant': 'Etudiant',
        };
        return roleMap[laravelRole] || 'Etudiant';
    };

    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        logout,
        checkAuth,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
