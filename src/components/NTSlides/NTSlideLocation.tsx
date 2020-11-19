import { IonButton, IonItemGroup, IonSlide } from "@ionic/react"
import React, { useEffect, useState } from "react"
import { Point } from "../Maps/Map"
import MapStyle from "../Maps/MapStyle"
import Map from '../Maps/Map'

interface NTSLideLocation {
    setRoute: (n : any) => void,
    route: Point[],
    setCanMoveFromMap: (canmove: boolean) => void
}

const NTSLideLocation = ({setRoute,route,setCanMoveFromMap} : NTSLideLocation) => {

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
                        startCenter={{lat: 58.8693, lng: 9.41494}}
                        updateRoute={updateRoute}
                        allowEdit = {true}
                        />
                </div>
               
            </IonItemGroup>
        </IonSlide>
    )
}

export default NTSLideLocation