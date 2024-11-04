import React from 'react';
import { Plane, Train, Car } from 'lucide-react';

interface TransportationInfoProps {
  transportation: {
    nearestAirport: string;
    airportDirections: string;
    trainStation: string;
    trainDirections: string;
    parking: string;
    parkingAccess: string;
  };
}

export default function TransportationInfo({ transportation }: TransportationInfoProps) {
  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Transport et accès</h3>
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="space-y-6">
          <div className="flex items-start space-x-3">
            <Plane className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <div className="font-medium text-gray-800">Aéroport le plus proche</div>
              <div className="text-gray-600">{transportation.nearestAirport}</div>
              <div className="text-sm text-gray-500 mt-1">{transportation.airportDirections}</div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Train className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <div className="font-medium text-gray-800">Gare</div>
              <div className="text-gray-600">{transportation.trainStation}</div>
              <div className="text-sm text-gray-500 mt-1">{transportation.trainDirections}</div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Car className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <div className="font-medium text-gray-800">Parking</div>
              <div className="text-gray-600">{transportation.parking}</div>
              <div className="text-sm text-gray-500 mt-1">{transportation.parkingAccess}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}