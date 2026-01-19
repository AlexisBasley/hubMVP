import React, { useState } from 'react';
import { Plus, X, Search } from 'lucide-react';

interface AvailableDashboard {
  powerBiId: string;
  title: string;
  description: string;
  category: 'kpi' | 'operations' | 'compliance' | 'resources';
  image: string;
}

interface DashboardItem {
  id: string;
  powerBiId: string;
  title: string;
  description: string;
  category: 'kpi' | 'operations' | 'compliance' | 'resources';
  width: 'half' | 'full';
  order: number;
}

interface DashboardGalleryProps {
  availableDashboards: AvailableDashboard[];
  activeDashboards: DashboardItem[];
  onAddDashboard: (powerBiId: string) => void;
  onClose: () => void;
}

const CATEGORY_LABELS = {
  kpi: 'KPIs',
  operations: 'Opérations',
  compliance: 'Conformité',
  resources: 'Ressources',
};

const CATEGORY_COLORS = {
  kpi: 'bg-blue-100 text-blue-800 border-blue-300',
  operations: 'bg-orange-100 text-orange-800 border-orange-300',
  compliance: 'bg-red-100 text-red-800 border-red-300',
  resources: 'bg-purple-100 text-purple-800 border-purple-300',
};

export default function DashboardGallery({
  availableDashboards,
  activeDashboards,
  onAddDashboard,
  onClose,
}: DashboardGalleryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'kpi' | 'operations' | 'compliance' | 'resources'>('all');

  const filteredDashboards = availableDashboards.filter(dashboard => {
    const matchesSearch = dashboard.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
      dashboard.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === 'all' || dashboard.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const isActive = (powerBiId: string) =>
    activeDashboards.some(d => d.powerBiId === powerBiId);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-neutral-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-gradient-to-r from-orange-50 to-white">
        <h2 className="text-xl font-bold text-slate-900">
          Galerie de dashboards
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-neutral-200 rounded-lg transition-colors text-slate-600"
        >
          <X size={20} />
        </button>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 border-b border-neutral-200 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Rechercher un dashboard..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterCategory === 'all'
                ? 'bg-orange-500 text-white'
                : 'bg-neutral-100 text-slate-700 hover:bg-neutral-200'
            }`}
          >
            Tous les dashboards
          </button>
          {(
            [
              'kpi',
              'operations',
              'compliance',
              'resources',
            ] as const
          ).map(category => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterCategory === category
                  ? 'bg-orange-500 text-white'
                  : `${CATEGORY_COLORS[category]} border hover:opacity-75`
              }`}
            >
              {CATEGORY_LABELS[category]}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="p-6">
        {filteredDashboards.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 mb-4">
              Aucun dashboard ne correspond à votre recherche
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDashboards.map(dashboard => {
              const active = isActive(dashboard.powerBiId);
              return (
                <div
                  key={dashboard.powerBiId}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    active
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-neutral-200 bg-white hover:border-orange-300'
                  }`}
                >
                  {/* Image/Icon */}
                  <div className="mb-4 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-neutral-100 rounded-lg text-2xl">
                      {dashboard.image}
                    </div>
                  </div>

                  {/* Title and Description */}
                  <h3 className="font-semibold text-slate-900 mb-2">
                    {dashboard.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    {dashboard.description}
                  </p>

                  {/* Category Badge */}
                  <div className="mb-4 flex items-center justify-center">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${
                        CATEGORY_COLORS[dashboard.category]
                      }`}
                    >
                      {CATEGORY_LABELS[dashboard.category]}
                    </span>
                  </div>

                  {/* Add/Remove Button */}
                  <button
                    onClick={() => onAddDashboard(dashboard.powerBiId)}
                    disabled={active}
                    className={`w-full py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                      active
                        ? 'bg-neutral-200 text-slate-500 cursor-not-allowed'
                        : 'bg-orange-500 text-white hover:bg-orange-600'
                    }`}
                  >
                    {active ? (
                      <>✓ Ajouté</>
                    ) : (
                      <>
                        <Plus size={18} />
                        Ajouter
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}