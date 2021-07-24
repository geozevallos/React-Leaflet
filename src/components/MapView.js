import React, { useEffect, useRef, useState } from "react";
import { Map, TileLayer, LayersControl } from "react-leaflet";
import Markers from "./Markers";
import "leaflet/dist/leaflet.css";

// Para el Geosearch
import {geosearch} from 'esri-leaflet-geocoder'
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css'
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.js"



const { BaseLayer } = LayersControl;

const MapView = () => {
  const styleMap = { width: "100vw", height: "100vh" };

  const [ubicacion, setUbicacion] = useState({
    currentLocation: { lat: -11.557597740705331, lng: -76.73116633178657 },
    zoom: 7,
  });


  const mapRef = useRef();

  useEffect(() => {
    const {current = {}} = mapRef;
    const {leafletElement: map} = current;
    console.log(map);

    // Para localizar y movilizar al punto
    map.locate(
      {setView: true}
    );

    // Al obtener la coordenada ..
    map.on('locationfound', handleOnLocation)

    // Para el Geosearch
    const control = geosearch();
    control.addTo(map)

    control.on('results', handleOnSearchResuts);

    map.on('click', function(e) {
      console.log(e.latlng); 
  });

  }, []);

  // Resultados del search
  function handleOnSearchResuts(data) {
    console.log('Search results', data);
  }

  // Resultado de la localización 
  function handleOnLocation(event){
    const LatLng = event.latlng;
    console.log(LatLng);
  };




  return (
    <>
      <Map ref={mapRef}
        style={styleMap}
        center={ubicacion.currentLocation}
        zoom={ubicacion.zoom}
      >
        <LayersControl>
          <BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
          </BaseLayer>

          <BaseLayer name="OpenTopoMap">
            <TileLayer
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              attribution = 'Map data: {attribution.OpenStreetMap}, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            />
          </BaseLayer>
        </LayersControl>

        <Markers />
      </Map>
    </>
  );
};

export default MapView;
