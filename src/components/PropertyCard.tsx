import React from 'react';
import { Property } from '../types';
import PropertyHeader from './PropertyHeader';
import PropertyFeatures from './PropertyFeatures';
import PropertyMap from './PropertyMap';
import WifiInfo from './WifiInfo';
import HouseRules from './HouseRules';
import CheckInOutRules from './CheckInOutRules';
import KeyManagement from './KeyManagement';
import CleaningInventory from './CleaningInventory';
import TransportationInfo from './TransportationInfo';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden space-y-6">
      <PropertyHeader name={property.name} address={property.address} />
      
      <div className="p-6 grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PropertyFeatures
            type={property.type}
            surface={property.surface}
            floor={property.floor}
            door={property.door}
            deposit={property.deposit}
            elevator={property.elevator}
            furnished={property.furnished}
          />
          
          <WifiInfo
            wifiName={property.wifiName}
            wifiPassword={property.wifiPassword}
          />
        </div>

        <PropertyMap coordinates={property.coordinates} address={property.address} />
        <KeyManagement keys={property.keys} />
        <CleaningInventory cleaning={property.cleaning} />
        <TransportationInfo transportation={property.transportation} />
        <HouseRules />
        <CheckInOutRules />
      </div>
    </div>
  );
}