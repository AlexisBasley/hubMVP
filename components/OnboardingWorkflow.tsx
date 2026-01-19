import React, { useState } from 'react';
import {
  CheckCircle,
  Circle,
  AlertCircle,
  Plus,
  ArrowRight,
  FileCheck,
  User,
  Shield,
  Award,
  Briefcase,
} from 'lucide-react';

interface OnboardingCase {
  id: string;
  name: string;
  role: string;
  step: number;
  status: 'in_progress' | 'completed' | 'blocked';
  startDate: string;
}

export default function OnboardingWorkflow() {
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>('1');

  const onboardingCases: OnboardingCase[] = [
    {
      id: '1',
      name: 'Marc Bernard',
      role: 'Ouvrier polyvalent',
      step: 2,
      status: 'in_progress',
      startDate: '2024-10-25',
    },
    {
      id: '2',
      name: 'Aline Rousseau',
      role: 'Chef d\'équipe',
      step: 4,
      status: 'in_progress',
      startDate: '2024-10-28',
    },
    {
      id: '3',
      name: 'Pierre Lebrun',
      role: 'Électricien',
      step: 5,
      status: 'completed',
      startDate: '2024-10-01',
    },
  ];

  const workflowSteps = [
    {
      number: 1,
      title: 'Enregistrement',
      description: 'Saisie des données personnelles et professionnelles',
      icon: <User size={24} />,
    },
    {
      number: 2,
      title: 'Vérification documents',
      description: 'Contrôle des pièces justificatives et légales',
      icon: <FileCheck size={24} />,
    },
    {
      number: 3,
      title: 'Attribution badge',
      description: 'Génération et remise du badge d\'accès',
      icon: <Award size={24} />,
    },
    {
      number: 4,
      title: 'Sécurité du site',
      description: 'Formation sécurité et accès au site',
      icon: <Shield size={24} />,
    },
    {
      number: 5,
      title: 'Finalisation',
      description: 'Signature documents et mise en production',
      icon: <Briefcase size={24} />,
    },
  ];

  const getStepStatus = (caseStep: number, stepNumber: number) => {
    if (stepNumber < caseStep) return 'completed';
    if (stepNumber === caseStep) return 'current';
    return 'pending';
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          Accueil Chantier
        </h1>
        <p className="text-slate-600">
          Workflow complet d'onboarding avec vérification et quiz sécurité
        </p>
      </div>

      {/* Toolbar */}
      <div className="mb-6">
        <button className="flex items-center justify-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
          <Plus size={20} />
          Nouveau onboarding
        </button>
      </div>

      {/* Onboarding Cases */}
      <div className="space-y-6 mb-8">
        {onboardingCases.map(onboardingCase => (
          <div
            key={onboardingCase.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden border border-neutral-200"
          >
            {/* Case Header */}
            <button
              onClick={() =>
                setExpandedCaseId(
                  expandedCaseId === onboardingCase.id ? null : onboardingCase.id
                )
              }
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                {onboardingCase.status === 'completed' ? (
                  <CheckCircle size={24} className="text-green-600" />
                ) : onboardingCase.status === 'blocked' ? (
                  <AlertCircle size={24} className="text-red-600" />
                ) : (
                  <Circle size={24} className="text-orange-500" />
                )}
                <div className="text-left">
                  <h3 className="font-semibold text-slate-900">
                    {onboardingCase.name}
                  </h3>
                  <p className="text-sm text-slate-600">{onboardingCase.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900">
                    Étape {onboardingCase.step}/5
                  </p>
                  <p className="text-xs text-slate-500">
                    {new Date(onboardingCase.startDate).toLocaleDateString(
                      'fr-FR'
                    )}
                  </p>
                </div>
                <ArrowRight
                  size={20}
                  className={`text-slate-400 transition-transform ${
                    expandedCaseId === onboardingCase.id ? 'rotate-90' : ''
                  }`}
                />
              </div>
            </button>

            {/* Case Details */}
            {expandedCaseId === onboardingCase.id && (
              <div className="border-t border-neutral-200 px-6 py-6">
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-slate-900">Progression</h4>
                    <span className="text-sm text-slate-600">
                      {Math.round((onboardingCase.step / 5) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-3">
                    <div
                      className="h-3 bg-orange-500 rounded-full transition-all"
                      style={{
                        width: `${(onboardingCase.step / 5) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Workflow Steps */}
                <div className="space-y-4">
                  {workflowSteps.map((step, index) => {
                    const status = getStepStatus(onboardingCase.step, step.number);
                    return (
                      <div key={step.number} className="flex gap-4">
                        {/* Step Indicator */}
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-colors ${
                              status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : status === 'current'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-neutral-100 text-neutral-500'
                            }`}
                          >
                            {status === 'completed' ? (
                              <CheckCircle size={24} />
                            ) : (
                              step.number
                            )}
                          </div>
                          {index < workflowSteps.length - 1 && (
                            <div
                              className={`w-1 h-8 transition-colors ${
                                status === 'completed' || status === 'current'
                                  ? 'bg-orange-300'
                                  : 'bg-neutral-200'
                              }`}
                            ></div>
                          )}
                        </div>

                        {/* Step Content */}
                        <div className="flex-1 py-2">
                          <h5
                            className={`font-semibold mb-1 ${
                              status === 'pending'
                                ? 'text-slate-500'
                                : 'text-slate-900'
                            }`}
                          >
                            {step.title}
                          </h5>
                          <p className="text-sm text-slate-600">
                            {step.description}
                          </p>
                          {status === 'current' && (
                            <button className="mt-3 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors">
                              Continuer
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Process Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Processus complet d'onboarding
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {workflowSteps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="bg-orange-50 rounded-lg p-6 text-center">
                <div className="flex justify-center mb-4 text-orange-600">
                  {step.icon}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 text-sm">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600">{step.description}</p>
              </div>
              {index < workflowSteps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                  <ArrowRight size={20} className="text-slate-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}