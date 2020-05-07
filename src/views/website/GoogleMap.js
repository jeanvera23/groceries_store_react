import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

import UserActions from '../../providers/user/user.actions';

import settings from '../../settings.js';

const GoogleMapComponent = () => {
    const user = UserActions();
    const defaultMapOptions = {
        fullscreenControl: false,
    };
    useEffect(() => {
        //getLocation();
    }, [])
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                user.setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
            }.bind(this), function () {
                console.log('Error para localizacion');
            }.bind(this));
        }
    }
    function setAddress(marker) {
        console.log("marker: ", marker);
        console.log(marker.latLng.lat())
        console.log(marker.latLng.lng())
    }
    return (
        <LoadScript
            id="script-loader"
            googleMapsApiKey={settings.googleAPIKEY}
        >
            <GoogleMap
                id='example-map'
                options={defaultMapOptions}
                mapContainerStyle={{
                    height: '50vh',
                    width: "100%"
                }}
                zoom={14}
                center={user.location}
            >
                <Marker
                    onDragEnd={marker => {
                        setAddress(marker)
                    }}
                    position={user.location}
                    draggable={true}
                />
            </GoogleMap >
        </LoadScript >
    )
}
export default GoogleMapComponent;