import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import BotsLanding from "./components/Bots/BotHome";
import { AuthProvider } from "./contexts/AuthContext";
import { ErrorProvider, useError } from "./contexts/ErrorContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Top-level component to display global error messages.
// Put this in a separate file if you want to reuse elsewhere.
function GlobalNotificationBanner() {
  const { error, success, clearError, clearSuccess } = useError();

  return (
    <>
      {/* Error Banner */}
      {error && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-red-100 border border-red-400 text-red-800 px-6 py-4 rounded-lg shadow-2xl max-w-md pointer-events-auto animate-fadeIn">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2">
                <span className="text-red-500 text-xl">⚠️</span>
                <p className="text-sm font-medium">{error}</p>
              </div>
              <button
                onClick={clearError}
                className="text-red-500 hover:text-red-700 font-bold text-xl leading-none"
                title="Close"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Banner */}
      {success && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-green-100 border border-green-400 text-green-800 px-6 py-4 rounded-lg shadow-2xl max-w-md pointer-events-auto animate-fadeIn">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <p className="text-sm font-medium">{success}</p>
              </div>
              <button
                onClick={clearSuccess}
                className="text-green-500 hover:text-green-700 font-bold text-xl leading-none"
                title="Close"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/auth" element={<AuthPage />} />

      {/* Protected routes */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<HomePage />} />
        <Route path="/bots" element={<BotsLanding />} />
        {/* You can add other protected routes here */}
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <ErrorProvider>
      <AuthProvider>
        <BrowserRouter>
          {/* Global Error Banner (shows up for any error set in ErrorContext) */}
          <GlobalNotificationBanner />

          {/* All app routes */}
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ErrorProvider>
  );
}

export default App;
