import { IonButton, IonItemGroup, IonSlide } from "@ionic/react"
import React, { useEffect, useState } from "react"
import { Point } from "../Maps/Map"
import MapStyle from "../Maps/MapStyle"
import Map from '../Maps/Map'
import { Geolocation} from '@capacitor/core';

interface NTSLideLocation {
    setRoute: (n : any) => void,
    route: Point[],
    setCanMoveFromMap: (canmove: boolean) => void
}

const NTSLideLocation = ({setRoute,route,setCanMoveFromMap} : NTSLideLocation) => {

    const [location,setLocation] = useState({lat: 0, lng: 0})

    const fetchLocation = async () => {
        const deviceLocation = await Geolocation.getCurrentPosition()
        
        setLocation({
            lat: deviceLocation.coords.latitude,
            lng: deviceLocation.coords.longitude
        })

    }

    useEffect(() => {
        if(location.lat === 0 && location.lng === 0) {
            fetchLocation()
        }
    })

    const updateRoute = (newValue: (Point[] | undefined)) => {
        if(newValue === undefined) {
            setCanMoveFromMap(true)
            console.log('unlocked')
            return;
        } else {
            setRoute(newValue)
            return;
        }
    }

    return (
        <IonSlide>
            <IonItemGroup>
                <h2>Marker turen på kartet</h2>
                <p>Dette er valgfritt, du kan markere turen på kartet ved å trykke på kartet.</p>
                <div style={{margin: 'auto', width: '20rem'}}>
                    <Map 
                        route={route}  
                        container={{
                            width: '20rem',
                            height: '60vh'
                        }}
                        options = {{
                            styles: MapStyle,
                            disableDefaultUI: true,
                            zoomControl: true
                        }}
                        startCenter={location}
                        updateRoute={updateRoute}
                        allowEdit = {true}
                        zoom={16}
                        />
                </div>
               
            </IonItemGroup>
        </IonSlide>
    )
}

export default NTSLideLocation