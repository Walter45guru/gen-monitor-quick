import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './pages/LoginPage';
import SimpleLogin from './pages/SimpleLogin';
import Register from './pages/Register';
import GeneratorPage from './pages/GeneratorPage.jsx';
import Engine from './pages/Engine';
import Alarm from './pages/Alarm';
import Settings from './pages/Settings';
import Report from './pages/Report';
import DeleteAccount from './pages/DeleteAccount';
import GeneratorDataPage from './pages/GeneratorDataPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0a1931', // dark navy blue
      contrastText: '#fff',
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/simple-login" element={<SimpleLogin />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/generator/gauges" replace />} />
              <Route path="generator/gauges" element={<GeneratorPage />} />
              <Route path="generator/data" element={<GeneratorDataPage />} />
              <Route path="generator" element={<Navigate to="/generator/gauges" replace />} />
              <Route path="engine" element={<Engine />} />
              <Route path="alarms" element={<Alarm />} />
              <Route path="settings" element={<Settings />} />
              <Route path="report" element={<Report />} />
              <Route path="deleteaccount" element={<DeleteAccount />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
