import { IonIcon, IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import { compassOutline, locationOutline, newspaperOutline, personOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useAuth } from "react-nhost";
import { useHistory } from 'react-router'
import styled from "styled-components";
import { auth } from "../utils/nhost";

interface NavigationBar {
    history: any;
}

const NavigationBar = ({history} : NavigationBar) => {

    const [tab,setTab] = useState('home')

    //Set the right tab if the page reloads
    useEffect(() => {
        if(history != undefined) {
            let location = history.location.pathname.split('/')
            
            setTab(location[1])
        }
    })
    
    const changeTab = async (tab: string) => {

        switch(tab) {
            case 'home':
                history.replace('/home')
            break;
            case 'newtrip':
                history.replace('/newtrip')
            break;
            case 'account':
                //If the user is logged in, navigate to his/her page. If not logged in redirect. 
                //I need to put this logic here istead of using private route, since i want non users to be able to view other peoples profiles without being logged in.
                if(auth.isAuthenticated()) {

                    let id = auth.getClaim('x-hasura-user-id')
                    history.replace({
                        pathname: `/account/${id}`,
                        state: {id: id}
                    })
                } else {
                    history.replace('/login')
                }
            break;
            case 'feed':
                if(auth.isAuthenticated()) {

                    let id = auth.getClaim('x-hasura-user-id')
                    history.replace({
                        pathname: `/feed`,
                        state: {id: id}
                    })
                } else {
                    history.replace('/login')
                }
            break;
        }

    }
    
    return (
        <NavigationBarStyled value={tab} onIonChange={(e : any) => changeTab(e.detail.value)}>
            <NavigationButton value='feed' >
                <IonIcon icon={newspaperOutline} />
                <IonLabel>Feed</IonLabel>
            </NavigationButton>
            <NavigationButton value='home' >
                <IonIcon icon={compassOutline} />
                <IonLabel>Utforsk</IonLabel>
            </NavigationButton>
            <NavigationButton value='newtrip'>
                <IonIcon icon={locationOutline} />
                <IonLabel>Ny Tur</IonLabel>
            </NavigationButton>
            <NavigationButton value='account'>
                <IonIcon icon={personOutline} />
                <IonLabel>Min Bruker</IonLabel>
            </NavigationButton>
      </NavigationBarStyled>
    )
}

const NavigationBarStyled = styled(IonSegment)`
    position:fixed;
    bottom:0;
    border-radius: 0;
    background: white;
    padding-top: 0.2rem;

    .segment-button-checked {
        color: #3686E2;
    }

    .segment-button-after-checked {
        border-left: 0;
    }

    -webkit-box-shadow: 0px -3px 5px 0px rgba(0,0,0,0.16);
    -moz-box-shadow: 0px -3px 5px 0px rgba(0,0,0,0.16);
    box-shadow: 0px -3px 5px 0px rgba(0,0,0,0.16);



`;

const NavigationButton = styled(IonSegmentButton)`
    
    ::part(native) {
        border-radius: 0;
    }

    ::before {
        border-left: none !important;
    }

    ::part(indicator) {
        background: transparent;
        border-radius: 0;
        
    }

    ::part(indicator::before) {
       border: 0;
    }

    ::part(indicator-background) {
        box-shadow: none;
        background: transparent;
        border-radius: 0;
        
    }
`;


export default NavigationBar;



