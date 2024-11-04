import React from 'react';
import { Building2, Ruler, DoorClosed, BanknoteIcon, ArrowUpDown, Home, Check, X } from 'lucide-react';

interface PropertyFeaturesProps {
  type: string;
  surface: number;
  floor: number;
  door: string;
  deposit: number;
  elevator: boolean;
  furnished: boolean;
}

export default function PropertyFeatures({
  type,
  surface,
  floor,
  door,
  deposit,
  elevator,
  furnished,
}: PropertyFeaturesProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-800">Caractéristiques</h3>
      
      <div className="grid gap-3">
        <div className="flex items-center space-x-3 text-gray-600">
          <Building2 className="w-5 h-5 text-blue-600" />
          <span>Type: {type}</span>
        </div>

        <div className="flex items-center space-x-3 text-gray-600">
          <Ruler className="w-5 h-5 text-blue-600" />
          <span>Surface: {surface} m²</span>
        </div>

        <div className="flex items-center space-x-3 text-gray-600">
          <DoorClosed className="w-5 h-5 text-blue-600" />
          <span>Étage {floor}, Porte {door}</span>
        </div>

        <div className="flex items-center space-x-3 text-gray-600">
          <BanknoteIcon className="w-5 h-5 text-blue-600" />
          <span>Caution: {deposit}€</span>
        </div>

        <div className="flex items-center space-x-3 text-gray-600">
          <ArrowUpDown className="w-5 h-5 text-blue-600" />
          <span>
            {elevator ? (
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Ascenseur disponible
              </div>
            ) : (
              <div className="flex items-center">
                <X className="w-5 h-5 text-red-500 mr-2" />
                Pas d'ascenseur
              </div>
            )}
          </span>
        </div>

        <div className="flex items-center space-x-3 text-gray-600">
          <Home className="w-5 h-5 text-blue-600" />
          <span>
            {furnished ? (
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Meublé
              </div>
            ) : (
              <div className="flex items-center">
                <X className="w-5 h-5 text-red-500 mr-2" />
                Non meublé
              </div>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}