import React from 'react';
import { MapPin } from 'lucide-react';

interface PropertyMapProps {
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
}

export default function PropertyMap({ coordinates, address }: PropertyMapProps) {
  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Localisation</h3>
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <MapPin className="w-6 h-6 text-blue-600" />
          <div>
            <div className="font-medium text-gray-800">Adresse</div>
            <div className="text-gray-600">{address}</div>
            <div className="text-sm text-gray-500 mt-1">
              Coordonnées: {coordinates.lat}, {coordinates.lng}
            </div>
          </div>
        </div>
        <a
          href={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Voir sur Google Maps
        </a>
      </div>
    </div>
  );
}