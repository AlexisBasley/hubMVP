import React from 'react';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  X,
  ArrowRight,
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'warning' | 'success' | 'info' | 'alert';
  title: string;
  message: string;
  timestamp: string;
  icon: React.ReactNode;
  actionLabel?: string;
}

export default function NotificationCenter() {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'alert',
      title: 'Documents bientôt expirés',
      message: '12 documents expirent dans les 30 jours',
      timestamp: 'Il y a 2h',
      icon: <AlertTriangle size={20} />,
      actionLabel: 'Voir les documents',
    },
    {
      id: '2',
      type: 'success',
      title: 'Nouvel intervenant onboardé',
      message: 'Marc Bernard a complété son onboarding',
      timestamp: 'Il y a 4h',
      icon: <CheckCircle size={20} />,
    },
    {
      id: '3',
      type: 'warning',
      title: 'Validation en attente',
      message: '5 saisies d\'heures attendent votre validation',
      timestamp: 'Aujourd\'hui',
      icon: <Clock size={20} />,
      actionLabel: 'Valider',
    },
    {
      id: '4',
      type: 'info',
      title: 'Nouvelles tâches',
      message: 'Vérification LTCI requise pour 3 intervenants',
      timestamp: 'Hier',
      icon: <FileText size={20} />,
    },
  ];

  const getTypeColor = (type: string) => {
    const colors = {
      warning: 'bg-amber-50 border-amber-200 text-amber-700',
      success: 'bg-green-50 border-green-200 text-green-700',
      info: 'bg-blue-50 border-blue-200 text-blue-700',
      alert: 'bg-red-50 border-red-200 text-red-700',
    };
    return colors[type as keyof typeof colors];
  };

  return (
    <div className="bg-white rounded-lg shadow-xl border border-neutral-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-slate-50">
        <h2 className="font-bold text-slate-900">Notifications</h2>
        <button className="p-1 hover:bg-neutral-200 rounded-lg text-slate-600">
          <X size={20} />
        </button>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            className={`px-4 py-4 border-b border-neutral-100 hover:bg-neutral-50 transition-colors ${
              index === notifications.length - 1 ? 'border-b-0' : ''
            }`}
          >
            <div className="flex gap-3">
              {/* Icon */}
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(
                  notification.type
                )}`}
              >
                {notification.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-slate-900 text-sm">
                    {notification.title}
                  </h3>
                  <span className="text-xs text-slate-500 ml-2">
                    {notification.timestamp}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-2">
                  {notification.message}
                </p>
                {notification.actionLabel && (
                  <button className="text-xs text-orange-600 font-medium hover:text-orange-700 flex items-center gap-1">
                    {notification.actionLabel}
                    <ArrowRight size={12} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-neutral-200 bg-neutral-50">
        <button className="text-sm text-orange-600 font-medium hover:text-orange-700 w-full text-center">
          Voir toutes les notifications
        </button>
      </div>
    </div>
  );
}