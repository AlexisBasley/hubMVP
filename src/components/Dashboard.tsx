import React, { useState } from 'react';
import {
  Users,
  AlertTriangle,
  Clock,
  FileCheck,
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertCircle,
  Plus,
  GripVertical,
  X,
  Settings,
} from 'lucide-react';
import DashboardGallery from './DashboardGallery';
import EmbeddedDashboard from './EmbeddedDashboard';

interface DashboardItem {
  id: string;
  powerBiId: string;
  title: string;
  description: string;
  category: 'kpi' | 'operations' | 'compliance' | 'resources';
  width: 'half' | 'full';
  order: number;
}

interface DashboardProps {
  userRole: 'operationnel' | 'director' | 'admin';
  selectedSite: string;
}

const AVAILABLE_DASHBOARDS = [
  {
    powerBiId: 'pb-heures-001',
    title: 'Suivi des heures',
    description: 'Analyse détaillée du suivi des heures de travail',
    category: 'operations' as const,
    image: '📊',
  },
  {
    powerBiId: 'pb-conformite-001',
    title: 'Conformité documents',
    description: 'État de conformité des documents habilitants',
    category: 'compliance' as const,
    image: '✓',
  },
  {
    powerBiId: 'pb-intervenants-001',
    title: 'Gestion intervenants',
    description: 'Vue d\'ensemble des intervenants actifs',
    category: 'resources' as const,
    image: '👥',
  },
  {
    powerBiId: 'pb-kpi-001',
    title: 'KPIs site',
    description: 'Indicateurs clés de performance du site',
    category: 'kpi' as const,
    image: '📈',
  },
  {
    powerBiId: 'pb-risques-001',
    title: 'Analyse des risques',
    description: 'Analyse des incidents et risques détectés',
    category: 'compliance' as const,
    image: '⚠️',
  },
  {
    powerBiId: 'pb-productivite-001',
    title: 'Productivité',
    description: 'Métriques de productivité par équipe',
    category: 'operations' as const,
    image: '⚡',
  },
];

export default function Dashboard({ userRole, selectedSite }: DashboardProps) {
  const isDirector = userRole === 'director';
  const [activeDashboards, setActiveDashboards] = useState<DashboardItem[]>([
    {
      id: '1',
      powerBiId: 'pb-kpi-001',
      title: 'KPIs site',
      description: 'Indicateurs clés de performance du site',
      category: 'kpi',
      width: 'full',
      order: 1,
    },
    {
      id: '2',
      powerBiId: 'pb-heures-001',
      title: 'Suivi des heures',
      description: 'Analyse détaillée du suivi des heures de travail',
      category: 'operations',
      width: 'half',
      order: 2,
    },
    {
      id: '3',
      powerBiId: 'pb-conformite-001',
      title: 'Conformité documents',
      description: 'État de conformité des documents habilitants',
      category: 'compliance',
      width: 'half',
      order: 3,
    },
  ]);

  const [showGallery, setShowGallery] = useState(false);
  const [draggedItem, setDraggedItem] = useState<DashboardItem | null>(null);

  const handleAddDashboard = (powerBiId: string) => {
    const dashboard = AVAILABLE_DASHBOARDS.find(d => d.powerBiId === powerBiId);
    if (dashboard && !activeDashboards.find(d => d.powerBiId === powerBiId)) {
      const newDashboard: DashboardItem = {
        id: `${Date.now()}`,
        powerBiId,
        title: dashboard.title,
        description: dashboard.description,
        category: dashboard.category,
        width: 'half',
        order: Math.max(...activeDashboards.map(d => d.order), 0) + 1,
      };
      setActiveDashboards([...activeDashboards, newDashboard]);
      setShowGallery(false);
    }
  };

  const handleRemoveDashboard = (id: string) => {
    setActiveDashboards(activeDashboards.filter(d => d.id !== id));
  };

  const handleDragStart = (e: React.DragEvent, item: DashboardItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetItem: DashboardItem) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === targetItem.id) return;

    const newDashboards = [...activeDashboards];
    const draggedIndex = newDashboards.findIndex(d => d.id === draggedItem.id);
    const targetIndex = newDashboards.findIndex(d => d.id === targetItem.id);

    if (draggedIndex > -1 && targetIndex > -1) {
      [newDashboards[draggedIndex], newDashboards[targetIndex]] = [
        newDashboards[targetIndex],
        newDashboards[draggedIndex],
      ];
      setActiveDashboards(newDashboards);
    }
    setDraggedItem(null);
  };

  const handleToggleWidth = (id: string) => {
    setActiveDashboards(
      activeDashboards.map(d =>
        d.id === id ? { ...d, width: d.width === 'full' ? 'half' : 'full' } : d
      )
    );
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Mon Cockpit</h1>
        <p className="text-slate-600">{selectedSite}</p>
      </div>

      {/* Toolbar */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <button
          onClick={() => setShowGallery(!showGallery)}
          className="flex items-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
        >
          <Plus size={20} />
          Ajouter un dashboard
        </button>
        <p className="text-sm text-slate-600">
          💡 Glissez-déposez les dashboards pour les réorganiser
        </p>
      </div>

      {/* Gallery */}
      {showGallery && (
        <div className="mb-8">
          <DashboardGallery
            availableDashboards={AVAILABLE_DASHBOARDS}
            activeDashboards={activeDashboards}
            onAddDashboard={handleAddDashboard}
            onClose={() => setShowGallery(false)}
          />
        </div>
      )}

      {/* Active Dashboards Grid */}
      <div className="space-y-6">
        {activeDashboards
          .sort((a, b) => a.order - b.order)
          .map((dashboard, index) => (
            <div
              key={dashboard.id}
              className={`${
                dashboard.width === 'full' ? 'col-span-full' : ''
              }`}
              draggable
              onDragStart={e => handleDragStart(e, dashboard)}
              onDragOver={handleDragOver}
              onDrop={e => handleDrop(e, dashboard)}
            >
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-neutral-200 hover:shadow-md transition-shadow">
                {/* Dashboard Header */}
                <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
                  <div className="flex items-center gap-3 flex-1 cursor-move">
                    <GripVertical
                      size={20}
                      className="text-slate-400 hover:text-slate-600"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">
                        {dashboard.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {dashboard.description}
                      </p>
                    </div>
                  </div>

                  {/* Header Actions */}
                  <div className="flex items-center gap-2">
                    <div className="inline-flex items-center gap-1 bg-neutral-100 rounded-lg p-1">
                      <button
                        onClick={() => handleToggleWidth(dashboard.id)}
                        className="p-2 hover:bg-neutral-200 rounded transition-colors text-slate-700 text-xs font-medium"
                        title={
                          dashboard.width === 'full'
                            ? 'Réduire la largeur'
                            : 'Agrandir la largeur'
                        }
                      >
                        {dashboard.width === 'full' ? '½ Largeur' : 'Pleine largeur'}
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemoveDashboard(dashboard.id)}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                      title="Supprimer"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 min-h-96">
                  <EmbeddedDashboard
                    powerBiId={dashboard.powerBiId}
                    title={dashboard.title}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Empty State */}
      {activeDashboards.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Aucun dashboard configuré
          </h3>
          <p className="text-slate-600 mb-6">
            Commencez par ajouter des dashboards Power BI pour personnaliser
            votre cockpit
          </p>
          <button
            onClick={() => setShowGallery(true)}
            className="inline-flex items-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
          >
            <Plus size={20} />
            Ajouter votre premier dashboard
          </button>
        </div>
      )}

      {/* Director Only - Quick Stats */}
      {isDirector && activeDashboards.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Configuration du cockpit
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">Dashboards actifs</p>
              <p className="text-2xl font-bold text-blue-900">
                {activeDashboards.length}
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-sm text-orange-700">Largeur pleine</p>
              <p className="text-2xl font-bold text-orange-900">
                {activeDashboards.filter(d => d.width === 'full').length}
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm text-purple-700">Disponibles</p>
              <p className="text-2xl font-bold text-purple-900">
                {AVAILABLE_DASHBOARDS.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}