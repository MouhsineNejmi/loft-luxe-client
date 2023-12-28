/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from '@vis.gl/react-google-maps';

export type MapProps = {
  center: number[];
};

const Maps: React.FC<MapProps> = ({ center = [52, -0.09] }) => {
  const position = {
    lat: center[0],
    lng: center[1],
  };

  const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const googleMapId = import.meta.env.VITE_GOOGLE_MAP_ID;

  return (
    <APIProvider apiKey={googleApiKey}>
      <div className='w-full h-72'>
        <Map scrollwheel={true} zoom={9} center={position} mapId={googleMapId}>
          <AdvancedMarker position={position}>
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
