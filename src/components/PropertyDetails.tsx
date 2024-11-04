import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePropertyStore } from '../store/propertyStore';
import { Property } from '../types';
import PropertyCard from './PropertyCard';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { properties, deleteProperty } = usePropertyStore();
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    const currentProperty = properties.find(p => p.id === id);
    if (currentProperty) {
      setProperty(currentProperty);
    }
  }, [id, properties]);

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce bien ?')) {
      await deleteProperty(id!);
      navigate('/properties');
    }
  };

  if (!property) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Bien non trouvé</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/properties')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour à la liste
        </button>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate(`/properties/${id}/edit`)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Edit className="w-4 h-4 mr-2" />
            Modifier
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Supprimer
          </button>
        </div>
      </div>

      <PropertyCard property={property} />
    </div>
  );
}