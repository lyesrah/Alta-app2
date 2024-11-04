import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useSettingsStore } from './store/settingsStore';
import { useLanguageStore } from './store/languageStore';
import Layout from './components/Layout';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import PropertyForm from './components/PropertyForm';
import PropertyList from './components/PropertyList';
import PropertyDetails from './components/PropertyDetails';
import ProjectList from './pages/ProjectList';
import Documentation from './pages/Documentation';
import Notifications from './pages/Notifications';
import Tasks from './pages/Tasks';
import ClientForm from './pages/ClientForm';
import ClientList from './pages/ClientList';
import Settings from './pages/Settings';
import LeadDashboard from './pages/leads/LeadDashboard';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthStore();
  const { settings } = useSettingsStore();
  const { t } = useLanguageStore(); // Add language store hook

  // Apply dark mode class to root html element
  React.useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  if (loading) {
    return <div>{t('common.loading')}</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<LeadDashboard />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="properties" element={<PropertyList />} />
          <Route path="properties/new" element={<PropertyForm />} />
          <Route path="properties/:id" element={<PropertyDetails />} />
          <Route path="properties/:id/edit" element={<PropertyForm />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="clients" element={<ClientList />} />
          <Route path="clients/new" element={<ClientForm />} />
          <Route path="clients/:id/edit" element={<ClientForm />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="docs" element={<Documentation />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;