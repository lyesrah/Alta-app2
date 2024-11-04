import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'fr' | 'en' | 'es' | 'it';

interface LanguageStore {
  currentLanguage: Language;
  translations: Record<string, Record<Language, string>>;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const defaultTranslations: Record<string, Record<Language, string>> = {
  // Dashboard Translations
  'dashboard.greeting': {
    fr: 'Bonjour',
    en: 'Hello',
    es: 'Hola',
    it: 'Ciao'
  },
  'dashboard.subtitle': {
    fr: 'Voici un aperçu de votre activité',
    en: 'Here\'s an overview of your activity',
    es: 'Aquí tiene una visión general de su actividad',
    it: 'Ecco una panoramica della tua attività'
  },
  'dashboard.properties': {
    fr: 'Propriétés',
    en: 'Properties',
    es: 'Propiedades',
    it: 'Proprietà'
  },
  'dashboard.totalClients': {
    fr: 'Total Clients',
    en: 'Total Clients',
    es: 'Total Clientes',
    it: 'Totale Clienti'
  },
  'dashboard.todaysTasks': {
    fr: 'Tâches du jour',
    en: 'Today\'s Tasks',
    es: 'Tareas de hoy',
    it: 'Attività di oggi'
  },
  'dashboard.tasksInProgress': {
    fr: 'Tâches en cours',
    en: 'Tasks in Progress',
    es: 'Tareas en progreso',
    it: 'Attività in corso'
  },
  'dashboard.viewAll': {
    fr: 'Voir tout',
    en: 'View all',
    es: 'Ver todo',
    it: 'Vedi tutto'
  },
  'dashboard.recentActivity': {
    fr: 'Activité récente',
    en: 'Recent Activity',
    es: 'Actividad reciente',
    it: 'Attività recente'
  },

  // Lead Page Translations
  'leads.title': {
    fr: 'Gestion des prospects',
    en: 'Lead Management',
    es: 'Gestión de prospectos',
    it: 'Gestione dei lead'
  },
  'leads.subtitle': {
    fr: 'Gérez et suivez vos prospects immobiliers',
    en: 'Manage and track your property leads',
    es: 'Gestione y siga sus prospectos inmobiliarios',
    it: 'Gestisci e monitora i tuoi lead immobiliari'
  },
  'leads.newLead': {
    fr: 'Nouveau prospect',
    en: 'New Lead',
    es: 'Nuevo prospecto',
    it: 'Nuovo lead'
  },
  'leads.list.title': {
    fr: 'Liste des prospects',
    en: 'Lead List',
    es: 'Lista de prospectos',
    it: 'Lista dei lead'
  },
  'leads.list.lastContact': {
    fr: 'Dernier contact',
    en: 'Last Contact',
    es: 'Último contacto',
    it: 'Ultimo contatto'
  },
  'leads.list.nextFollowUp': {
    fr: 'Prochain suivi',
    en: 'Next Follow-up',
    es: 'Próximo seguimiento',
    it: 'Prossimo follow-up'
  },

  // Lead Status Translations
  'leads.status.new': {
    fr: 'Nouveau',
    en: 'New',
    es: 'Nuevo',
    it: 'Nuovo'
  },
  'leads.status.contacted': {
    fr: 'Contacté',
    en: 'Contacted',
    es: 'Contactado',
    it: 'Contattato'
  },
  'leads.status.qualified': {
    fr: 'Qualifié',
    en: 'Qualified',
    es: 'Calificado',
    it: 'Qualificato'
  },
  'leads.status.proposal': {
    fr: 'Proposition',
    en: 'Proposal',
    es: 'Propuesta',
    it: 'Proposta'
  },
  'leads.status.negotiation': {
    fr: 'Négociation',
    en: 'Negotiation',
    es: 'Negociación',
    it: 'Negoziazione'
  },
  'leads.status.closed': {
    fr: 'Conclu',
    en: 'Closed',
    es: 'Cerrado',
    it: 'Chiuso'
  },
  'leads.status.lost': {
    fr: 'Perdu',
    en: 'Lost',
    es: 'Perdido',
    it: 'Perso'
  },

  // Lead Rating Translations
  'leads.rating.hot': {
    fr: 'Chaud',
    en: 'Hot',
    es: 'Caliente',
    it: 'Caldo'
  },
  'leads.rating.warm': {
    fr: 'Tiède',
    en: 'Warm',
    es: 'Tibio',
    it: 'Tiepido'
  },
  'leads.rating.cold': {
    fr: 'Froid',
    en: 'Cold',
    es: 'Frío',
    it: 'Freddo'
  },
  'leads.rating.neutral': {
    fr: 'Neutre',
    en: 'Neutral',
    es: 'Neutral',
    it: 'Neutro'
  },
  'leads.rating.blocked': {
    fr: 'Bloqué',
    en: 'Blocked',
    es: 'Bloqueado',
    it: 'Bloccato'
  },
  'leads.rating.atRisk': {
    fr: 'À risque',
    en: 'At Risk',
    es: 'En riesgo',
    it: 'A rischio'
  },
  'leads.rating.lost': {
    fr: 'Perdu',
    en: 'Lost',
    es: 'Perdido',
    it: 'Perso'
  },

  // Lead Form Translations
  'leads.form.personalInfo': {
    fr: 'Informations personnelles',
    en: 'Personal Information',
    es: 'Información personal',
    it: 'Informazioni personali'
  },
  'leads.form.propertyDetails': {
    fr: 'Détails de la propriété',
    en: 'Property Details',
    es: 'Detalles de la propiedad',
    it: 'Dettagli della proprietà'
  },
  'leads.form.additionalInfo': {
    fr: 'Informations supplémentaires',
    en: 'Additional Information',
    es: 'Información adicional',
    it: 'Informazioni aggiuntive'
  },
  'leads.form.firstName': {
    fr: 'Prénom',
    en: 'First Name',
    es: 'Nombre',
    it: 'Nome'
  },
  'leads.form.lastName': {
    fr: 'Nom',
    en: 'Last Name',
    es: 'Apellido',
    it: 'Cognome'
  },
  'leads.form.email': {
    fr: 'Email',
    en: 'Email',
    es: 'Correo electrónico',
    it: 'Email'
  },
  'leads.form.phone': {
    fr: 'Téléphone',
    en: 'Phone',
    es: 'Teléfono',
    it: 'Telefono'
  },
  'leads.form.address': {
    fr: 'Adresse',
    en: 'Address',
    es: 'Dirección',
    it: 'Indirizzo'
  },
  'leads.form.formula': {
    fr: 'Formule',
    en: 'Formula',
    es: 'Fórmula',
    it: 'Formula'
  },
  'leads.form.status': {
    fr: 'Statut',
    en: 'Status',
    es: 'Estado',
    it: 'Stato'
  },
  'leads.form.notes': {
    fr: 'Notes',
    en: 'Notes',
    es: 'Notas',
    it: 'Note'
  },
  'leads.form.select': {
    fr: 'Sélectionner...',
    en: 'Select...',
    es: 'Seleccionar...',
    it: 'Seleziona...'
  },
  'leads.form.previous': {
    fr: 'Précédent',
    en: 'Previous',
    es: 'Anterior',
    it: 'Precedente'
  },
  'leads.form.next': {
    fr: 'Suivant',
    en: 'Next',
    es: 'Siguiente',
    it: 'Successivo'
  },
  'leads.form.create': {
    fr: 'Créer',
    en: 'Create',
    es: 'Crear',
    it: 'Crea'
  },

  // Lead Analytics Translations
  'leads.analytics.title': {
    fr: 'Analyse des prospects',
    en: 'Lead Analytics',
    es: 'Análisis de prospectos',
    it: 'Analisi dei lead'
  },
  'leads.analytics.monthlyLeads': {
    fr: 'Prospects mensuels',
    en: 'Monthly Leads',
    es: 'Prospectos mensuales',
    it: 'Lead mensili'
  },
  'leads.analytics.distribution': {
    fr: 'Distribution',
    en: 'Distribution',
    es: 'Distribución',
    it: 'Distribuzione'
  },

  // Lead Metrics Translations
  'leads.metrics.totalLeads': {
    fr: 'Total des prospects',
    en: 'Total Leads',
    es: 'Total de prospectos',
    it: 'Totale lead'
  },
  'leads.metrics.newLeads': {
    fr: 'Nouveaux prospects',
    en: 'New Leads',
    es: 'Nuevos prospectos',
    it: 'Nuovi lead'
  },
  'leads.metrics.qualifiedLeads': {
    fr: 'Prospects qualifiés',
    en: 'Qualified Leads',
    es: 'Prospectos calificados',
    it: 'Lead qualificati'
  },
  'leads.metrics.conversionRate': {
    fr: 'Taux de conversion',
    en: 'Conversion Rate',
    es: 'Tasa de conversión',
    it: 'Tasso di conversione'
  },

  // Lead Calendar Translations
  'leads.calendar.title': {
    fr: 'Calendrier des suivis',
    en: 'Follow-up Calendar',
    es: 'Calendario de seguimiento',
    it: 'Calendario dei follow-up'
  },
  'leads.calendar.noFollowUps': {
    fr: 'Aucun suivi prévu',
    en: 'No follow-ups scheduled',
    es: 'Sin seguimientos programados',
    it: 'Nessun follow-up programmato'
  },

  // Filter Translations
  'filters.search.leads': {
    fr: 'Rechercher des prospects par nom, email ou téléphone...',
    en: 'Search leads by name, email, or phone...',
    es: 'Buscar prospectos por nombre, email o teléfono...',
    it: 'Cerca lead per nome, email o telefono...'
  },
  'filters.search.clients': {
    fr: 'Rechercher des clients par nom, email ou téléphone...',
    en: 'Search clients by name, email, or phone...',
    es: 'Buscar clientes por nombre, email o teléfono...',
    it: 'Cerca clienti per nome, email o telefono...'
  },
  'filters.status': {
    fr: 'Statut',
    en: 'Status',
    es: 'Estado',
    it: 'Stato'
  },
  'filters.rating': {
    fr: 'Évaluation',
    en: 'Rating',
    es: 'Calificación',
    it: 'Valutazione'
  },
  'filters.formula': {
    fr: 'Formule',
    en: 'Formula',
    es: 'Fórmula',
    it: 'Formula'
  },
  'filters.city': {
    fr: 'Ville',
    en: 'City',
    es: 'Ciudad',
    it: 'Città'
  },

  // Settings Translations
  'settings.title': {
    fr: 'Paramètres',
    en: 'Settings',
    es: 'Ajustes',
    it: 'Impostazioni'
  },
  'settings.profile': {
    fr: 'Profil',
    en: 'Profile',
    es: 'Perfil',
    it: 'Profilo'
  },
  'settings.firstName': {
    fr: 'Prénom',
    en: 'First Name',
    es: 'Nombre',
    it: 'Nome'
  },
  'settings.lastName': {
    fr: 'Nom',
    en: 'Last Name',
    es: 'Apellido',
    it: 'Cognome'
  },
  'settings.email': {
    fr: 'Email',
    en: 'Email',
    es: 'Correo electrónico',
    it: 'Email'
  },
  'settings.changePassword': {
    fr: 'Changer le mot de passe',
    en: 'Change Password',
    es: 'Cambiar contraseña',
    it: 'Cambia password'
  },
  'settings.currentPassword': {
    fr: 'Mot de passe actuel',
    en: 'Current Password',
    es: 'Contraseña actual',
    it: 'Password attuale'
  },
  'settings.newPassword': {
    fr: 'Nouveau mot de passe',
    en: 'New Password',
    es: 'Nueva contraseña',
    it: 'Nuova password'
  },
  'settings.confirmPassword': {
    fr: 'Confirmer le mot de passe',
    en: 'Confirm Password',
    es: 'Confirmar contraseña',
    it: 'Conferma password'
  },
  'settings.updatePassword': {
    fr: 'Mettre à jour le mot de passe',
    en: 'Update Password',
    es: 'Actualizar contraseña',
    it: 'Aggiorna password'
  },
  'settings.preferences': {
    fr: 'Préférences',
    en: 'Preferences',
    es: 'Preferencias',
    it: 'Preferenze'
  },
  'settings.theme': {
    fr: 'Thème',
    en: 'Theme',
    es: 'Tema',
    it: 'Tema'
  },
  'settings.theme.description': {
    fr: 'Choisissez votre thème préféré',
    en: 'Choose your preferred theme',
    es: 'Elija su tema preferido',
    it: 'Scegli il tuo tema preferito'
  },
  'settings.emailNotifications': {
    fr: 'Notifications par email',
    en: 'Email Notifications',
    es: 'Notificaciones por correo',
    it: 'Notifiche email'
  },
  'settings.emailNotifications.description': {
    fr: 'Recevoir les mises à jour par email',
    en: 'Receive updates via email',
    es: 'Recibir actualizaciones por correo',
    it: 'Ricevi aggiornamenti via email'
  },
  'settings.desktopNotifications': {
    fr: 'Notifications bureau',
    en: 'Desktop Notifications',
    es: 'Notificaciones de escritorio',
    it: 'Notifiche desktop'
  },
  'settings.desktopNotifications.description': {
    fr: 'Afficher les alertes sur le bureau',
    en: 'Show desktop alerts',
    es: 'Mostrar alertas en el escritorio',
    it: 'Mostra avvisi desktop'
  },
  'settings.taskReminders': {
    fr: 'Rappels de tâches',
    en: 'Task Reminders',
    es: 'Recordatorios de tareas',
    it: 'Promemoria attività'
  },
  'settings.taskReminders.description': {
    fr: 'Être notifié des tâches à venir',
    en: 'Get reminded of upcoming tasks',
    es: 'Recibir recordatorios de tareas próximas',
    it: 'Ricevi promemoria per le attività in arrivo'
  },

  // Navigation Translations
  'nav.signOut': {
    fr: 'Se déconnecter',
    en: 'Sign Out',
    es: 'Cerrar sesión',
    it: 'Esci'
  },

  // Sidebar Translations
  'sidebar.leads': {
    fr: 'Prospects',
    en: 'Leads',
    es: 'Prospectos',
    it: 'Lead'
  },
  'sidebar.leadsDesc': {
    fr: 'Gérer vos prospects immobiliers',
    en: 'Manage your property leads',
    es: 'Gestionar prospectos inmobiliarios',
    it: 'Gestisci i lead immobiliari'
  },
  'sidebar.properties': {
    fr: 'Propriétés',
    en: 'Properties',
    es: 'Propiedades',
    it: 'Proprietà'
  },
  'sidebar.propertiesDesc': {
    fr: 'Gérer vos biens immobiliers',
    en: 'Manage your properties',
    es: 'Gestionar sus propiedades',
    it: 'Gestisci le tue proprietà'
  },
  'sidebar.tasks': {
    fr: 'Tâches',
    en: 'Tasks',
    es: 'Tareas',
    it: 'Attività'
  },
  'sidebar.tasksDesc': {
    fr: 'Suivre vos tâches quotidiennes',
    en: 'Track your daily tasks',
    es: 'Seguimiento de tareas diarias',
    it: 'Monitora le tue attività quotidiane'
  },
  'sidebar.clients': {
    fr: 'Clients',
    en: 'Clients',
    es: 'Clientes',
    it: 'Clienti'
  },
  'sidebar.clientsDesc': {
    fr: 'Gérer vos clients',
    en: 'Manage your clients',
    es: 'Gestionar sus clientes',
    it: 'Gestisci i tuoi clienti'
  },
  'sidebar.notifications': {
    fr: 'Notifications',
    en: 'Notifications',
    es: 'Notificaciones',
    it: 'Notifiche'
  },
  'sidebar.notificationsDesc': {
    fr: 'Voir vos notifications',
    en: 'View your notifications',
    es: 'Ver sus notificaciones',
    it: 'Visualizza le tue notifiche'
  },
  'sidebar.documentation': {
    fr: 'Documentation',
    en: 'Documentation',
    es: 'Documentación',
    it: 'Documentazione'
  },
  'sidebar.documentationDesc': {
    fr: 'Accéder à la documentation',
    en: 'Access documentation',
    es: 'Acceder a la documentación',
    it: 'Accedi alla documentazione'
  }
};

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      currentLanguage: 'fr',
      translations: defaultTranslations,
      setLanguage: (language) => set({ currentLanguage: language }),
      t: (key: string) => {
        const { translations, currentLanguage } = get();
        return translations[key]?.[currentLanguage] || key;
      }
    }),
    {
      name: 'language-store'
    }
  )
);