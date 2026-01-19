import { useEffect, useState } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface EmbeddedDashboardProps {
  powerBiId: string;
  title: string;
}

export default function EmbeddedDashboard({
  powerBiId,
  title,
}: EmbeddedDashboardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Suppress unused variable warning
  void setError;

  useEffect(() => {
    // Simuler le chargement du dashboard
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [powerBiId]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-lg">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">
            Chargement du dashboard {title}...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-red-50 rounded-lg border border-red-200">
        <AlertCircle size={32} className="text-red-600 mb-3" />
        <p className="text-red-800 font-medium mb-2">Erreur de chargement</p>
        <p className="text-red-700 text-sm mb-4">{error}</p>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          <RefreshCw size={16} />
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Dashboard Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-sm text-slate-600">Données en direct</span>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="p-2 hover:bg-neutral-200 rounded-lg transition-colors text-slate-600 disabled:opacity-50"
          title="Actualiser"
        >
          <RefreshCw
            size={18}
            className={refreshing ? 'animate-spin' : ''}
          />
        </button>
      </div>

      {/* Embedded Dashboard Placeholder */}
      <div className="bg-gradient-to-br from-slate-50 to-neutral-100 rounded-lg border-2 border-dashed border-neutral-300 p-8 min-h-80 flex flex-col items-center justify-center">
        <div className="text-center space-y-3">
          <div className="text-4xl">📊</div>
          <h4 className="font-semibold text-slate-900">{title}</h4>
          <p className="text-slate-600 text-sm max-w-md">
            Le dashboard Power BI pour "{title}" sera embarqué ici. 
            Connectez votre instance Power BI avec les identifiants appropriés.
          </p>
          <div className="pt-4 space-y-2">
            <p className="text-xs text-slate-500">
              <strong>Power BI Report ID:</strong> {powerBiId}
            </p>
            <p className="text-xs text-slate-500">
              Pour intégrer réellement Power BI, utilisez le SDK Power BI Embedded
            </p>
          </div>
        </div>

        {/* Sample Data Visualization */}
        <div className="mt-8 w-full max-w-md">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="text-xs font-medium text-slate-600 w-20">Metric 1:</div>
              <div className="flex-1 bg-orange-200 rounded h-6 flex items-center px-2">
                <span className="text-xs font-bold text-orange-900">87%</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-xs font-medium text-slate-600 w-20">Metric 2:</div>
              <div className="flex-1 bg-green-200 rounded h-6 flex items-center px-2">
                <span className="text-xs font-bold text-green-900">94%</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-xs font-medium text-slate-600 w-20">Metric 3:</div>
              <div className="flex-1 bg-blue-200 rounded h-6 flex items-center px-2">
                <span className="text-xs font-bold text-blue-900">142</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-neutral-200 text-xs text-slate-500 space-y-1">
        <p>🔄 Mise à jour automatique toutes les heures</p>
        <p>🔒 Données filtrées selon votre rôle et site</p>
      </div>
    </div>
  );
}