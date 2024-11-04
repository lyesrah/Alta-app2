import React from 'react';
import { MapPin } from 'lucide-react';

interface PropertyHeaderProps {
  name: string;
  address: string;
}

export default function PropertyHeader({ name, address }: PropertyHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
      <h2 className="text-2xl font-semibold text-white mb-2">{name}</h2>
      <div className="flex items-center text-blue-100">
        <MapPin className="w-4 h-4 mr-2" />
        <span>{address}</span>
      </div>
    </div>
  );
}