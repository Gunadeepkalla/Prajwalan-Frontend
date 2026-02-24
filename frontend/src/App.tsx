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
import EvidenceStorage from "./pages/EvidenceStorage";
import OfficerLogin from "./pages/OfficerLogin";

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
        <Route path="/evidence" element={<EvidenceStorage />} />
        {/* Officer Routes */}
        <Route path="/officer" element={<OfficerDashboard />} />
        <Route path="/officer/case/:id" element={<OfficerCaseDetail />} />
        <Route path="/officer/settings" element={<OfficerSettings />} />
        <Route path="/officer/login" element={<OfficerLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;