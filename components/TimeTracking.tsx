import React, { useState } from 'react';
import {
  Clock,
  Plus,
  Check,
  X,
  Download,
  AlertCircle,
  Calendar,
} from 'lucide-react';

interface TimeEntry {
  id: string;
  intervenant: string;
  date: string;
  hoursWorked: number;
  validated: boolean;
  notes?: string;
}

export default function TimeTracking() {
  const [selectedWeek, setSelectedWeek] = useState('2024-W45');
  const [validationMode, setValidationMode] = useState<'daily' | 'monthly'>('monthly');

  const timeEntries: TimeEntry[] = [
    {
      id: '1',
      intervenant: 'Jean Dupont',
      date: '2024-10-28',
      hoursWorked: 8,
      validated: true,
    },
    {
      id: '2',
      intervenant: 'Sophie Martin',
      date: '2024-10-28',
      hoursWorked: 8,
      validated: false,
    },
    {
      id: '3',
      intervenant: 'Marc Bernard',
      date: '2024-10-28',
      hoursWorked: 7.5,
      validated: true,
    },
    {
      id: '4',
      intervenant: 'Valérie Gassier',
      date: '2024-10-28',
      hoursWorked: 8,
      validated: false,
    },
    {
      id: '5',
      intervenant: 'Thomas Leblanc',
      date: '2024-10-28',
      hoursWorked: 0,
      validated: false,
      notes: 'Absence justifiée',
    },
  ];

  const validatedCount = timeEntries.filter(e => e.validated).length;
  const totalHours = timeEntries.reduce((sum, e) => sum + e.hoursWorked, 0);

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Suivi des Heures</h1>
        <p className="text-slate-600">
          Saisie quotidienne/mensuelle, validation masse et préparation paie
        </p>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          {/* Week/Month Selector */}
          <div className="relative">
            <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="week"
              value={selectedWeek}
              onChange={e => setSelectedWeek(e.target.value)}
              className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
            />
          </div>

          {/* Mode Toggle */}
          <div className="flex gap-2 bg-neutral-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setValidationMode('daily')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                validationMode === 'daily'
                  ? 'bg-orange-500 text-white'
                  : 'text-slate-700 hover:bg-neutral-200'
              }`}
            >
              Quotidien
            </button>
            <button
              onClick={() => setValidationMode('monthly')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                validationMode === 'monthly'
                  ? 'bg-orange-500 text-white'
                  : 'text-slate-700 hover:bg-neutral-200'
              }`}
            >
              Mensuel
            </button>
          </div>

          <div className="flex-1"></div>

          {/* Action Buttons */}
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg font-medium hover:bg-neutral-50 transition-colors text-slate-700">
            <Download size={20} />
            Exporter
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
            <Plus size={20} />
            Nouvelle saisie
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-orange-500">
          <p className="text-sm text-slate-600">Heures totales</p>
          <p className="text-3xl font-bold text-slate-900">{totalHours.toFixed(1)}h</p>
          <p className="text-xs text-slate-500 mt-2">Semaine {selectedWeek}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
          <p className="text-sm text-slate-600">Validées</p>
          <p className="text-3xl font-bold text-slate-900">{validatedCount}/{timeEntries.length}</p>
          <div className="w-full bg-neutral-200 rounded-full h-2 mt-3">
            <div
              className="h-2 bg-green-500 rounded-full transition-all"
              style={{
                width: `${(validatedCount / timeEntries.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
          <p className="text-sm text-slate-600">Heures en attente</p>
          <p className="text-3xl font-bold text-slate-900">
            {(totalHours - timeEntries.filter(e => e.validated).reduce((sum, e) => sum + e.hoursWorked, 0)).toFixed(1)}h
          </p>
          <p className="text-xs text-slate-500 mt-2">À valider</p>
        </div>
      </div>

      {/* Time Entries Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Intervenant
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Heures travaillées
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Notes
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Validation
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {timeEntries.map(entry => (
                <tr
                  key={entry.id}
                  className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {entry.intervenant}
                  </td>
                  <td className="px-6 py-4 text-slate-700">
                    {new Date(entry.date).toLocaleDateString('fr-FR', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-orange-600" />
                      <span className="font-medium text-slate-900">
                        {entry.hoursWorked === 0 ? '-' : `${entry.hoursWorked}h`}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-700 text-sm">
                    {entry.notes && (
                      <div className="flex items-center gap-2 text-amber-700 bg-amber-50 px-3 py-1 rounded-lg w-fit">
                        <AlertCircle size={14} />
                        {entry.notes}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {entry.validated ? (
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                        <Check size={16} />
                        Validé
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-lg text-sm font-medium">
                        <AlertCircle size={16} />
                        En attente
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {!entry.validated && (
                      <>
                        <button className="inline-flex items-center justify-center p-2 hover:bg-green-100 rounded-lg transition-colors text-green-600" title="Valider">
                          <Check size={18} />
                        </button>
                        <button className="inline-flex items-center justify-center p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600" title="Rejeter">
                          <X size={18} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Actions en masse</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex items-center justify-center gap-2 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors">
            <Check size={20} />
            Valider toutes les saisies
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-2 border border-neutral-300 rounded-lg font-medium hover:bg-neutral-50 transition-colors text-slate-700">
            <Download size={20} />
            Préparer la paie
          </button>
        </div>
      </div>
    </div>
  );
}