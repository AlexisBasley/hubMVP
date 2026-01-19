import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import NotificationCenter from './components/NotificationCenter';
import MyTools from './components/MyTools';
import DevUserSwitcher from './components/DevUserSwitcher';

type ModuleType = 'dashboard' | 'tools' | 'courses' | 'smartSolutions';

interface AppState {
  currentModule: ModuleType;
  sidebarOpen: boolean;
  notificationOpen: boolean;
  selectedSite: string;
  userRole: 'operationnel' | 'director' | 'admin';
}

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    currentModule: 'dashboard',
    sidebarOpen: true,
    notificationOpen: false,
    selectedSite: 'Chantier Paris - La Défense',
    userRole: 'operationnel',
  });

  const handleModuleChange = (module: ModuleType) => {
    setAppState(prev => ({
      ...prev,
      currentModule: module,
      sidebarOpen: window.innerWidth > 768 ? prev.sidebarOpen : false,
    }));
  };

  const handleSiteChange = (site: string) => {
    setAppState(prev => ({
      ...prev,
      selectedSite: site,
    }));
  };

  const toggleSidebar = () => {
    setAppState(prev => ({
      ...prev,
      sidebarOpen: !prev.sidebarOpen,
    }));
  };

  const toggleNotifications = () => {
    setAppState(prev => ({
      ...prev,
      notificationOpen: !prev.notificationOpen,
    }));
  };

  const renderModule = () => {
    switch (appState.currentModule) {
      case 'dashboard':
        return <Dashboard userRole={appState.userRole} selectedSite={appState.selectedSite} />;
      case 'tools':
        return <MyTools />;
      case 'smartSolutions':
        return <div className="p-8 bg-neutral-50 min-h-screen">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Mes solutions intelligentes</h1>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-slate-700">Cette page sera disponible prochainement</p>
          </div>
        </div>;
      case 'courses':
        return <div className="p-8 bg-neutral-50 min-h-screen">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Mes Parcours</h1>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-slate-700">Cette page sera disponible prochainement</p>
          </div>
        </div>;
      default:
        return <Dashboard userRole={appState.userRole} selectedSite={appState.selectedSite} />;
    }
  };

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Dev User Switcher - Only in development */}
      {import.meta.env.DEV && <DevUserSwitcher />}
      
      {/* Sidebar */}
      <Sidebar
        isOpen={appState.sidebarOpen}
        onToggle={toggleSidebar}
        currentModule={appState.currentModule}
        onModuleChange={handleModuleChange}
        userRole={appState.userRole}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          onToggleSidebar={toggleSidebar}
          selectedSite={appState.selectedSite}
          onSiteChange={handleSiteChange}
          onNotificationToggle={toggleNotifications}
        />

        {/* Notification Center Overlay */}
        {appState.notificationOpen && (
          <div className="absolute top-16 right-4 z-40 w-96">
            <NotificationCenter />
          </div>
        )}

        {/* Module Content */}
        <main className="flex-1 overflow-auto">
          {renderModule()}
        </main>
      </div>
    </div>
  );
}