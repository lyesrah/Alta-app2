import React from 'react';
import { Wifi } from 'lucide-react';

interface WifiInfoProps {
  wifiName: string;
  wifiPassword: string;
}

export default function WifiInfo({ wifiName, wifiPassword }: WifiInfoProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-800">Connexion Wi-Fi</h3>
      <div className="bg-blue-50 rounded-lg p-4 space-y-3">
        <div className="flex items-center space-x-3">
          <Wifi className="w-5 h-5 text-blue-600" />
          <div>
            <div className="text-sm text-blue-600">Nom du réseau</div>
            <div className="text-gray-700 font-medium">{wifiName}</div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 flex items-center justify-center text-blue-600">🔑</div>
          <div>
            <div className="text-sm text-blue-600">Mot de passe</div>
            <div className="text-gray-700 font-medium">{wifiPassword}</div>
          </div>
        </div>
      </div>
    </div>
  );
}