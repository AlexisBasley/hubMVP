import React from 'react';
import {
  BarChart3,
  Users,
  FileCheck,
  Clock,
  Shield,
  Wrench,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: <BarChart3 size={32} />,
      title: 'Cockpit 360',
      description:
        'Tableau de bord personnalisable avec dashboards Power BI en temps réel pour piloter votre chantier',
      color: 'bg-blue-50 border-blue-200 text-blue-600',
    },
    {
      icon: <Users size={32} />,
      title: 'Gestion des Intervenants',
      description:
        'Suivi complet des profils, gestion des droits d\'accès et conformité documentaire',
      color: 'bg-purple-50 border-purple-200 text-purple-600',
    },
    {
      icon: <FileCheck size={32} />,
      title: 'Documents Habilitants',
      description:
        'Dépôt centralisé avec alertes d\'expiration et validation documentaire automatisée',
      color: 'bg-red-50 border-red-200 text-red-600',
    },
    {
      icon: <Clock size={32} />,
      title: 'Suivi des Heures',
      description:
        'Saisie quotidienne/mensuelle des heures, validation en masse et préparation paie',
      color: 'bg-orange-50 border-orange-200 text-orange-600',
    },
    {
      icon: <Shield size={32} />,
      title: 'Accueil Chantier',
      description:
        'Workflow complet d\'onboarding avec vérification documentaire et quiz sécurité',
      color: 'bg-green-50 border-green-200 text-green-600',
    },
    {
      icon: <Wrench size={32} />,
      title: 'Mes Outils',
      description:
        'Accès rapide et organisé à vos outils professionnels avec drag-and-drop',
      color: 'bg-indigo-50 border-indigo-200 text-indigo-600',
    },
  ];

  const benefits = [
    'Gestion simplifiée et centralisée de votre chantier',
    'Conformité légale et documentaire garantie',
    'Gain de temps sur les tâches administratives',
    'Meilleure traçabilité et reporting',
    'Interface intuitive et responsive',
    'Intégration Power BI native',
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center">
                <span className="font-bold text-xl">S</span>
              </div>
              <h1 className="text-5xl font-bold">Hub Smart Solutions</h1>
            </div>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              La plateforme tout-en-un pour piloter vos chantiers avec efficacité,
              sécurité et conformité
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold text-lg transition-colors">
              Commencer
              <ArrowRight size={24} />
            </button>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-6 border border-white border-opacity-20">
              <p className="text-4xl font-bold text-orange-400 mb-2">6</p>
              <p className="text-slate-200">Modules principaux</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-6 border border-white border-opacity-20">
              <p className="text-4xl font-bold text-orange-400 mb-2">100%</p>
              <p className="text-slate-200">Conformité légale</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-6 border border-white border-opacity-20">
              <p className="text-4xl font-bold text-orange-400 mb-2">Live</p>
              <p className="text-slate-200">Données en temps réel</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Fonctionnalités Principales
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Une solution complète pour gérer tous les aspects de votre chantier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`rounded-lg border-2 p-8 transition-transform hover:scale-105 ${feature.color}`}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Benefits List */}
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Pourquoi Hub Smart Solutions ?
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Simplifiez la gestion de votre chantier et concentrez-vous sur
                votre cœur de métier
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <CheckCircle size={24} className="text-orange-500 flex-shrink-0 mt-1" />
                    <span className="text-lg text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Illustration */}
            <div className="bg-gradient-to-br from-orange-50 to-slate-50 rounded-lg p-12 border-2 border-orange-200">
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-orange-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                      <BarChart3 size={20} className="text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 text-sm">
                        Dashboards intelligents
                      </p>
                    </div>
                  </div>
                  <div className="h-8 bg-gradient-to-r from-orange-200 to-orange-100 rounded w-full"></div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-orange-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <CheckCircle size={20} className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 text-sm">
                        Conformité garantie
                      </p>
                    </div>
                  </div>
                  <div className="h-8 bg-gradient-to-r from-green-200 to-green-100 rounded w-full"></div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-orange-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Clock size={20} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 text-sm">
                        Gain de temps
                      </p>
                    </div>
                  </div>
                  <div className="h-8 bg-gradient-to-r from-blue-200 to-blue-100 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-20 px-6 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Modules Disponibles
            </h2>
            <p className="text-xl text-slate-600">
              Accédez à tous les outils depuis votre tableau de bord
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Cockpit 360',
                desc: 'Tableau de bord centralisant tous vos KPIs',
              },
              {
                title: 'Gestion des Intervenants',
                desc: 'Suivi complet des profils et conformité',
              },
              {
                title: 'Documents Habilitants',
                desc: 'Gestion documentaire avec alertes',
              },
              {
                title: 'Suivi des Heures',
                desc: 'Validation et préparation paie',
              },
              {
                title: 'Accueil Chantier',
                desc: 'Onboarding complet des intervenants',
              },
              {
                title: 'Mes Outils',
                desc: 'Accès rapide à vos applications',
              },
            ].map((module, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 border border-neutral-200 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                  <ArrowRight size={24} className="text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {module.title}
                </h3>
                <p className="text-slate-600">{module.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à transformer la gestion de votre chantier ?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Commencez dès maintenant avec Hub Smart Solutions
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-neutral-100 text-orange-600 rounded-lg font-bold text-lg transition-colors">
            Accéder au tableau de bord
            <ArrowRight size={24} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                  <span className="font-bold text-white text-sm">S</span>
                </div>
                <span className="font-bold text-white">Hub Smart</span>
              </div>
              <p className="text-sm">
                La plateforme complète pour piloter votre chantier
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Produit</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Fonctionnalités
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Tarifs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sécurité
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support client
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Communauté
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Légal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Politique de confidentialité
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Conditions d'utilisation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    RGPD
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>© 2024 Hub Smart Solutions. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}