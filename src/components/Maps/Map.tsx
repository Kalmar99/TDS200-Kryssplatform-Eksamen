import React, { useEffect, useRef, useState } from "react"
import {
    GoogleMap,
    useLoadScript,
    
    Marker,
    
    Polyline
  } from '@react-google-maps/api'


import MapStyle from "./MapStyle"
import { config } from "../../utils/nhost-config"
import { starOutline } from "ionicons/icons"
import styled from "styled-components"


/*

  This component is based of the code from this video:
  https://www.youtube.com/watch?v=WZcxJGmLbSo

  But is modified to fit my project.

*/

export interface MapOptions {
    styles: typeof MapStyle
    disableDefaultUI: boolean
    zoomControl: boolean
}

export interface Point {
    lat: number,
    lng: number
}

export interface Map {
    container: {
        width: string,
        height: string
    }
    startCenter: Point
    route: Point[]
    allowEdit: boolean
    options: MapOptions;
    updateRoute: (points : Point[] | undefined) => void
    zoom: number
}

const Map = ({container,startCenter,allowEdit,options,updateRoute,route,zoom} : Map) => {

    const [center,setCenter] = useState(startCenter)

    const [routes,setRoutes] = useState<Point[]>(route)

    // Need to update location when coordinates are received from capacitor
    useEffect(() => {
        setCenter(startCenter)
    },[startCenter])

    useEffect(() => {
        updateRoute(routes)
    },[routes])

    const {isLoaded,loadError} = useLoadScript({
        googleMapsApiKey: config.googleMaps,
        libraries: ['places']
    })

    if(loadError) {
        console.log(loadError)
    }

    const onClickMap = (mapEvent : any) => {
        if(allowEdit) {
            const lat = mapEvent.latLng.lat()
            const lng = mapEvent.latLng.lng()
     
            setRoutes(prev => [...prev,{lat,lng}])
        }
    }

    const line = {
        path: "M 0,-1 0,1",
        strokeOpacity: 1,
        scale: 4,
        strokeColor: '#f0b01d'
    }

    const generateRoute = (point : Point, index: number) => {
        let icon;
        if(index == 0) {
            icon = './assets/img/location.svg'
        } else {
            icon = 'none'
        }

        return <Marker  key={point.lat + point.lng + ''} 
                        position={{lat: point.lat, lng: point.lng} } 
                        icon={icon}/>
        
    }

    const removeFromPath = () => {
        if(allowEdit) {
            //Remove the last inserted item in the routes array
            setRoutes((old) => {
                const oldArr = old;
    
                if(oldArr.length >= 1) {
                    oldArr.splice(old.length-1,1)
                } else {
                    return []
                }
    
                return [...oldArr]
            })
        }
    }

    const moveOn = () => {
        if(allowEdit) {
            updateRoute(undefined)
        }
    }

    if(isLoaded) {
    return (
        <div>
            <GoogleMap
                mapContainerStyle={container} 
                zoom={zoom} 
                options={options}
                center={center}
                onClick={event => onClickMap(event)}>

            {routes.length > 0 && routes.map( (marker : any,i : number) => generateRoute(marker,i) )}

            <Polyline 
                path={routes}
                options={{
                    strokeOpacity: 0,
                    icons: [
                        {
                            icon: line,
                            offset: '0',
                            repeat: '20px'
                        }
                    ]
                }}/>

            </GoogleMap>
                
               {allowEdit &&  <ActionBar>
                    <UndoButton onClick={removeFromPath}>Fjern forje</UndoButton>
                    <NextButton onClick={moveOn}>Ferdig</NextButton>
                </ActionBar>}
                
        </div>
    ) } else {
        return <div>Loading....</div>
    }
}

const ActionBar = styled.div`
    float: left;
`;

const NextButton = styled.button`
    padding: 1rem 2rem 1rem 2rem;
    color: white;
    background: #3686E2;
    font-weight: 500;
    font-size: 4vw;
    border-radius: 8px;
    margin-top: 0.5rem;
    display: inline-block;
`;

const UndoButton = styled.button`
    padding: 1rem 2rem 1rem 2rem;
    color: white;
    background: #D64545;
    display: inline-block;
    font-weight: 500;
    font-size: 4vw;
    border-radius: 8px;
    margin-top: 0.5rem;
    margin-left: 0.5rem;
`;

export default Map