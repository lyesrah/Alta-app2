import React, { useState } from 'react';
import { X, Clock, Calendar, AlertTriangle } from 'lucide-react';
import { useTaskStore } from '../../store/taskStore';
import { Property } from '../../types';
import { useLanguageStore } from '../../store/languageStore';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
}

const timeOptions = Array.from({ length: 24 * 4 }, (_, i) => {
  const hour = Math.floor(i / 4);
  const minute = (i % 4) * 15;
  return {
    value: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
    label: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  };
});

type TaskStatus = 'not_started' | 'in_progress' | 'blocked';
type TaskPriority = 'urgent' | 'medium' | 'normal';

const getStatusTranslation = (status: TaskStatus, lang: string) => {
  const translations: Record<TaskStatus, Record<string, string>> = {
    not_started: {
      en: 'Not Started',
      fr: 'Non commencé',
      es: 'No iniciado',
      it: 'Non iniziato'
    },
    in_progress: {
      en: 'In Progress',
      fr: 'En cours',
      es: 'En progreso',
      it: 'In corso'
    },
    blocked: {
      en: 'Blocked',
      fr: 'Bloqué',
      es: 'Bloqueado',
      it: 'Bloccato'
    }
  };
  return translations[status][lang] || translations[status].en;
};

const getPriorityTranslation = (priority: TaskPriority, lang: string) => {
  const translations: Record<TaskPriority, Record<string, string>> = {
    urgent: {
      en: 'Urgent',
      fr: 'Urgent',
      es: 'Urgente',
      it: 'Urgente'
    },
    medium: {
      en: 'Medium',
      fr: 'Moyen',
      es: 'Medio',
      it: 'Medio'
    },
    normal: {
      en: 'Normal',
      fr: 'Normal',
      es: 'Normal',
      it: 'Normale'
    }
  };
  return translations[priority][lang] || translations[priority].en;
};

const getPriorityEmoji = (priority: TaskPriority) => {
  const emojis: Record<TaskPriority, string> = {
    urgent: '🔴',
    medium: '🟠',
    normal: '🟢'
  };
  return emojis[priority];
};

export default function CreateTaskModal({ isOpen, onClose, properties }: CreateTaskModalProps) {
  const { currentLanguage: lang } = useLanguageStore();
  const [propertyId, setPropertyId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('09:00');
  const [status, setStatus] = useState<TaskStatus>('not_started');
  const [priority, setPriority] = useState<TaskPriority>('normal');
  const { addTask } = useTaskStore();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const dueDatetime = new Date(`${dueDate}T${dueTime}`);
    
    addTask({
      propertyId,
      title,
      description,
      dueDate: dueDatetime,
      status,
      priority,
    });
    
    onClose();
    setPropertyId('');
    setTitle('');
    setDescription('');
    setDueDate('');
    setDueTime('09:00');
    setStatus('not_started');
    setPriority('normal');
  };

  const getFieldLabel = (key: string) => {
    const labels: Record<string, Record<string, string>> = {
      title: {
        en: 'Task Title',
        fr: 'Titre de la tâche',
        es: 'Título de la tarea',
        it: 'Titolo attività'
      },
      description: {
        en: 'Description',
        fr: 'Description',
        es: 'Descripción',
        it: 'Descrizione'
      },
      property: {
        en: 'Property',
        fr: 'Propriété',
        es: 'Propiedad',
        it: 'Proprietà'
      },
      dueDate: {
        en: 'Due Date',
        fr: 'Date d\'échéance',
        es: 'Fecha de vencimiento',
        it: 'Data di scadenza'
      },
      dueTime: {
        en: 'Due Time',
        fr: 'Heure d\'échéance',
        es: 'Hora de vencimiento',
        it: 'Ora di scadenza'
      },
      status: {
        en: 'Status',
        fr: 'Statut',
        es: 'Estado',
        it: 'Stato'
      },
      priority: {
        en: 'Priority',
        fr: 'Priorité',
        es: 'Prioridad',
        it: 'Priorità'
      }
    };
    return labels[key][lang] || labels[key].en;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">
            {lang === 'fr' ? 'Nouvelle tâche' :
             lang === 'es' ? 'Nueva tarea' :
             lang === 'it' ? 'Nuova attività' :
             'New Task'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {getFieldLabel('property')}
            </label>
            <select
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">
                {lang === 'fr' ? 'Sélectionner une propriété' :
                 lang === 'es' ? 'Seleccionar propiedad' :
                 lang === 'it' ? 'Seleziona proprietà' :
                 'Select a property'}
              </option>
              {properties.map((property) => (
                <option key={property.id} value={property.id}>
                  {property.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {getFieldLabel('title')}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              placeholder={
                lang === 'fr' ? 'Entrez le titre' :
                lang === 'es' ? 'Ingrese el título' :
                lang === 'it' ? 'Inserisci il titolo' :
                'Enter title'
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {getFieldLabel('description')}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              placeholder={
                lang === 'fr' ? 'Entrez la description' :
                lang === 'es' ? 'Ingrese la descripción' :
                lang === 'it' ? 'Inserisci la descrizione' :
                'Enter description'
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getFieldLabel('dueDate')}
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full pl-10 rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getFieldLabel('dueTime')}
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <select
                  value={dueTime}
                  onChange={(e) => setDueTime(e.target.value)}
                  required
                  className="w-full pl-10 rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                >
                  {timeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {getFieldLabel('status')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['not_started', 'in_progress', 'blocked'] as TaskStatus[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    status === s
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                      : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {getStatusTranslation(s, lang)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {getFieldLabel('priority')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['urgent', 'medium', 'normal'] as TaskPriority[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
                    priority === p
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                      : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <span>{getPriorityEmoji(p)}</span>
                  <span>{getPriorityTranslation(p, lang)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              {lang === 'fr' ? 'Annuler' :
               lang === 'es' ? 'Cancelar' :
               lang === 'it' ? 'Annulla' :
               'Cancel'}
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              {lang === 'fr' ? 'Créer la tâche' :
               lang === 'es' ? 'Crear tarea' :
               lang === 'it' ? 'Crea attività' :
               'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}