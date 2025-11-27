import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
        <p className="ml-6">Checking authentication...</p>
      </div>
    );
  }

  if (!user || !user.token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
