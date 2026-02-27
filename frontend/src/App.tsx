import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import VoiceChat from "./pages/VoiceChat";
import Settings from "./pages/Settings";
import OfficerDashboard from "./pages/OfficerDashboard";
import OfficerCaseDetail from "./pages/OfficerCasedetail";
import OfficerSettings from "./pages/OfficerSettings";
import ComplaintDetail from "./pages/ComplaintDetail";
import OfficerLogin from "./pages/OfficerLogin";

/* ── Route guards ─────────────────────────────────────────────────────────── */
function CitizenRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

function OfficerRoute({ children }: { children: React.ReactNode }) {
  const { policeUser, loading } = useAuth();
  if (loading) return null;
  return policeUser ? <>{children}</> : <Navigate to="/officer/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/officer/login" element={<OfficerLogin />} />

      {/* Citizen Protected */}
      <Route path="/dashboard" element={<CitizenRoute><UserDashboard /></CitizenRoute>} />
      <Route path="/report" element={<CitizenRoute><VoiceChat /></CitizenRoute>} />
      <Route path="/settings" element={<CitizenRoute><Settings /></CitizenRoute>} />
      <Route path="/complaint/:id" element={<CitizenRoute><ComplaintDetail /></CitizenRoute>} />

      {/* Officer Protected */}
      <Route path="/officer" element={<OfficerRoute><OfficerDashboard /></OfficerRoute>} />
      <Route path="/officer/case/:id" element={<OfficerRoute><OfficerCaseDetail /></OfficerRoute>} />
      <Route path="/officer/settings" element={<OfficerRoute><OfficerSettings /></OfficerRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;