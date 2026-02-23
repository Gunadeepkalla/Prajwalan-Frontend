import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Citizen Routes */}
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/report" element={<VoiceChat />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/complaint/:id" element={<ComplaintDetail />} />

        {/* Officer Routes */}
        <Route path="/officer" element={<OfficerDashboard />} />
        <Route path="/officer/case/:id" element={<OfficerCaseDetail />} />
        <Route path="/officer/settings" element={<OfficerSettings />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;