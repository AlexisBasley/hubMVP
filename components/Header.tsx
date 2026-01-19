import React from 'react';
import { Menu, Bell, Settings, LogOut, ChevronDown, Building2 } from 'lucide-react';

interface HeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  selectedSite: string;
  onSiteChange: (site: string) => void;
  onNotificationToggle: () => void;
  notificationOpen: boolean;
}

const sites = [
  'Chantier Paris - La Défense',
  'Chantier Lyon - Confluence',
  'Chantier Marseille - Vieux Port',
  'Chantier Lille - Cité Administrative',
];

export default function Header({
  sidebarOpen,
  onToggleSidebar,
  selectedSite,
  onSiteChange,
  onNotificationToggle,
  notificationOpen,
}: HeaderProps) {
  const [sitesOpen, setSitesOpen] = React.useState(false);

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
          >
            <Building2 size={18} className="text-orange-600" />
            <span className="max-w-xs truncate text-sm">{selectedSite}</span>
            <ChevronDown size={16} className={`transition-transform ${sitesOpen ? 'rotate-180' : ''}`} />
          </button>

          {sitesOpen && (
            <div className="absolute top-full mt-2 left-0 bg-white border border-neutral-200 rounded-lg shadow-lg z-50 min-w-64">
              {sites.map(site => (
                <button
                  key={site}
                  onClick={() => {
                    onSiteChange(site);
                    setSitesOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-orange-50 transition-colors border-b border-neutral-100 last:border-b-0 ${
                    site === selectedSite ? 'bg-orange-100 text-orange-900 font-medium' : 'text-slate-700'
                  }`}
                >
                  {site}
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
            JD
          </div>
          <span className="text-sm font-medium text-slate-900 hidden sm:inline">Jean Dupont</span>
        </div>

        {/* Logout */}
        <button
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors text-slate-700"
          aria-label="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}