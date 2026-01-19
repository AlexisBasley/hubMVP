import React, { useState } from 'react';
import {
  BarChart3,
  AlertTriangle,
  ChevronRight,
  X,
  Wrench,
  BookOpen,
  Zap,
} from 'lucide-react';

type ModuleType = 'dashboard' | 'intervenants' | 'documents' | 'timeTracking' | 'onboarding' | 'ltci' | 'tools' | 'courses' | 'smartSolutions';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentModule: ModuleType;
  onModuleChange: (module: ModuleType) => void;
  userRole: 'operationnel' | 'director' | 'admin';
}

interface MenuItem {
  id: ModuleType;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  roles: string[];
  disabled?: boolean;
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    icon: <BarChart3 size={20} />,
    label: 'Mon Cockpit',
    roles: ['operationnel', 'director', 'admin'],
  },
  {
    id: 'tools',
    icon: <Wrench size={20} />,
    label: 'Mes Outils',
    roles: ['operationnel', 'director', 'admin'],
  },
  {
    id: 'smartSolutions',
    icon: <Zap size={20} />,
    label: 'Mes solutions intelligentes',
    roles: ['operationnel', 'director', 'admin'],
    disabled: true,
  },
  {
    id: 'courses',
    icon: <BookOpen size={20} />,
    label: 'Mes Parcours',
    roles: ['operationnel', 'director', 'admin'],
    disabled: true,
  },
  {
    id: 'ltci',
    icon: <AlertTriangle size={20} />,
    label: 'LTCI',
    roles: ['director', 'admin'],
  },
];

export default function Sidebar({
  isOpen,
  onToggle,
  currentModule,
  onModuleChange,
  userRole,
}: SidebarProps) {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonTitle, setComingSoonTitle] = useState('');
  const [comingSoonMessage, setComingSoonMessage] = useState('');
  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole));

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.disabled) {
      if (item.id === 'smartSolutions') {
        setComingSoonTitle('Mes solutions intelligentes');
        setComingSoonMessage('La section "Mes solutions intelligentes" sera prochainement accessible pour vous proposer des outils IA et d\'automatisation avancés.');
      } else {
        setComingSoonTitle('Mes Parcours');
        setComingSoonMessage('La section "Mes Parcours" sera prochainement accessible pour vous proposer une expérience d\'apprentissage personnalisée.');
      }
      setShowComingSoon(true);
    } else {
      onModuleChange(item.id);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-slate-900 text-white transition-transform duration-300 z-40 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
              <span className="font-bold text-white">S</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight">Hub Smart</span>
              <span className="font-bold text-xs text-orange-400 leading-tight">Solutions</span>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="md:hidden p-2 hover:bg-slate-800 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {filteredMenuItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleMenuItemClick(item)}
              disabled={item.disabled}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                item.disabled
                  ? 'opacity-50 cursor-not-allowed'
                  : currentModule === item.id
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span
                className={
                  item.disabled
                    ? 'text-slate-500'
                    : currentModule === item.id
                    ? 'text-white'
                    : 'text-slate-400 group-hover:text-orange-400'
                }
              >
                {item.icon}
              </span>
              <span className="flex-1 text-left font-medium text-sm">{item.label}</span>
              {item.badge && (
                <span
                  className={`px-2 py-1 rounded-full text-xs font-bold ${
                    currentModule === item.id
                      ? 'bg-orange-600 text-white'
                      : 'bg-orange-500 text-white'
                  }`}
                >
                  {item.badge}
                </span>
              )}
              {currentModule === item.id && !item.disabled && (
                <ChevronRight size={16} className="opacity-75" />
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <div className="px-4 py-2 bg-slate-800 rounded-lg">
            <p className="text-xs text-slate-400">Rôle</p>
            <p className="text-sm font-medium text-white capitalize">
              {userRole === 'director' ? 'Directeur' : userRole === 'admin' ? 'Admin' : 'Opérationnel'}
            </p>
          </div>
          <button className="w-full px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
            Aide & Support
          </button>
        </div>
      </aside>

      {/* Coming Soon Modal */}
      {showComingSoon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden animate-bounce-in">
            {/* Animated Background */}
            <div className="relative h-32 bg-gradient-to-br from-orange-400 to-orange-600 overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute w-40 h-40 -top-10 -right-10 rounded-full border-4 border-white animate-pulse"></div>
                <div className="absolute w-32 h-32 -bottom-8 -left-8 rounded-full border-4 border-white animate-pulse delay-100"></div>
              </div>
              <div className="relative h-full flex items-center justify-center">
                <div className="text-4xl animate-bounce">🚀</div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Bientôt disponible
              </h2>
              <p className="text-slate-600 mb-6">
                La section <strong>"{comingSoonTitle}"</strong> sera prochainement accessible. {comingSoonMessage}
              </p>

              {/* Progress indicator */}
              <div className="space-y-3 mb-6">
                {comingSoonTitle === 'Mes solutions intelligentes' ? (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      <p className="text-sm text-slate-700">Outils IA et automatisation</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      <p className="text-sm text-slate-700">Assistants intelligents</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      <p className="text-sm text-slate-700">Recommandations personnalisées</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      <p className="text-sm text-slate-700">Parcours de formation sur mesure</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      <p className="text-sm text-slate-700">Suivi de progression</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      <p className="text-sm text-slate-700">Certifications et badges</p>
                    </div>
                  </>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowComingSoon(false)}
                className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS for animation */}
      <style>{`
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .delay-100 {
          animation-delay: 0.1s;
        }
      `}</style>
    </>
  );
}