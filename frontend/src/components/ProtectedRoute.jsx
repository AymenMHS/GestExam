import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    // Pendant que l'application vérifie si l'utilisateur est connecté (au rechargement de page)...
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#e3f0ff]">
                <div className="flex flex-col items-center gap-3">
                    <svg className="animate-spin h-10 w-10 text-[#071A83]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                    <span className="text-[#071A83] font-medium">Chargement...</span>
                </div>
            </div>
        );
    }

    // Si vérification finie et pas connecté -> Redirection login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Si connecté -> Affiche la route demandée
    return <Outlet />;
};

export default ProtectedRoute;
