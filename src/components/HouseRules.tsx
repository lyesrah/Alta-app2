import React from 'react';
import { HouseRules as HouseRulesType } from '../types';

const houseRules: HouseRulesType[] = [
  { icon: '👞', rule: 'Pas de chaussures', description: 'Merci de retirer vos chaussures en entrant' },
  { icon: '🚭', rule: 'Non-fumeur', description: 'Interdiction de fumer dans tout l\'appartement' },
  { icon: '🎉', rule: 'Pas de fêtes', description: 'Fêtes et événements interdits' },
  { icon: '📝', rule: 'Pièce d\'identité', description: 'Pièce d\'identité requise pour tous les voyageurs' },
  { icon: '🌙', rule: 'Calme après 21h30', description: 'Merci de respecter le calme en soirée' },
];

export default function HouseRules() {
  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Règles de la maison</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {houseRules.map((rule, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{rule.icon}</span>
              <div>
                <div className="font-medium text-gray-800">{rule.rule}</div>
                <div className="text-sm text-gray-600">{rule.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}