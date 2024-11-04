import React from 'react';
import { Brush, Check, X } from 'lucide-react';

interface CleaningInventoryProps {
  cleaning: {
    mop: boolean;
    broom: boolean;
    dustpan: boolean;
    vacuumCleaner: boolean;
  };
}

export default function CleaningInventory({ cleaning }: CleaningInventoryProps) {
  const items = [
    { name: 'Balai', value: cleaning.broom },
    { name: 'Serpillière', value: cleaning.mop },
    { name: 'Pelle', value: cleaning.dustpan },
    { name: 'Aspirateur', value: cleaning.vacuumCleaner },
  ];

  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Équipement de nettoyage</h3>
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Brush className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">{item.name}</span>
              {item.value ? (
                <Check className="w-5 h-5 text-green-500 ml-auto" />
              ) : (
                <X className="w-5 h-5 text-red-500 ml-auto" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}