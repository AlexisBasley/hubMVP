# Spécifications Fonctionnelles - Hub Smart Solutions

**Version:** 1.0  
**Date:** 19 janvier 2026  
**Statut:** Draft  
**Projet:** hubMVP  

---

## Table des matières

1. [Vision du produit](#1-vision-du-produit)
2. [Personas](#2-personas)
3. [Architecture fonctionnelle](#3-architecture-fonctionnelle)
4. [Épiques et User Stories](#4-épiques-et-user-stories)
5. [Exigences non-fonctionnelles](#5-exigences-non-fonctionnelles)
6. [Roadmap](#6-roadmap)
7. [Annexes](#7-annexes)

---

## 1. Vision du produit

### 1.1 Description

**Hub Smart Solutions** est une plateforme web centralisée destinée aux acteurs du secteur de la construction (BTP). Elle permet aux équipes de chantier de :

- Visualiser des indicateurs de performance (KPIs) via des dashboards Power BI personnalisables
- Accéder rapidement à leurs outils métier quotidiens
- Recevoir des notifications en temps réel
- Gérer leur espace de travail selon leur rôle et site

### 1.2 Objectifs business

| Objectif | Indicateur de succès |
|----------|---------------------|
| Centraliser l'accès aux outils | Réduction de 50% du temps de navigation entre outils |
| Améliorer la visibilité opérationnelle | 100% des KPIs critiques accessibles en < 3 clics |
| Personnaliser l'expérience utilisateur | Taux d'adoption > 80% après 3 mois |

### 1.3 Périmètre actuel (MVP)

Le prototype front-end actuel couvre :
- ✅ Module "Mon Cockpit" (dashboards personnalisables)
- ✅ Module "Mes Outils" (gestionnaire de liens)
- ✅ Centre de notifications
- ✅ Navigation multi-sites
- ✅ Système de rôles (UI uniquement)
- 🔜 Module "Mes solutions intelligentes" (placeholder)
- 🔜 Module "Mes Parcours" (placeholder)

---

## 2. Personas

### 2.1 Opérationnel (Chef de chantier)

| Attribut | Description |
|----------|-------------|
| **Nom** | Jean Dupont |
| **Rôle** | Chef de chantier |
| **Objectifs** | Suivre l'avancement quotidien, accéder rapidement aux outils terrain |
| **Pain points** | Trop d'outils différents, perte de temps à naviguer |
| **Besoins** | Vue synthétique, accès mobile, notifications push |

### 2.2 Directeur de travaux

| Attribut | Description |
|----------|-------------|
| **Nom** | Sophie Martin |
| **Rôle** | Directeur de travaux |
| **Objectifs** | Vision consolidée multi-sites, pilotage des KPIs |
| **Pain points** | Données dispersées, reporting manuel |
| **Besoins** | Dashboards agrégés, exports, comparaison inter-sites |

### 2.3 Administrateur

| Attribut | Description |
|----------|-------------|
| **Nom** | Marc Bernard |
| **Rôle** | Administrateur système |
| **Objectifs** | Gérer les accès, configurer la plateforme |
| **Pain points** | Gestion des droits complexe |
| **Besoins** | Console d'administration, audit logs |

---

## 3. Architecture fonctionnelle

### 3.1 Modules applicatifs

```
┌─────────────────────────────────────────────────────────────┐
│                     HUB SMART SOLUTIONS                      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Mon Cockpit │  │ Mes Outils  │  │ Mes Solutions IA    │  │
│  │ (Dashboards)│  │ (Liens)     │  │ (Coming soon)       │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Mes Parcours│  │ Notifs      │  │ Paramètres          │  │
│  │ (Coming soon│  │ Center      │  │ (User prefs)        │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                    SERVICES TRANSVERSES                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │   Auth   │  │  API GW  │  │ Storage  │  │ Analytics│    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Intégrations prévues

| Système externe | Type d'intégration | Priorité |
|-----------------|-------------------|----------|
| Power BI Embedded | SDK JavaScript | P0 |
| Azure AD / Entra ID | OAuth 2.0 / OIDC | P0 |
| Outils métier (Dalux, PUMA, etc.) | SSO / Deep links | P1 |
| API Backend (à créer) | REST / GraphQL | P0 |

---

## 4. Épiques et User Stories

---

### EPIC 1: Authentification et Gestion des accès

> **Objectif:** Permettre aux utilisateurs de s'authentifier de manière sécurisée et de gérer leurs sessions.

#### US 1.1 - Connexion utilisateur
**En tant qu'** utilisateur,  
**Je veux** me connecter avec mes identifiants entreprise (SSO),  
**Afin de** accéder à mon espace personnalisé de manière sécurisée.

**Critères d'acceptation:**
- [ ] Intégration Azure AD / Entra ID
- [ ] Redirection automatique si non authentifié
- [ ] Gestion du token JWT (stockage sécurisé)
- [ ] Refresh token automatique
- [ ] Message d'erreur explicite en cas d'échec

**Story Points:** 8  
**Priorité:** P0

---

#### US 1.2 - Déconnexion
**En tant qu'** utilisateur,  
**Je veux** me déconnecter de l'application,  
**Afin de** sécuriser mon accès sur un poste partagé.

**Critères d'acceptation:**
- [ ] Bouton de déconnexion accessible dans le header
- [ ] Suppression du token côté client
- [ ] Redirection vers la page de login
- [ ] Invalidation de la session côté serveur

**Story Points:** 3  
**Priorité:** P0

---

#### US 1.3 - Gestion des rôles
**En tant qu'** administrateur,  
**Je veux** que les droits d'accès soient appliqués selon le rôle de l'utilisateur,  
**Afin de** garantir que chaque utilisateur voit uniquement ce qui lui est autorisé.

**Critères d'acceptation:**
- [ ] 3 rôles supportés : `operationnel`, `director`, `admin`
- [ ] Menu de navigation filtré selon le rôle
- [ ] Dashboards filtrés selon le rôle
- [ ] API protégée par rôle (backend)

**Story Points:** 5  
**Priorité:** P0

---

#### US 1.4 - Sélection du site de travail
**En tant qu'** utilisateur multi-sites,  
**Je veux** sélectionner le chantier sur lequel je travaille,  
**Afin de** voir les données contextualisées à ce site.

**Critères d'acceptation:**
- [ ] Liste des sites autorisés pour l'utilisateur
- [ ] Sélecteur de site dans le header
- [ ] Persistance du choix (localStorage ou API)
- [ ] Filtrage automatique des données selon le site sélectionné

**Story Points:** 5  
**Priorité:** P0

---

### EPIC 2: Mon Cockpit (Dashboards)

> **Objectif:** Permettre aux utilisateurs de visualiser et personnaliser leurs tableaux de bord Power BI.

#### US 2.1 - Affichage des dashboards Power BI
**En tant qu'** utilisateur,  
**Je veux** visualiser mes dashboards Power BI directement dans l'application,  
**Afin de** consulter mes KPIs sans quitter la plateforme.

**Critères d'acceptation:**
- [ ] Intégration Power BI Embedded SDK
- [ ] Authentification transparente (AAD token)
- [ ] Affichage responsive des rapports
- [ ] Gestion des états : chargement, erreur, succès
- [ ] Bouton de rafraîchissement manuel

**Story Points:** 13  
**Priorité:** P0

---

#### US 2.2 - Galerie de dashboards disponibles
**En tant qu'** utilisateur,  
**Je veux** parcourir une galerie de dashboards disponibles,  
**Afin de** choisir ceux que je souhaite ajouter à mon cockpit.

**Critères d'acceptation:**
- [ ] Liste des dashboards disponibles (depuis API)
- [ ] Filtrage par catégorie (KPI, Opérations, Conformité, Ressources)
- [ ] Recherche textuelle
- [ ] Indication des dashboards déjà ajoutés
- [ ] Bouton d'ajout rapide

**Story Points:** 5  
**Priorité:** P1

---

#### US 2.3 - Personnalisation du cockpit (drag & drop)
**En tant qu'** utilisateur,  
**Je veux** réorganiser mes dashboards par glisser-déposer,  
**Afin de** prioriser les informations les plus importantes pour moi.

**Critères d'acceptation:**
- [ ] Drag & drop fonctionnel entre dashboards
- [ ] Indicateur visuel pendant le déplacement
- [ ] Persistance de l'ordre (API)
- [ ] Option de redimensionnement (demi-largeur / pleine largeur)

**Story Points:** 8  
**Priorité:** P1

---

#### US 2.4 - Suppression d'un dashboard
**En tant qu'** utilisateur,  
**Je veux** retirer un dashboard de mon cockpit,  
**Afin de** ne garder que les informations pertinentes.

**Critères d'acceptation:**
- [ ] Bouton de suppression sur chaque dashboard
- [ ] Confirmation avant suppression (optionnel)
- [ ] Mise à jour immédiate de l'affichage
- [ ] Persistance côté serveur

**Story Points:** 3  
**Priorité:** P1

---

#### US 2.5 - Sauvegarde de la configuration
**En tant qu'** utilisateur,  
**Je veux** que ma configuration de cockpit soit sauvegardée,  
**Afin de** la retrouver lors de ma prochaine connexion.

**Critères d'acceptation:**
- [ ] Sauvegarde automatique après chaque modification
- [ ] Endpoint API `PUT /users/{id}/dashboard-config`
- [ ] Chargement de la config au login
- [ ] Gestion des conflits (dernière modification gagne)

**Story Points:** 5  
**Priorité:** P1

---

### EPIC 3: Mes Outils

> **Objectif:** Permettre aux utilisateurs d'accéder rapidement à leurs outils métier depuis un hub centralisé.

#### US 3.1 - Affichage des outils par catégorie
**En tant qu'** utilisateur,  
**Je veux** voir mes outils organisés par catégorie,  
**Afin de** les retrouver facilement.

**Critères d'acceptation:**
- [ ] Affichage groupé par catégorie
- [ ] Catégories : Suivi chantier, GED, Heures, Planning, Bétons, Autres
- [ ] Icône et description pour chaque outil
- [ ] Lien externe vers l'outil (nouvelle fenêtre)

**Story Points:** 3  
**Priorité:** P1

---

#### US 3.2 - Ajout d'un outil depuis le catalogue
**En tant qu'** utilisateur,  
**Je veux** ajouter un outil depuis un catalogue prédéfini,  
**Afin de** enrichir mon espace de travail.

**Critères d'acceptation:**
- [ ] Modal avec liste des outils disponibles
- [ ] Filtrage par catégorie
- [ ] Recherche textuelle
- [ ] Ajout en un clic
- [ ] Feedback visuel (toast de confirmation)

**Story Points:** 5  
**Priorité:** P1

---

#### US 3.3 - Création d'un outil personnalisé
**En tant qu'** utilisateur,  
**Je veux** créer un lien vers un outil non référencé,  
**Afin de** centraliser tous mes accès.

**Critères d'acceptation:**
- [ ] Formulaire : Nom, URL, Catégorie
- [ ] Validation de l'URL (format http/https)
- [ ] Icône automatique selon la catégorie
- [ ] Aperçu avant création
- [ ] Sauvegarde côté serveur

**Story Points:** 5  
**Priorité:** P2

---

#### US 3.4 - Réorganisation des outils (drag & drop)
**En tant qu'** utilisateur,  
**Je veux** réorganiser mes outils par glisser-déposer,  
**Afin de** mettre en avant ceux que j'utilise le plus.

**Critères d'acceptation:**
- [ ] Drag & drop intra-catégorie
- [ ] Persistance de l'ordre
- [ ] Indicateur visuel de déplacement

**Story Points:** 5  
**Priorité:** P2

---

#### US 3.5 - Suppression d'un outil
**En tant qu'** utilisateur,  
**Je veux** retirer un outil de ma liste,  
**Afin de** garder un espace de travail épuré.

**Critères d'acceptation:**
- [ ] Bouton de suppression (icône corbeille)
- [ ] Suppression immédiate (pas de confirmation)
- [ ] Possibilité de ré-ajouter depuis le catalogue

**Story Points:** 2  
**Priorité:** P2

---

### EPIC 4: Notifications

> **Objectif:** Informer les utilisateurs des événements importants en temps réel.

#### US 4.1 - Centre de notifications
**En tant qu'** utilisateur,  
**Je veux** consulter mes notifications dans un panneau dédié,  
**Afin de** rester informé des événements importants.

**Critères d'acceptation:**
- [ ] Panneau accessible depuis l'icône cloche
- [ ] Liste des notifications triées par date
- [ ] Types : alerte, warning, success, info
- [ ] Horodatage relatif ("Il y a 2h")
- [ ] Scroll si liste longue

**Story Points:** 5  
**Priorité:** P1

---

#### US 4.2 - Badge de notifications non lues
**En tant qu'** utilisateur,  
**Je veux** voir un badge indiquant les notifications non lues,  
**Afin de** savoir si j'ai des actions en attente.

**Critères d'acceptation:**
- [ ] Badge numérique sur l'icône cloche
- [ ] Mise à jour en temps réel (WebSocket ou polling)
- [ ] Disparition après consultation

**Story Points:** 3  
**Priorité:** P1

---

#### US 4.3 - Actions depuis les notifications
**En tant qu'** utilisateur,  
**Je veux** cliquer sur une notification pour accéder au contexte,  
**Afin de** traiter rapidement l'événement signalé.

**Critères d'acceptation:**
- [ ] Lien d'action optionnel par notification
- [ ] Navigation vers le module concerné
- [ ] Marquage automatique comme "lu"

**Story Points:** 5  
**Priorité:** P2

---

#### US 4.4 - Notifications push (navigateur)
**En tant qu'** utilisateur,  
**Je veux** recevoir des notifications push même si l'application n'est pas au premier plan,  
**Afin de** ne pas manquer d'événements critiques.

**Critères d'acceptation:**
- [ ] Demande de permission au premier usage
- [ ] Service Worker pour les push
- [ ] Configuration des types de notifs souhaitées
- [ ] Respect du RGPD (opt-in)

**Story Points:** 8  
**Priorité:** P3

---

### EPIC 5: Interface et Navigation

> **Objectif:** Fournir une expérience utilisateur fluide et responsive.

#### US 5.1 - Sidebar de navigation
**En tant qu'** utilisateur,  
**Je veux** naviguer entre les modules via une sidebar,  
**Afin de** accéder rapidement aux différentes sections.

**Critères d'acceptation:**
- [ ] Sidebar fixe sur desktop
- [ ] Sidebar rétractable sur mobile (overlay)
- [ ] Indication visuelle du module actif
- [ ] Icônes + labels pour chaque entrée
- [ ] Affichage du rôle utilisateur

**Story Points:** 5  
**Priorité:** P0

---

#### US 5.2 - Header avec contexte
**En tant qu'** utilisateur,  
**Je veux** voir le contexte actuel (site, utilisateur) dans le header,  
**Afin de** m'assurer de travailler sur le bon périmètre.

**Critères d'acceptation:**
- [ ] Sélecteur de site
- [ ] Icône de notifications avec badge
- [ ] Avatar utilisateur avec nom
- [ ] Bouton de déconnexion
- [ ] Bouton toggle sidebar (mobile)

**Story Points:** 3  
**Priorité:** P0

---

#### US 5.3 - Responsive design
**En tant qu'** utilisateur mobile,  
**Je veux** utiliser l'application sur tablette et smartphone,  
**Afin de** consulter mes données sur le terrain.

**Critères d'acceptation:**
- [ ] Breakpoints : mobile (<768px), tablet (768-1024px), desktop (>1024px)
- [ ] Sidebar en overlay sur mobile
- [ ] Grilles adaptatives
- [ ] Touch-friendly (boutons 44px min)

**Story Points:** 8  
**Priorité:** P1

---

#### US 5.4 - Thème et accessibilité
**En tant qu'** utilisateur,  
**Je veux** une interface accessible et lisible,  
**Afin de** utiliser l'application confortablement.

**Critères d'acceptation:**
- [ ] Contraste WCAG AA minimum
- [ ] Navigation clavier complète
- [ ] Labels ARIA sur les éléments interactifs
- [ ] Focus visible
- [ ] (Optionnel) Mode sombre

**Story Points:** 5  
**Priorité:** P2

---

### EPIC 6: Backend API

> **Objectif:** Créer les services backend nécessaires au fonctionnement de l'application.

#### US 6.1 - API Utilisateurs
**En tant que** développeur front-end,  
**Je veux** une API pour récupérer les informations utilisateur,  
**Afin de** personnaliser l'interface.

**Endpoints:**
```
GET    /api/users/me                 → Profil utilisateur connecté
GET    /api/users/me/sites           → Sites autorisés
PUT    /api/users/me/preferences     → Màj préférences
```

**Story Points:** 5  
**Priorité:** P0

---

#### US 6.2 - API Configuration Dashboard
**En tant que** développeur front-end,  
**Je veux** une API pour gérer la configuration des dashboards,  
**Afin de** persister les personnalisations.

**Endpoints:**
```
GET    /api/dashboards/available     → Dashboards disponibles
GET    /api/users/me/dashboards      → Config utilisateur
PUT    /api/users/me/dashboards      → Sauvegarder config
```

**Story Points:** 5  
**Priorité:** P0

---

#### US 6.3 - API Outils
**En tant que** développeur front-end,  
**Je veux** une API pour gérer les outils utilisateur,  
**Afin de** persister les personnalisations.

**Endpoints:**
```
GET    /api/tools/catalog            → Catalogue d'outils
GET    /api/users/me/tools           → Outils de l'utilisateur
POST   /api/users/me/tools           → Ajouter un outil
DELETE /api/users/me/tools/{id}      → Supprimer un outil
PUT    /api/users/me/tools           → Màj ordre/liste
```

**Story Points:** 5  
**Priorité:** P1

---

#### US 6.4 - API Notifications
**En tant que** développeur front-end,  
**Je veux** une API pour gérer les notifications,  
**Afin de** afficher et marquer les notifications.

**Endpoints:**
```
GET    /api/notifications            → Liste des notifications
PUT    /api/notifications/{id}/read  → Marquer comme lu
GET    /api/notifications/unread-count → Compteur non lus
```

**Story Points:** 5  
**Priorité:** P1

---

#### US 6.5 - Intégration Power BI Embedded
**En tant que** développeur,  
**Je veux** un endpoint pour obtenir les tokens d'embed Power BI,  
**Afin de** afficher les rapports de manière sécurisée.

**Endpoints:**
```
GET    /api/powerbi/embed-token?reportId={id}  → Token d'embed
```

**Critères d'acceptation:**
- [ ] Service Principal Azure configuré
- [ ] Token généré avec les bons scopes
- [ ] Filtrage RLS (Row Level Security) selon le site/rôle
- [ ] Cache du token (durée de vie ~1h)

**Story Points:** 13  
**Priorité:** P0

---

## 5. Exigences non-fonctionnelles

### 5.1 Performance

| Métrique | Cible |
|----------|-------|
| Time to First Byte (TTFB) | < 200ms |
| First Contentful Paint (FCP) | < 1.5s |
| Largest Contentful Paint (LCP) | < 2.5s |
| Time to Interactive (TTI) | < 3s |

### 5.2 Sécurité

- Authentification OAuth 2.0 / OIDC obligatoire
- HTTPS uniquement
- Tokens JWT avec expiration courte (15 min) + refresh token
- Protection CSRF
- Headers de sécurité (CSP, X-Frame-Options, etc.)
- Audit logs des actions sensibles

### 5.3 Disponibilité

- SLA cible : 99.5%
- Déploiement blue/green pour zero-downtime
- Health checks sur tous les services

### 5.4 Scalabilité

- Architecture stateless
- CDN pour les assets statiques
- Auto-scaling horizontal

---

## 6. Roadmap

### Phase 1 - MVP Backend (Sprint 1-3)

| Sprint | Épiques | Objectif |
|--------|---------|----------|
| Sprint 1 | EPIC 1 (Auth), EPIC 6.1 | Authentification fonctionnelle |
| Sprint 2 | EPIC 2 (Cockpit), EPIC 6.2, EPIC 6.5 | Dashboards Power BI intégrés |
| Sprint 3 | EPIC 5 (UI polish), Tests E2E | MVP déployable |

### Phase 2 - Enrichissement (Sprint 4-6)

| Sprint | Épiques | Objectif |
|--------|---------|----------|
| Sprint 4 | EPIC 3 (Outils), EPIC 6.3 | Module Outils complet |
| Sprint 5 | EPIC 4 (Notifications), EPIC 6.4 | Notifications temps réel |
| Sprint 6 | Stabilisation, feedback utilisateurs | Release v1.0 |

### Phase 3 - Extensions (Sprint 7+)

- Module "Mes solutions intelligentes" (IA)
- Module "Mes Parcours" (formation)
- Application mobile native (React Native)
- Mode hors-ligne (PWA)

---

## 7. Annexes

### 7.1 Glossaire

| Terme | Définition |
|-------|------------|
| **Cockpit** | Tableau de bord personnalisable de l'utilisateur |
| **Power BI Embedded** | Service Microsoft permettant d'intégrer des rapports Power BI dans des applications tierces |
| **RLS** | Row Level Security - Filtrage des données au niveau des lignes selon les droits |
| **SSO** | Single Sign-On - Authentification unique |
| **GED** | Gestion Électronique des Documents |
| **LTCI** | Lutte Contre le Travail Illégal |

### 7.2 Stack technique recommandée

**Frontend (existant):**
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- Lucide React (icônes)

**Backend (à développer):**
- Node.js + Express ou NestJS
- PostgreSQL (base de données)
- Redis (cache, sessions)
- Azure AD SDK (authentification)
- Power BI REST API

**Infrastructure:**
- Azure App Service ou Container Apps
- Azure SQL / PostgreSQL
- Azure Blob Storage
- Azure CDN

### 7.3 Références

- [Power BI Embedded Documentation](https://docs.microsoft.com/en-us/power-bi/developer/embedded/)
- [Azure AD Authentication](https://docs.microsoft.com/en-us/azure/active-directory/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## Historique des versions

| Version | Date | Auteur | Modifications |
|---------|------|--------|---------------|
| 1.0 | 19/01/2026 | - | Création initiale |

