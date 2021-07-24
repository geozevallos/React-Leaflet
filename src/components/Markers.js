import React, { useEffect, useState } from 'react'
import {Marker, Popup} from 'react-leaflet'
import { getVeterinarias } from '../services/veterinariasService'
import { MarkerIcon } from './MarkerIcon'

const Markers = () => {

    const [marcadores, setMarcadores] = useState([]);


    useEffect(() => {
        getVeterinarias().then((rpta) => {
            setMarcadores(rpta.data)
        })
    }, []);

    return (
        <>
        {
            marcadores.map((marcador, i) => {
            return <Marker 
                key = {i}
                position={[marcador.geometry.coordinates[1], marcador.geometry.coordinates[0]]} icon={MarkerIcon}>
                    <Popup>
                      <p> <strong>Nombre:</strong> {marcador.properties.name}</p>  
                    </Popup>
                </Marker>
        })
    }
    </>
    )
}

export default Markers
