import React, { useState, useRef } from 'react';
import ReactMapGl, { 
  Marker,
} from 'react-map-gl';
import { Room } from '@mui/icons-material';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapPopup from './MapPopup';

const MapArea = ({ geoJSON }) => {
  const MapRef = useRef(null);
  const [mapStyle, setMapStyle] = useState("mapbox://styles/justinliu888/cl2hn1i5z000r15mzpq9li66x");
  const [viewState, setViewState] = useState({
    latitude: -28.0023731,
    longitude: 153.4145987,
    zoom: 10
  });
  const [popupInfo, setPopupInfo] = useState(null);

  return (
    <ReactMapGl
      ref={MapRef}
      initialViewState={viewState}
      mapStyle={mapStyle}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    >
      {
        geoJSON && geoJSON.features.map(feat => {
          let longitude = feat.geometry.coordinates[0];
          let latitude = feat.geometry.coordinates[1];

          return (
            <Marker 
              longitude={longitude} 
              latitude={latitude} 
              anchor="bottom" 
              key={feat.id} 
              onClick={e => {
                e.originalEvent.stopPropagation(); //prevent popup from closing

                let shouldZoom = MapRef.current.getZoom() < viewState.zoom + 2;
                
                // Smooth zoom to clicked point
                MapRef.current.flyTo({
                  center: [longitude, latitude], 
                  speed: shouldZoom ? 0.5 : 0.3,
                  zoom: shouldZoom ? 13 : MapRef.current.getZoom()
                });

                // Set popup data
                setPopupInfo(feat);
              }}
            >
              <Room className="text-primary" />
            </Marker>
          )
        })
      }

      {popupInfo && (<MapPopup popupInfo={popupInfo} closePopup={setPopupInfo}/>)}

    </ReactMapGl>
  )
}

export default MapArea;