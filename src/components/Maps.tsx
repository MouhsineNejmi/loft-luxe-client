/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from '@vis.gl/react-google-maps';

import { CountrySelectValue } from './Inputs/CountrySelect';

export type MapProps = {
  value: CountrySelectValue;
  onChange: (location: CountrySelectValue | undefined) => void;
};

const Maps: React.FC<MapProps> = ({ value, onChange }) => {
  const [position, setPosition] = useState({
    lat: value ? value.latlng[0] : 52,
    lng: value ? value?.latlng[1] : -0.51,
  });

  const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const googleMapId = import.meta.env.VITE_GOOGLE_MAP_ID;

  const handleMapClick = (e: any) => {
    const newLat = e.detail.latLng?.lat ?? position.lat;
    const newLng = e.detail.latLng?.lng ?? position.lng;
    const newLocation = {
      ...value,
      latlng: [newLat, newLng],
    };

    onChange(newLocation);
    setPosition({
      lat: newLat,
      lng: newLng,
    });
  };

  return (
    <APIProvider apiKey={googleApiKey}>
      <div className='w-full h-72'>
        <Map
          scrollwheel={true}
          zoom={9}
          center={position}
          mapId={googleMapId}
          onClick={handleMapClick}
        >
          <AdvancedMarker draggable={true} position={position}>
            <Pin
              background={'violet'}
              borderColor={'white'}
              glyphColor={'black'}
            />
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
};

export default Maps;
