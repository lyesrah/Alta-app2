import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { usePropertyStore } from '../store/propertyStore';
import { useClientStore } from '../store/clientStore';
import { PropertyFormField } from '../types';
import SelectClientModal from './modals/SelectClientModal';
import { Upload } from 'lucide-react';

const formFields: PropertyFormField[] = [
  {
    id: 'name',
    question: "What is the property name?",
    type: 'text',
    value: '',
    required: true
  },
  {
    id: 'type',
    question: "What type of property is it?",
    type: 'select',
    options: ['Apartment', 'House', 'Loft', 'Studio', 'Villa'],
    value: '',
    required: true
  },
  {
    id: 'buildingNumber',
    question: "What is the building number? (if applicable)",
    type: 'text',
    value: '',
  },
  {
    id: 'address',
    question: "What is the complete address?",
    type: 'text',
    value: '',
    required: true
  },
  {
    id: 'surface',
    question: "What is the surface area in m²?",
    type: 'number',
    value: 0,
    required: true
  },
  {
    id: 'floor',
    question: "Which floor is the property on?",
    type: 'number',
    value: 0,
    required: true
  },
  {
    id: 'door',
    question: "What is the door number?",
    type: 'text',
    value: '',
    required: true
  },
  {
    id: 'doorSlams',
    question: "Does the door slam shut?",
    type: 'select',
    options: ['Yes', 'No'],
    value: '',
    required: true
  },
  {
    id: 'emergencyResponseTime',
    question: "What is the emergency response time for the property owner?",
    type: 'time',
    value: '01:00',
    required: true
  },
  {
    id: 'deposit',
    question: "What is the deposit amount (in €)?",
    type: 'number',
    value: 0,
    required: true
  },
  {
    id: 'elevator',
    question: "Is there an elevator in the building?",
    type: 'select',
    options: ['Yes', 'No'],
    value: '',
    required: true
  },
  {
    id: 'furnished',
    question: "Is the property furnished?",
    type: 'select',
    options: ['Yes', 'No'],
    value: '',
    required: true
  },
  {
    id: 'wifiName',
    question: "What is the WiFi network name?",
    type: 'text',
    value: '',
    required: true
  },
  {
    id: 'wifiPassword',
    question: "What is the WiFi password?",
    type: 'text',
    value: '',
    required: true
  },
  {
    id: 'keys.total',
    question: "How many keys are there in total?",
    type: 'number',
    value: 0,
    required: true
  },
  {
    id: 'keys.available',
    question: "How many keys are currently available?",
    type: 'number',
    value: 0,
    required: true
  },
  {
    id: 'keys.lockSystem',
    question: "What type of lock system is installed?",
    type: 'text',
    value: '',
    required: true
  },
  {
    id: 'keys.keyImages',
    question: "Upload photos of all keys",
    type: 'file',
    value: [],
    multiple: true,
    accept: 'image/*',
    required: true
  },
  {
    id: 'cleaning',
    question: "Which cleaning equipment is available?",
    type: 'checkbox',
    options: ['mop', 'broom', 'dustpan', 'vacuumCleaner'],
    value: [],
    required: true
  }
];

export default function PropertyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addProperty, updateProperty, properties } = usePropertyStore();
  const { clients } = useClientStore();
  const [currentStep, setCurrentStep] = useState(-1);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [error, setError] = useState<string | null>(null);
  const [isSelectClientModalOpen, setIsSelectClientModalOpen] = useState(true);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  const isEditMode = Boolean(id);
  const currentField = formFields[currentStep];
  const progress = ((currentStep + 1) / formFields.length) * 100;

  useEffect(() => {
    if (isEditMode) {
      const property = properties.find(p => p.id === id);
      if (property) {
        setFormData({
          ...property,
          elevator: property.elevator ? 'Yes' : 'No',
          furnished: property.furnished ? 'Yes' : 'No',
          doorSlams: property.doorSlams ? 'Yes' : 'No',
          cleaning: Object.entries(property.cleaning)
            .filter(([_, value]) => value)
            .map(([key]) => key)
        });
        setSelectedClientId(property.clientId);
        setCurrentStep(0);
        setIsSelectClientModalOpen(false);
      }
    }
  }, [id, properties, isEditMode]);

  const handleSubmit = async () => {
    try {
      if (!user) {
        throw new Error("You must be logged in to manage properties");
      }

      if (!selectedClientId) {
        throw new Error("Please select a property owner");
      }

      const propertyData = {
        ...formData,
        userId: user.uid,
        clientId: selectedClientId,
        elevator: formData.elevator === 'Yes',
        furnished: formData.furnished === 'Yes',
        doorSlams: formData.doorSlams === 'Yes',
        cleaning: {
          mop: formData.cleaning.includes('mop'),
          broom: formData.cleaning.includes('broom'),
          dustpan: formData.cleaning.includes('dustpan'),
          vacuumCleaner: formData.cleaning.includes('vacuumCleaner')
        }
      };

      if (isEditMode) {
        await updateProperty(id!, propertyData);
      } else {
        await addProperty(propertyData);
      }
      
      navigate('/properties');
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleNext = async () => {
    if (currentStep < formFields.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      await handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClientSelect = (clientId: string) => {
    setSelectedClientId(clientId);
    setIsSelectClientModalOpen(false);
    setCurrentStep(0);
  };

  const handleCreateNewClient = () => {
    navigate('/clients/new');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData({
      ...formData,
      [currentField.id]: imageUrls
    });
  };

  if (currentStep === -1 || isSelectClientModalOpen) {
    return (
      <SelectClientModal
        isOpen={true}
        onClose={() => navigate('/properties')}
        onSelect={handleClientSelect}
        onCreateNew={handleCreateNewClient}
        clients={clients}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center space-x-3 mb-12">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          {isEditMode ? 'Edit Property' : 'New Property'}
        </h1>
      </div>

      <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full mb-12">
        <div 
          className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 mb-8">
        <h2 className="text-xl font-medium text-gray-700 dark:text-gray-200 mb-6">
          {currentField.question}
        </h2>

        <div className="mt-4">
          {currentField.type === 'text' && (
            <input
              type="text"
              value={formData[currentField.id] || ''}
              onChange={(e) => setFormData({
                ...formData,
                [currentField.id]: e.target.value
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 outline-none transition"
              placeholder="Your answer..."
              required={currentField.required}
            />
          )}

          {currentField.type === 'number' && (
            <input
              type="number"
              value={formData[currentField.id] || ''}
              onChange={(e) => setFormData({
                ...formData,
                [currentField.id]: Number(e.target.value)
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 outline-none transition"
              required={currentField.required}
            />
          )}

          {currentField.type === 'select' && (
            <select
              value={formData[currentField.id] || ''}
              onChange={(e) => setFormData({
                ...formData,
                [currentField.id]: e.target.value
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 outline-none transition"
              required={currentField.required}
            >
              <option value="">Select an option</option>
              {currentField.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}

          {currentField.type === 'time' && (
            <input
              type="time"
              value={formData[currentField.id] || '01:00'}
              onChange={(e) => setFormData({
                ...formData,
                [currentField.id]: e.target.value
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 outline-none transition"
              required={currentField.required}
            />
          )}

          {currentField.type === 'file' && (
            <div className="space-y-4">
              <label className="flex flex-col items-center px-4 py-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400">
                <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Click to upload images
                </span>
                <input
                  type="file"
                  className="hidden"
                  multiple={currentField.multiple}
                  accept={currentField.accept}
                  onChange={handleFileChange}
                  required={currentField.required}
                />
              </label>
              {formData[currentField.id]?.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {formData[currentField.id].map((url: string, index: number) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Uploaded image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {currentField.type === 'checkbox' && (
            <div className="space-y-3">
              {currentField.options?.map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData[currentField.id]?.includes(option) || false}
                    onChange={(e) => {
                      const currentValues = formData[currentField.id] || [];
                      const newValues = e.target.checked
                        ? [...currentValues, option]
                        : currentValues.filter((v: string) => v !== option);
                      setFormData({
                        ...formData,
                        [currentField.id]: newValues
                      });
                    }}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700 dark:text-gray-200">
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition ${
            currentStep === 0
              ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <span>Previous</span>
        </button>

        <button
          onClick={handleNext}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <span>
            {currentStep === formFields.length - 1 
              ? (isEditMode ? 'Update' : 'Create') 
              : 'Next'
            }
          </span>
        </button>
      </div>
    </div>
  );
}