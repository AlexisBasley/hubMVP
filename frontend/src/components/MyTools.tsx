import React, { useState, useEffect } from 'react';
import { useUserPreferences } from '../hooks/useUserPreferences';
import {
  Plus,
  X,
  GripVertical,
  ExternalLink,
  Trash2,
  Search,
  Globe,
  Database,
  BarChart3,
  FileText,
  Users,
  Mail,
  Calculator,
  Map,
  ClipboardList,
  Clock,
  Clipboard,
  Droplets,
  Layout,
  Radio,
  CheckSquare,
  Briefcase,
  Calendar,
  Truck,
} from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  category: 'suivi_chantier' | 'ged' | 'heures' | 'planning' | 'betons' | 'other';
  isActive: boolean;
  order: number;
}

interface AvailableTool {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  category: 'suivi_chantier' | 'ged' | 'heures' | 'planning' | 'betons' | 'other';
}

const AVAILABLE_TOOLS: AvailableTool[] = [
  {
    id: 'dalux',
    name: 'Dalux',
    description: 'Plateforme de collaboration et gestion de chantier en temps réel',
    url: 'https://dalux.com',
    icon: <Layout size={24} />,
    category: 'suivi_chantier',
  },
  {
    id: 'quickconnect',
    name: 'Quick Connect',
    description: 'Connexion rapide et communication instantanée sur le site',
    url: 'https://quickconnect.example.com',
    icon: <Radio size={24} />,
    category: 'suivi_chantier',
  },
  {
    id: 'resolving',
    name: 'Resolving',
    description: 'Gestion des incidents et résolutions de problèmes de chantier',
    url: 'https://resolving.example.com',
    icon: <CheckSquare size={24} />,
    category: 'suivi_chantier',
  },
  {
    id: 'edoc',
    name: 'E doc',
    description: 'Plateforme de gestion électronique de documents',
    url: 'https://edoc.example.com',
    icon: <FileText size={24} />,
    category: 'ged',
  },
  {
    id: 'acc',
    name: 'ACC',
    description: 'Système d\'archivage et de classement de documents',
    url: 'https://acc.example.com',
    icon: <Database size={24} />,
    category: 'ged',
  },
  {
    id: 'resolving-red',
    name: 'Resolving RED',
    description: 'Gestion documentaire et suivi des documents importants',
    url: 'https://resolving-red.example.com',
    icon: <FileText size={24} />,
    category: 'ged',
  },
  {
    id: 'sharepoint',
    name: 'SharePoint',
    description: 'Partage de documents et collaboration centralisée',
    url: 'https://sharepoint.com',
    icon: <FileText size={24} />,
    category: 'ged',
  },
  {
    id: 'excel',
    name: 'Excel Online',
    description: 'Tableaux et analyses de données de chantier',
    url: 'https://office.com/launch/excel',
    icon: <Calculator size={24} />,
    category: 'heures',
  },
  {
    id: 'puma',
    name: 'PUMA',
    description: 'Plateforme unifiée de management des absences et heures',
    url: 'https://puma.example.com',
    icon: <Clock size={24} />,
    category: 'heures',
  },
  {
    id: 'comet',
    name: 'COMET',
    description: 'Suivi en temps réel des heures travaillées et productivité',
    url: 'https://comet.example.com',
    icon: <Briefcase size={24} />,
    category: 'heures',
  },
  {
    id: 'powerbi',
    name: 'Power BI',
    description: 'Visualisation et analyse de suivi de chantier',
    url: 'https://powerbi.microsoft.com',
    icon: <BarChart3 size={24} />,
    category: 'suivi_chantier',
  },
  {
    id: 'dynamics',
    name: 'Dynamics 365',
    description: 'Gestion des ressources et planification du chantier',
    url: 'https://dynamics.microsoft.com',
    icon: <Database size={24} />,
    category: 'planning',
  },
  {
    id: 'forms',
    name: 'Microsoft Forms',
    description: 'Créer des formulaires et sondages de chantier',
    url: 'https://forms.microsoft.com',
    icon: <Clipboard size={24} />,
    category: 'suivi_chantier',
  },
  {
    id: 'planner',
    name: 'Microsoft Planner',
    description: 'Gestion de projets et tâches quotidiennes',
    url: 'https://tasks.office.com',
    icon: <ClipboardList size={24} />,
    category: 'planning',
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    description: 'Communication d\'équipe et collaboration en temps réel',
    url: 'https://teams.microsoft.com',
    icon: <Users size={24} />,
    category: 'suivi_chantier',
  },
  {
    id: 'maps',
    name: 'Google Maps',
    description: 'Localisation et navigation du chantier',
    url: 'https://maps.google.com',
    icon: <Map size={24} />,
    category: 'suivi_chantier',
  },
  {
    id: 'drive',
    name: 'Google Drive',
    description: 'Stockage et partage de fichiers de chantier',
    url: 'https://drive.google.com',
    icon: <Database size={24} />,
    category: 'ged',
  },
  {
    id: 'outlook',
    name: 'Outlook',
    description: 'Gestion des emails et calendrier de planning',
    url: 'https://outlook.office.com',
    icon: <Mail size={24} />,
    category: 'planning',
  },
  {
    id: 'timetracking',
    name: 'Time Tracking Software',
    description: 'Suivi des heures travaillées et contrôle du temps',
    url: 'https://timesheet.example.com',
    icon: <Clock size={24} />,
    category: 'heures',
  },
  {
    id: 'concretetracker',
    name: 'Concrete Tracker',
    description: 'Suivi en temps réel des approvisionnements en béton et traçabilité des coulées',
    url: 'https://concretetracker.example.com',
    icon: <Truck size={24} />,
    category: 'betons',
  },
  {
    id: 'concretedispatch',
    name: 'Concrete Dispatch',
    description: 'Gestion de la logistique et planification des livraisons de béton',
    url: 'https://concretedispatch.example.com',
    icon: <Truck size={24} />,
    category: 'betons',
  },
  {
    id: 'p6',
    name: 'P6',
    description: 'Logiciel de gestion de projets et planification avancée',
    url: 'https://www.oracle.com/project-portfolio-management/primavera-p6/',
    icon: <Calendar size={24} />,
    category: 'planning',
  },
  {
    id: 'msproject',
    name: 'MS Project',
    description: 'Outil de gestion de projets et planification Microsoft',
    url: 'https://www.microsoft.com/fr-fr/microsoft-365/project/project-management-software',
    icon: <Briefcase size={24} />,
    category: 'planning',
  },
  {
    id: 'aphex',
    name: 'Aphex',
    description: 'Plateforme de planification et gestion de ressources de chantier',
    url: 'https://aphex.example.com',
    icon: <ClipboardList size={24} />,
    category: 'planning',
  },
];

const CATEGORY_LABELS = {
  suivi_chantier: 'Suivi de chantier',
  ged: 'Gestion électronique de documents (GED)',
  heures: 'Suivi des heures travaillées',
  planning: 'Planning',
  betons: 'Suivi des bétons',
  other: 'Autres',
};

const CATEGORY_COLORS = {
  suivi_chantier: 'bg-blue-100 text-blue-800 border-blue-300',
  ged: 'bg-purple-100 text-purple-800 border-purple-300',
  heures: 'bg-orange-100 text-orange-800 border-orange-300',
  planning: 'bg-green-100 text-green-800 border-green-300',
  betons: 'bg-red-100 text-red-800 border-red-300',
  other: 'bg-gray-100 text-gray-800 border-gray-300',
};

const getIconForCategory = (category: string): React.ReactNode => {
  const icons: Record<string, React.ReactNode> = {
    suivi_chantier: <ClipboardList size={24} />,
    ged: <FileText size={24} />,
    heures: <Clock size={24} />,
    planning: <Calendar size={24} />,
    betons: <Droplets size={24} />,
    other: <Globe size={24} />,
  };
  return icons[category] || <Globe size={24} />;
};

export default function MyTools() {
  // Default tools to use if no preferences are saved
  const DEFAULT_TOOLS: Tool[] = [
    {
      id: 'dalux',
      name: 'Dalux',
      description: 'Plateforme de collaboration et gestion de chantier en temps réel',
      url: 'https://dalux.com',
      icon: <Layout size={24} />,
      category: 'suivi_chantier',
      isActive: true,
      order: 1,
    },
    {
      id: 'quickconnect',
      name: 'Quick Connect',
      description: 'Connexion rapide et communication instantanée sur le site',
      url: 'https://quickconnect.example.com',
      icon: <Radio size={24} />,
      category: 'suivi_chantier',
      isActive: true,
      order: 2,
    },
    {
      id: 'resolving',
      name: 'Resolving',
      description: 'Gestion des incidents et résolutions de problèmes de chantier',
      url: 'https://resolving.example.com',
      icon: <CheckSquare size={24} />,
      category: 'suivi_chantier',
      isActive: true,
      order: 3,
    },
    {
      id: 'edoc',
      name: 'E doc',
      description: 'Plateforme de gestion électronique de documents',
      url: 'https://edoc.example.com',
      icon: <FileText size={24} />,
      category: 'ged',
      isActive: true,
      order: 4,
    },
    {
      id: 'puma',
      name: 'PUMA',
      description: 'Plateforme unifiée de management des absences et heures',
      url: 'https://puma.example.com',
      icon: <Clock size={24} />,
      category: 'heures',
      isActive: true,
      order: 5,
    },
    {
      id: 'comet',
      name: 'COMET',
      description: 'Suivi en temps réel des heures travaillées et productivité',
      url: 'https://comet.example.com',
      icon: <Briefcase size={24} />,
      category: 'heures',
      isActive: true,
      order: 6,
    },
    {
      id: 'p6',
      name: 'P6',
      description: 'Logiciel de gestion de projets et planification avancée',
      url: 'https://www.oracle.com/project-portfolio-management/primavera-p6/',
      icon: <Calendar size={24} />,
      category: 'planning',
      isActive: true,
      order: 7,
    },
    {
      id: 'msproject',
      name: 'MS Project',
      description: 'Outil de gestion de projets et planification Microsoft',
      url: 'https://www.microsoft.com/fr-fr/microsoft-365/project/project-management-software',
      icon: <Briefcase size={24} />,
      category: 'planning',
      isActive: true,
      order: 8,
    },
    {
      id: 'aphex',
      name: 'Aphex',
      description: 'Plateforme de planification et gestion de ressources de chantier',
      url: 'https://aphex.example.com',
      icon: <ClipboardList size={24} />,
      category: 'planning',
      isActive: true,
      order: 9,
    },
    {
      id: 'concretetracker',
      name: 'Concrete Tracker',
      description: 'Suivi en temps réel des approvisionnements en béton et traçabilité des coulées',
      url: 'https://concretetracker.example.com',
      icon: <Truck size={24} />,
      category: 'betons',
      isActive: true,
      order: 10,
    },
    {
      id: 'concretedispatch',
      name: 'Concrete Dispatch',
      description: 'Gestion de la logistique et planification des livraisons de béton',
      url: 'https://concretedispatch.example.com',
      icon: <Truck size={24} />,
      category: 'betons',
      isActive: true,
      order: 11,
    },
  ];

  const { preferences, loading: prefsLoading, saveTools } = useUserPreferences();
  const [activeTools, setActiveTools] = useState<Tool[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [showCustomToolForm, setShowCustomToolForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'suivi_chantier' | 'ged' | 'heures' | 'planning' | 'betons' | 'other'>('all');
  const [draggedTool, setDraggedTool] = useState<Tool | null>(null);

  // Form state for custom tool
  const [customToolForm, setCustomToolForm] = useState({
    name: '',
    category: 'other' as 'suivi_chantier' | 'ged' | 'heures' | 'planning' | 'betons' | 'other',
    url: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Load tools from preferences on mount
  useEffect(() => {
    if (!prefsLoading && preferences.tools && Array.isArray(preferences.tools)) {
      // Reconstruct icons for tools loaded from preferences
      const toolsWithIcons = preferences.tools.map((tool: any) => ({
        ...tool,
        icon: tool.id.startsWith('custom-') 
          ? getIconForCategory(tool.category)
          : AVAILABLE_TOOLS.find(t => t.id === tool.id)?.icon || getIconForCategory(tool.category)
      }));
      setActiveTools(toolsWithIcons);
    } else if (!prefsLoading && (!preferences.tools || preferences.tools.length === 0)) {
      // Set default tools if none saved
      setActiveTools(DEFAULT_TOOLS);
    }
  }, [preferences.tools, prefsLoading]);

  // Auto-save tools whenever they change (debounced)
  useEffect(() => {
    // Don't save on initial load
    if (prefsLoading) return;
    
    const timer = setTimeout(() => {
      if (activeTools.length > 0 || preferences.tools) {
        // Remove icons before saving (they can't be serialized)
        const toolsToSave = activeTools.map(({ icon, ...rest }) => rest);
        saveTools(toolsToSave).catch(err => {
          console.error('Failed to save tools:', err);
        });
      }
    }, 1000); // Debounce 1 second

    return () => clearTimeout(timer);
  }, [activeTools, saveTools, preferences.tools, prefsLoading]);

  const filteredAvailableTools = AVAILABLE_TOOLS.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || tool.category === filterCategory;
    const isNotActive = !activeTools.find(t => t.id === tool.id);
    return matchesSearch && matchesCategory && isNotActive;
  });

  const handleAddTool = (tool: AvailableTool) => {
    const newTool: Tool = {
      ...tool,
      isActive: true,
      order: Math.max(...activeTools.map(t => t.order), 0) + 1,
    };
    setActiveTools([...activeTools, newTool]);
  };

  const handleAddCustomTool = () => {
    const errors: Record<string, string> = {};

    if (!customToolForm.name.trim()) {
      errors.name = 'Le nom est requis';
    }
    if (!customToolForm.url.trim()) {
      errors.url = 'L\'URL est requise';
    } else if (!/^https?:\/\/.+/.test(customToolForm.url)) {
      errors.url = 'L\'URL doit commencer par http:// ou https://';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newTool: Tool = {
      id: `custom-${Date.now()}`,
      name: customToolForm.name,
      description: '',
      url: customToolForm.url,
      icon: getIconForCategory(customToolForm.category),
      category: customToolForm.category,
      isActive: true,
      order: Math.max(...activeTools.map(t => t.order), 0) + 1,
    };

    setActiveTools([...activeTools, newTool]);
    setCustomToolForm({ name: '', category: 'other', url: '' });
    setFormErrors({});
    setShowCustomToolForm(false);
    setShowModal(false);
  };

  const handleRemoveTool = (id: string) => {
    setActiveTools(activeTools.filter(t => t.id !== id));
  };

  const handleDragStart = (e: React.DragEvent, tool: Tool) => {
    setDraggedTool(tool);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetTool: Tool) => {
    e.preventDefault();
    if (!draggedTool || draggedTool.id === targetTool.id) return;

    const newTools = [...activeTools];
    const draggedIndex = newTools.findIndex(t => t.id === draggedTool.id);
    const targetIndex = newTools.findIndex(t => t.id === targetTool.id);

    if (draggedIndex > -1 && targetIndex > -1) {
      [newTools[draggedIndex], newTools[targetIndex]] = [
        newTools[targetIndex],
        newTools[draggedIndex],
      ];
      setActiveTools(newTools);
    }
    setDraggedTool(null);
  };

  const toolsByCategory = activeTools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, Tool[]>);

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Mes Outils</h1>
        <p className="text-slate-600">Organisez et accédez rapidement à vos outils professionnels de chantier</p>
      </div>

      {/* Toolbar */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <button
          onClick={() => {
            setShowCustomToolForm(false);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
        >
          <Plus size={20} />
          Ajouter un outil
        </button>
        <p className="text-sm text-slate-600">
          💡 Glissez-déposez les outils pour les réorganiser
        </p>
      </div>

      {/* Active Tools by Category */}
      <div className="space-y-8">
        {Object.entries(CATEGORY_LABELS).map(([category, label]) => {
          const tools = toolsByCategory[category as keyof typeof CATEGORY_LABELS];
          if (!tools || tools.length === 0) return null;

          return (
            <div key={category}>
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS].split(' ')[0]}`}></div>
                {label}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tools
                  .sort((a, b) => a.order - b.order)
                  .map(tool => (
                    <div
                      key={tool.id}
                      draggable
                      onDragStart={e => handleDragStart(e, tool)}
                      onDragOver={handleDragOver}
                      onDrop={e => handleDrop(e, tool)}
                      className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-shadow cursor-move group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`p-3 rounded-lg ${CATEGORY_COLORS[tool.category].split(' ')[0]} ${CATEGORY_COLORS[tool.category].split(' ')[1]}`}>
                            {tool.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900 text-sm">
                              {tool.name}
                            </h3>
                            <span className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full border ${CATEGORY_COLORS[tool.category]}`}>
                              {CATEGORY_LABELS[tool.category]}
                            </span>
                          </div>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          <GripVertical size={18} className="text-slate-400" />
                        </div>
                      </div>

                      {tool.description && (
                        <p className="text-sm text-slate-600 mb-4">
                          {tool.description}
                        </p>
                      )}

                      <div className="flex gap-2">
                        <a
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors text-sm"
                        >
                          <ExternalLink size={16} />
                          Ouvrir
                        </a>
                        <button
                          onClick={() => handleRemoveTool(tool.id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                          title="Supprimer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {activeTools.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔧</div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Aucun outil configuré
          </h3>
          <p className="text-slate-600 mb-6">
            Commencez par ajouter les outils que vous utilisez sur votre chantier
          </p>
          <button
            onClick={() => {
              setShowCustomToolForm(false);
              setShowModal(true);
            }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
          >
            <Plus size={20} />
            Ajouter votre premier outil
          </button>
        </div>
      )}

      {/* Modal - Add Tools */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-gradient-to-r from-orange-50 to-white">
              <h2 className="text-xl font-bold text-slate-900">
                {showCustomToolForm ? 'Créer un nouvel outil' : 'Ajouter des outils'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setShowCustomToolForm(false);
                  setSearchTerm('');
                  setFilterCategory('all');
                  setFormErrors({});
                }}
                className="p-2 hover:bg-neutral-200 rounded-lg transition-colors text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            {showCustomToolForm ? (
              // Custom Tool Form
              <div className="px-6 py-6 overflow-y-auto flex-1">
                <div className="space-y-6">
                  {/* Name Input */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Nom de l'outil *
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Jira, Figma, Slack..."
                      value={customToolForm.name}
                      onChange={(e) => {
                        setCustomToolForm({
                          ...customToolForm,
                          name: e.target.value,
                        });
                        if (formErrors.name) {
                          setFormErrors({ ...formErrors, name: '' });
                        }
                      }}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                        formErrors.name ? 'border-red-500' : 'border-neutral-300'
                      }`}
                    />
                    {formErrors.name && (
                      <p className="text-sm text-red-600 mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  {/* Category Select */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Catégorie *
                    </label>
                    <select
                      value={customToolForm.category}
                      onChange={(e) =>
                        setCustomToolForm({
                          ...customToolForm,
                          category: e.target.value as 'suivi_chantier' | 'ged' | 'heures' | 'planning' | 'betons' | 'other',
                        })
                      }
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                    >
                      {Object.entries(CATEGORY_LABELS).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* URL Input */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Lien URL *
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={customToolForm.url}
                      onChange={(e) => {
                        setCustomToolForm({
                          ...customToolForm,
                          url: e.target.value,
                        });
                        if (formErrors.url) {
                          setFormErrors({ ...formErrors, url: '' });
                        }
                      }}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                        formErrors.url ? 'border-red-500' : 'border-neutral-300'
                      }`}
                    />
                    {formErrors.url && (
                      <p className="text-sm text-red-600 mt-1">{formErrors.url}</p>
                    )}
                    <p className="text-xs text-slate-500 mt-1">
                      L'URL doit commencer par http:// ou https://
                    </p>
                  </div>

                  {/* Preview */}
                  <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                    <p className="text-sm font-semibold text-slate-900 mb-3">Aperçu</p>
                    <div className="bg-white rounded-lg p-4 border border-neutral-200">
                      <div className="flex items-start gap-3">
                        <div className={`p-3 rounded-lg ${CATEGORY_COLORS[customToolForm.category].split(' ')[0]} ${CATEGORY_COLORS[customToolForm.category].split(' ')[1]}`}>
                          {getIconForCategory(customToolForm.category)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 text-sm">
                            {customToolForm.name || 'Nom de l\'outil'}
                          </h4>
                          <span className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full border ${CATEGORY_COLORS[customToolForm.category]}`}>
                            {CATEGORY_LABELS[customToolForm.category]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 mt-8 pt-6 border-t border-neutral-200">
                  <button
                    onClick={() => {
                      setShowCustomToolForm(false);
                      setFormErrors({});
                      setCustomToolForm({ name: '', category: 'other', url: '' });
                    }}
                    className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg font-medium text-slate-700 hover:bg-neutral-50 transition-colors"
                  >
                    Retour
                  </button>
                  <button
                    onClick={handleAddCustomTool}
                    className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Créer et ajouter
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Modal Filters */}
                <div className="px-6 py-4 border-b border-neutral-200 space-y-4 bg-neutral-50">
                  {/* Search */}
                  <div className="relative">
                    <Search
                      size={20}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      placeholder="Rechercher un outil..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setFilterCategory('all')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                        filterCategory === 'all'
                          ? 'bg-orange-500 text-white'
                          : 'bg-white text-slate-700 border border-neutral-300 hover:bg-neutral-50'
                      }`}
                    >
                      Tous
                    </button>
                    {(Object.entries(CATEGORY_LABELS) as [string, string][])
                      .filter(([key]) => key !== 'all')
                      .map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => setFilterCategory(key as typeof filterCategory)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                            filterCategory === key
                              ? 'bg-orange-500 text-white'
                              : `${CATEGORY_COLORS[key as keyof typeof CATEGORY_COLORS]} border`
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                  </div>
                </div>

                {/* Modal Content */}
                <div className="px-6 py-4 overflow-y-auto flex-1">
                  {filteredAvailableTools.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-slate-600 mb-4">
                        Aucun outil disponible ne correspond à votre recherche
                      </p>
                      <button
                        onClick={() => setShowCustomToolForm(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors text-sm"
                      >
                        <Plus size={16} />
                        Créer un nouvel outil
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredAvailableTools.map(tool => (
                        <div
                          key={tool.id}
                          className="p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors flex items-start justify-between"
                        >
                          <div className="flex items-start gap-3 flex-1">
                            <div className={`p-2 rounded-lg ${CATEGORY_COLORS[tool.category].split(' ')[0]} ${CATEGORY_COLORS[tool.category].split(' ')[1]}`}>
                              {tool.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-slate-900 text-sm">
                                {tool.name}
                              </h4>
                              <p className="text-xs text-slate-600 mt-1">
                                {tool.description}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleAddTool(tool)}
                            className="ml-3 flex items-center justify-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors text-sm"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      ))}

                      {/* Separator */}
                      <div className="my-4 border-t border-neutral-200 pt-4">
                        <p className="text-sm font-semibold text-slate-900 mb-3">
                          L'outil que vous cherchez n'est pas dans la liste ?
                        </p>
                        <button
                          onClick={() => setShowCustomToolForm(true)}
                          className="w-full px-4 py-3 border-2 border-orange-300 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <Plus size={18} />
                          Créer un nouvel outil
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}