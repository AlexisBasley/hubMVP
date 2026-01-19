import React from 'react';
import { Menu, Bell, Settings, LogOut, ChevronDown, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import siteService, { SiteDTO } from '../services/siteService';

interface HeaderProps {
  onToggleSidebar: () => void;
  selectedSite: string;
  onSiteChange: (site: string) => void;
  onNotificationToggle: () => void;
}

export default function Header({
  onToggleSidebar,
  selectedSite,
  onSiteChange,
  onNotificationToggle,
}: HeaderProps) {
  const [sitesOpen, setSitesOpen] = React.useState(false);
  const [userSites, setUserSites] = React.useState<SiteDTO[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { user, logout } = useAuth();

  // Fetch user's assigned sites on mount
  React.useEffect(() => {
    const fetchUserSites = async () => {
      try {
        setLoading(true);
        const sites = await siteService.getUserSites();
        setUserSites(sites);
        
        // If user has sites and no site is selected, select the first one
        if (sites.length > 0 && !selectedSite) {
          onSiteChange(sites[0].name);
        }
      } catch (error) {
        console.error('Failed to fetch user sites:', error);
        setUserSites([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserSites();
    }
  }, [user]);

  return (
    <header className="bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between h-16 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors text-slate-700"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        {/* Site Selector */}
        <div className="relative">
          <button
            onClick={() => setSitesOpen(!sitesOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors text-slate-900 font-medium"
            disabled={loading || userSites.length === 0}
          >
            <Building2 size={18} className="text-orange-600" />
            <span className="max-w-xs truncate text-sm">
              {loading ? 'Chargement...' : userSites.length === 0 ? 'Aucun chantier' : selectedSite}
            </span>
            {userSites.length > 0 && (
              <ChevronDown size={16} className={`transition-transform ${sitesOpen ? 'rotate-180' : ''}`} />
            )}
          </button>

          {sitesOpen && userSites.length > 0 && (
            <div className="absolute top-full mt-2 left-0 bg-white border border-neutral-200 rounded-lg shadow-lg z-50 min-w-64">
              {userSites.map(site => (
                <button
                  key={site.id}
                  onClick={() => {
                    onSiteChange(site.name);
                    setSitesOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-orange-50 transition-colors border-b border-neutral-100 last:border-b-0 ${
                    site.name === selectedSite ? 'bg-orange-100 text-orange-900 font-medium' : 'text-slate-700'
                  }`}
                >
                  <div className="font-medium">{site.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{site.location}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <button
          onClick={onNotificationToggle}
          className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors text-slate-700"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-orange-600 rounded-full"></span>
        </button>

        {/* Settings */}
        <button
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors text-slate-700"
          aria-label="Settings"
        >
          <Settings size={20} />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-3 border-l border-neutral-200">
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold text-sm">
            {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-medium text-slate-900">{user?.name || 'User'}</span>
            <span className="text-xs text-slate-500 capitalize">{user?.role || 'Utilisateur'}</span>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors text-slate-700"
          aria-label="Logout"
          title="Se déconnecter"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}