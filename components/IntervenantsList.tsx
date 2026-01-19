import React, { useState } from 'react';
import {
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Badge,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

interface Intervenant {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  documentStatus: 'compliant' | 'pending' | 'expired';
  badgeNumber: string;
  onboardingDate: string;
}

export default function IntervenantsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending' | 'inactive'>('all');

  const intervenants: Intervenant[] = [
    {
      id: '1',
      name: 'Jean Dupont',
      role: 'Chef de chantier',
      email: 'jean.dupont@example.com',
      phone: '+33 6 12 34 56 78',
      status: 'active',
      documentStatus: 'compliant',
      badgeNumber: 'BC-001',
      onboardingDate: '2024-01-15',
    },
    {
      id: '2',
      name: 'Sophie Martin',
      role: 'Conducteur de travaux',
      email: 'sophie.martin@example.com',
      phone: '+33 6 23 45 67 89',
      status: 'active',
      documentStatus: 'pending',
      badgeNumber: 'BC-002',
      onboardingDate: '2024-02-20',
    },
    {
      id: '3',
      name: 'Marc Bernard',
      role: 'Ouvrier polyvalent',
      email: 'marc.bernard@example.com',
      phone: '+33 6 34 56 78 90',
      status: 'pending',
      documentStatus: 'pending',
      badgeNumber: 'BC-003',
      onboardingDate: '2024-03-10',
    },
    {
      id: '4',
      name: 'Valérie Gassier',
      role: 'Responsable sécurité',
      email: 'valerie.gassier@example.com',
      phone: '+33 6 45 67 89 01',
      status: 'active',
      documentStatus: 'compliant',
      badgeNumber: 'BC-004',
      onboardingDate: '2023-11-05',
    },
    {
      id: '5',
      name: 'Thomas Leblanc',
      role: 'Carreleur',
      email: 'thomas.leblanc@example.com',
      phone: '+33 6 56 78 90 12',
      status: 'inactive',
      documentStatus: 'expired',
      badgeNumber: 'BC-005',
      onboardingDate: '2023-08-12',
    },
  ];

  const filteredIntervenants = intervenants.filter(intervenant => {
    const matchesSearch = intervenant.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
      intervenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intervenant.badgeNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' || intervenant.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800 border-green-300',
      pending: 'bg-amber-100 text-amber-800 border-amber-300',
      inactive: 'bg-gray-100 text-gray-800 border-gray-300',
    };
    const labels = {
      active: 'Actif',
      pending: 'En attente',
      inactive: 'Inactif',
    };
    return (
      <span
        className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${
          styles[status as keyof typeof styles]
        }`}
      >
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getDocumentStatusIcon = (status: string) => {
    if (status === 'compliant') {
      return <CheckCircle size={18} className="text-green-600" />;
    } else if (status === 'pending') {
      return <AlertTriangle size={18} className="text-amber-600" />;
    } else {
      return <AlertTriangle size={18} className="text-red-600" />;
    }
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Gestion des Intervenants</h1>
        <p className="text-slate-600">Suivi détaillé, profils enrichis et gestion des droits</p>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          {/* Search */}
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, email ou badge..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Filter */}
          <select
            value={filterStatus}
            onChange={e =>
              setFilterStatus(e.target.value as 'all' | 'active' | 'pending' | 'inactive')
            }
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actifs</option>
            <option value="pending">En attente</option>
            <option value="inactive">Inactifs</option>
          </select>

          {/* Add Button */}
          <button className="flex items-center justify-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
            <Plus size={20} />
            Ajouter
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-orange-500">
          <p className="text-sm text-slate-600">Total intervenants</p>
          <p className="text-2xl font-bold text-slate-900">{intervenants.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
          <p className="text-sm text-slate-600">Actifs</p>
          <p className="text-2xl font-bold text-slate-900">
            {intervenants.filter(i => i.status === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-amber-500">
          <p className="text-sm text-slate-600">En attente</p>
          <p className="text-2xl font-bold text-slate-900">
            {intervenants.filter(i => i.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-500">
          <p className="text-sm text-slate-600">Documents expirés</p>
          <p className="text-2xl font-bold text-slate-900">
            {intervenants.filter(i => i.documentStatus === 'expired').length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Intervenant
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Rôle
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Badge
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Documents
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredIntervenants.map(intervenant => (
                <tr
                  key={intervenant.id}
                  className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-900">{intervenant.name}</p>
                      <p className="text-sm text-slate-500">{intervenant.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-700">{intervenant.role}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Badge size={16} className="text-orange-600" />
                      {intervenant.badgeNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(intervenant.status)}</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    {getDocumentStatusIcon(intervenant.documentStatus)}
                    <span className="text-sm text-slate-600 capitalize">
                      {intervenant.documentStatus === 'compliant'
                        ? 'Conforme'
                        : intervenant.documentStatus === 'pending'
                        ? 'À renouveler'
                        : 'Expiré'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-neutral-200 rounded-lg transition-colors text-slate-600">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}