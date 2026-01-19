import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Download,
  Eye,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Filter,
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  intervenant: string;
  expirationDate: string;
  uploadDate: string;
  status: 'valid' | 'expiring_soon' | 'expired';
  category: string;
}

export default function DocumentsManagement() {
  const [filterCategory, setFilterCategory] = useState<'all' | 'certification' | 'medical' | 'legal'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'valid' | 'expiring_soon' | 'expired'>('all');

  const documents: Document[] = [
    {
      id: '1',
      name: 'Certificat SST',
      type: 'Attestation de compétence',
      intervenant: 'Jean Dupont',
      expirationDate: '2026-05-15',
      uploadDate: '2023-05-15',
      status: 'valid',
      category: 'certification',
    },
    {
      id: '2',
      name: 'Visite médicale',
      type: 'Certificat médical',
      intervenant: 'Sophie Martin',
      expirationDate: '2024-11-20',
      uploadDate: '2023-11-20',
      status: 'expiring_soon',
      category: 'medical',
    },
    {
      id: '3',
      name: 'Carte de séjour',
      type: 'Document d\'identité',
      intervenant: 'Marc Bernard',
      expirationDate: '2024-03-10',
      uploadDate: '2022-03-10',
      status: 'expired',
      category: 'legal',
    },
    {
      id: '4',
      name: 'Permis CACES 1',
      type: 'Certificat',
      intervenant: 'Valérie Gassier',
      expirationDate: '2025-08-30',
      uploadDate: '2023-08-30',
      status: 'valid',
      category: 'certification',
    },
    {
      id: '5',
      name: 'DUER (Document Unique)',
      type: 'Attestation',
      intervenant: 'Thomas Leblanc',
      expirationDate: '2024-06-15',
      uploadDate: '2023-06-15',
      status: 'expiring_soon',
      category: 'legal',
    },
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    return matchesCategory && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    if (status === 'valid') {
      return <CheckCircle size={18} className="text-green-600" />;
    } else if (status === 'expiring_soon') {
      return <AlertTriangle size={18} className="text-amber-600" />;
    } else {
      return <AlertTriangle size={18} className="text-red-600" />;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      valid: 'Valide',
      expiring_soon: 'Expire bientôt',
      expired: 'Expiré',
    };
    return labels[status as keyof typeof labels];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      valid: 'bg-green-100 text-green-800 border-green-300',
      expiring_soon: 'bg-amber-100 text-amber-800 border-amber-300',
      expired: 'bg-red-100 text-red-800 border-red-300',
    };
    return colors[status as keyof typeof colors];
  };

  const daysUntilExpiration = (expirationDate: string) => {
    const expDate = new Date(expirationDate);
    const today = new Date();
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          Documents Habilitants
        </h1>
        <p className="text-slate-600">
          Dépôt catégorisé, alertes expiration et validation documentaire
        </p>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          {/* Filter by category */}
          <select
            value={filterCategory}
            onChange={e =>
              setFilterCategory(
                e.target.value as 'all' | 'certification' | 'medical' | 'legal'
              )
            }
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
          >
            <option value="all">Toutes les catégories</option>
            <option value="certification">Certifications</option>
            <option value="medical">Médicaux</option>
            <option value="legal">Légaux</option>
          </select>

          {/* Filter by status */}
          <select
            value={filterStatus}
            onChange={e =>
              setFilterStatus(
                e.target.value as 'all' | 'valid' | 'expiring_soon' | 'expired'
              )
            }
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
          >
            <option value="all">Tous les statuts</option>
            <option value="valid">Valides</option>
            <option value="expiring_soon">Expire bientôt</option>
            <option value="expired">Expirés</option>
          </select>

          <div className="flex-1"></div>

          {/* Upload Button */}
          <button className="flex items-center justify-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
            <Plus size={20} />
            Ajouter un document
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-orange-500">
          <p className="text-sm text-slate-600">Total documents</p>
          <p className="text-2xl font-bold text-slate-900">{documents.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
          <p className="text-sm text-slate-600">Valides</p>
          <p className="text-2xl font-bold text-slate-900">
            {documents.filter(d => d.status === 'valid').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-amber-500">
          <p className="text-sm text-slate-600">Expire bientôt</p>
          <p className="text-2xl font-bold text-slate-900">
            {documents.filter(d => d.status === 'expiring_soon').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-500">
          <p className="text-sm text-slate-600">Expirés</p>
          <p className="text-2xl font-bold text-slate-900">
            {documents.filter(d => d.status === 'expired').length}
          </p>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Document
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Intervenant
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Expiration
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Statut
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map(doc => {
                const daysLeft = daysUntilExpiration(doc.expirationDate);
                return (
                  <tr
                    key={doc.id}
                    className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-50 rounded-lg">
                          <FileText size={20} className="text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{doc.name}</p>
                          <p className="text-sm text-slate-500">{doc.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700">{doc.intervenant}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-700">
                        <Calendar size={16} className="text-slate-400" />
                        <span className="text-sm">
                          {new Date(doc.expirationDate).toLocaleDateString('fr-FR')}
                        </span>
                        {daysLeft < 30 && (
                          <span className="text-xs text-amber-600 font-medium">
                            ({daysLeft} jours)
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(doc.status)}
                        <span
                          className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                            doc.status
                          )}`}
                        >
                          {getStatusLabel(doc.status)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button className="inline-flex items-center justify-center p-2 hover:bg-neutral-200 rounded-lg transition-colors text-slate-600" title="Voir">
                        <Eye size={18} />
                      </button>
                      <button className="inline-flex items-center justify-center p-2 hover:bg-neutral-200 rounded-lg transition-colors text-slate-600" title="Télécharger">
                        <Download size={18} />
                      </button>
                      <button className="inline-flex items-center justify-center p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600" title="Supprimer">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}