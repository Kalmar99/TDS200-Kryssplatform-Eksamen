import { IonIcon, IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import { compassOutline, locationOutline, personOutline } from "ionicons/icons";
import React from "react";
import { useAuth } from "react-nhost";
import { useHistory } from 'react-router'
import styled from "styled-components";
import { auth } from "../utils/nhost";

interface NavigationBar {
    history: any;
}

const NavigationBar = ({history} : NavigationBar) => {

    const isLoggedIn = useAuth()

    const changeTab = async (tab: string) => {

        switch(tab) {
            case 'explore':
                history.replace('/home')
            break;
            case 'newtrip':
                history.replace('/newtrip')
            break;
            case 'myaccount':
                //If the user is logged in, navigate to his/her page. if not: let privateRoute handle the redirect
                if(isLoggedIn) {
                    let id = auth.getClaim('x-hasura-user-id')
                    history.replace({
                        pathname: `/account/${id}`,
                        state: {id: id}
                    })
                } else {
                    history.replace('/account')
                }
            break;
        }

    }
    
    return (
        <NavigationBarStyled  value={'explore'} onIonChange={(e : any) => changeTab(e.detail.value)}>
            <NavigationButton value='explore' >
                <IonIcon icon={compassOutline} />
                <IonLabel>Utforsk</IonLabel>
            </NavigationButton>
            <NavigationButton value='newtrip'>
                <IonIcon icon={locationOutline} />
                <IonLabel>Ny Tur</IonLabel>
            </NavigationButton>
            <NavigationButton value='myaccount'>
                <IonIcon icon={personOutline} />
                <IonLabel>Min Bruker</IonLabel>
            </NavigationButton>
      </NavigationBarStyled>
    )
}

export default NavigationBar;


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

