import React from 'react';
import { Key, Upload } from 'lucide-react';

interface KeyManagementProps {
  keys: {
    total: number;
    available: number;
    lockSystem: string;
    keyImages: string[];
  };
}

export default function KeyManagement({ keys }: KeyManagementProps) {
  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Gestion des clés</h3>
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Key className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium text-gray-800">Clés disponibles</div>
                <div className="text-gray-600">{keys.available} sur {keys.total} clés</div>
              </div>
            </div>
            <div>
              <div className="font-medium text-gray-800">Système de verrouillage</div>
              <div className="text-gray-600">{keys.lockSystem}</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="font-medium text-gray-800">Photos des clés</div>
            {keys.keyImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {keys.keyImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Clé ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-24 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-500">Aucune photo</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}