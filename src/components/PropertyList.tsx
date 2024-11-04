import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { usePropertyStore } from '../store/propertyStore';
import { Building2, Edit, Trash2 } from 'lucide-react';

export default function PropertyList() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { properties, loading, fetchUserProperties, deleteProperty } = usePropertyStore();

  useEffect(() => {
    if (user) {
      fetchUserProperties(user.uid);
    }
  }, [user]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce bien ?')) {
      await deleteProperty(id);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Mes biens</h2>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {properties.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {properties.map((property) => (
              <li
                key={property.id}
                className="hover:bg-gray-50 transition cursor-pointer"
                onClick={() => navigate(`/properties/${property.id}`)}
              >
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-6 h-6 text-blue-600" />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {property.name}
                        </h3>
                        <div className="text-sm text-gray-500">
                          {property.address}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/properties/${property.id}/edit`);
                        }}
                        className="p-2 text-gray-400 hover:text-blue-600 transition"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(property.id, e)}
                        className="p-2 text-gray-400 hover:text-red-600 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun bien immobilier
            </h3>
            <p className="text-gray-500">
              Commencez par ajouter votre premier bien immobilier
            </p>
          </div>
        )}
      </div>
    </div>
  );
}