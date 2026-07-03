import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { Toaster } from 'react-hot-toast';
import { TooltipProvider } from './components/ui/tooltip';

import { ProtectedRoute, PublicRoute } from './components/auth/ProtectedRoute';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { BuilderView } from './components/BuilderView';
import { AuthModal } from './components/ui/AuthModal';

export default function App() {
  const { initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <TooltipProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          style: { background: '#1E293B', color: '#F1F5F9', border: '1px solid #334155', fontSize: 13 },
        }}
      />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={
              <div className="flex w-screen h-screen bg-[#0F172A]">
                <AuthModal />
              </div>
            } />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/workspaces" element={<DashboardPage />} />
              <Route path="/templates" element={<DashboardPage />} />
              <Route path="/review" element={<DashboardPage />} />
              <Route path="/starred" element={<DashboardPage />} />
              <Route path="/shared" element={<DashboardPage />} />
              <Route path="/settings" element={<div className="p-8 text-[#F1F5F9]">Settings Placeholder</div>} />
              <Route path="/profile" element={<div className="p-8 text-[#F1F5F9]">Profile Placeholder</div>} />
            </Route>
            
            {/* The Builder Canvas */}
            <Route path="/workspace/:id" element={<BuilderView />} />
          </Route>
          
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
}
