import React from 'react';
import { CheckInOutRules as CheckInOutRulesType } from '../types';

const checkInOutRules: CheckInOutRulesType[] = [
  { 
    icon: '🏠',
    title: 'Check-in standard',
    time: '16:00',
    description: 'Check-in à partir de 16h'
  },
  {
    icon: '⭐',
    title: 'Early check-in',
    time: '16:00',
    description: 'Early check-in possible uniquement avec supplément via Hostaway'
  },
  {
    icon: '🔑',
    title: 'Check-out standard',
    time: '10:00',
    description: 'Check-out au plus tard à 10h'
  },
  {
    icon: '⌚',
    title: 'Late check-out',
    time: '12:00',
    description: 'Late check-out possible jusqu\'à midi avec option sur Hostaway'
  },
];

export default function CheckInOutRules() {
  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Horaires d'arrivée et de départ</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {checkInOutRules.map((rule, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{rule.icon}</span>
              <div>
                <div className="font-medium text-gray-800">
                  {rule.title} - {rule.time}
                </div>
                <div className="text-sm text-gray-600">{rule.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}