import { useQuery } from '@apollo/client'
import { IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonSegment, IonSegmentButton } from '@ionic/react'
import gql from 'graphql-tag'
import { compassOutline, heart, peopleOutline, settingsOutline } from 'ionicons/icons'
import React, { useState } from 'react'
import styled from 'styled-components'
import ImageRounded from '../components/Design/ImageRounded'
import IUser from '../models/IUser'
import { auth } from '../utils/nhost'


interface FetchUserResponse {
    users: IUser[]
}

const MyPage = (props: any) => {

    /*
    const [userId,setUserId] = useState(props?.location?.state?.id)

    const FETCH_USER = gql`
        query {
            users(where: {id: {_eq: "${userId}"}}) {
            avatar_url
            display_name
            id
        }
    }
    `;
    
    const {data, loading} = useQuery<FetchUserResponse>(FETCH_USER)  */

    return (
        <IonPage>
            <MyAccountHeader>
                <div style={{marginTop: '3rem'}}>
                    <ImageRounded url='./assets/img/avatar.jpg' x='' y='' w='8rem' h='8rem' size='100%'/>
                    <DisplayName>Ola Nordmann</DisplayName>
                </div>

                <TabBar value='trips'>
                    <TabButon value='trips'> 
                        <IonIcon icon={compassOutline} />
                        <IonLabel>Turer</IonLabel>
                    </TabButon>
                    <TabButon value='følgere'>
                        <IonIcon icon={peopleOutline} />
                        <IonLabel>Følgere</IonLabel>
                    </TabButon>
                    <TabButon value='instillinger'>
                        <IonIcon icon={settingsOutline} />
                        <IonLabel>Instillinger</IonLabel>
                    </TabButon>
                </TabBar>
            </MyAccountHeader>
            <IonContent>
                
            </IonContent>
        </IonPage>
    )
}

const DisplayName = styled.h3`
    text-align: center;
`;

/*
    Here i am overriding the styling several parts of the shadow dom in IonSegmentButton.
    However, to achieve the tab bar look that i wanted i also need to overide segment-button-checked & ion-activatable-instant.
    I used this article as a reference: https://css-tricks.com/styling-in-the-shadow-dom-with-css-shadow-parts/
*/

const TabButon = styled(IonSegmentButton)`
        
    border: 0px;

    ::part(native) {
        border-radius: 0;
    }

    ::part(indicator) {
        background: transparent;
        border-radius: 0;
    }

    ::part(indicator-background) {
        box-shadow: none;
        background: transparent;
        border-radius: 0;
        
    }

`;

const TabBar = styled(IonSegment)`


    --background: #F8F8F8;	
    border-radius: 0;

    position: absolute;
    bottom: 0;

    .segment-button-checked {
        border-bottom: 2px solid #3686E2 !important;
        border-radius: 0;
    }

    .ion-activatable-instant {
        border-bottom: 2px solid #BBBBBB;
        border-radius: 0;
    }

    
`;

const MyAccountHeader = styled(IonHeader)`
    background: #F8F8F8;
    height: 19rem;
    position: relative;
`;


export default MyPage