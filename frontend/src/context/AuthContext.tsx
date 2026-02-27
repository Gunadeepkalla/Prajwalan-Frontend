import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import api from '../lib/api';

/* ── Types ───────────────────────────────────────────────────────────────── */
interface CitizenUser {
  id: string;
  name?: string;
  mobileNumber?: string;
  isVerified: boolean;
  language?: string;
  isAnonymous?: boolean;
}

interface PoliceUser {
  id: string;
  name: string;
  email: string;
  role: 'OFFICER' | 'STATION_ADMIN' | 'SUPER_ADMIN';
  station?: { id: string; stationName: string; district: string; state: string };
}

interface AuthContextValue {
  user: CitizenUser | null;
  policeUser: PoliceUser | null;
  loading: boolean;
  loginCitizen: (userData: CitizenUser, token: string) => void;
  loginPolice: (officerData: PoliceUser, token: string) => void;
  logoutCitizen: () => Promise<void>;
  logoutPolice: () => Promise<void>;
}

/* ── Context ─────────────────────────────────────────────────────────────── */
const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

/* ── Provider ────────────────────────────────────────────────────────────── */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CitizenUser | null>(null);
  const [policeUser, setPoliceUser] = useState<PoliceUser | null>(null);
  const [loading, setLoading] = useState(true);

  /* Restore sessions from localStorage on mount */
  useEffect(() => {
    const savedUser = localStorage.getItem('prajwalan_user');
    const savedPolice = localStorage.getItem('prajwalan_police_user');
    const citizenToken = localStorage.getItem('prajwalan_token');
    const policeToken = localStorage.getItem('prajwalan_police_token');

    if (savedUser && citizenToken) {
      setUser(JSON.parse(savedUser));
      api.defaults.headers.common.Authorization = `Bearer ${citizenToken}`;
    }
    if (savedPolice && policeToken) {
      setPoliceUser(JSON.parse(savedPolice));
    }
    setLoading(false);
  }, []);

  /* ── Citizen actions ──────────────────────────────────────────────────── */
  const loginCitizen = (userData: CitizenUser, token: string) => {
    setUser(userData);
    localStorage.setItem('prajwalan_user', JSON.stringify(userData));
    localStorage.setItem('prajwalan_token', token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  const logoutCitizen = async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (_) {}
    setUser(null);
    localStorage.removeItem('prajwalan_user');
    localStorage.removeItem('prajwalan_token');
    delete api.defaults.headers.common.Authorization;
  };

  /* ── Police actions ───────────────────────────────────────────────────── */
  const loginPolice = (officerData: PoliceUser, token: string) => {
    setPoliceUser(officerData);
    localStorage.setItem('prajwalan_police_user', JSON.stringify(officerData));
    localStorage.setItem('prajwalan_police_token', token);
  };

  const logoutPolice = async () => {
    try {
      await api.post('/api/police/auth/logout');
    } catch (_) {}
    setPoliceUser(null);
    localStorage.removeItem('prajwalan_police_user');
    localStorage.removeItem('prajwalan_police_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        policeUser,
        loading,
        loginCitizen,
        loginPolice,
        logoutCitizen,
        logoutPolice,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
