import { IonImg, IonItem } from '@ionic/react'
import React from 'react'
import styled from 'styled-components'
import ITrip from '../models/ITrip';

import {config} from '../utils/nhost-config'

const Trip = ({id,title,description,image_filename,user} : ITrip) => {


    //https://backend-gefo14au.nhost.app/storage/o/public/

    const ImgContainer = styled.div`
        width: 6rem;
        height: 6rem;
        background: URL(${config.backendUrl}/storage/o/public/${image_filename}.jpg);
        background-size: auto 100%;
        background-position: center center;
        background-repeat: no-repeat;
        border-radius: 4px;

        -webkit-box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
        -moz-box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
        box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16); 
    `;

    return (
        <IonItem lines='none'>
            <ImgContainer slot='start' />
            <TripContent>
                <TripHeader>{title}</TripHeader>
                <TripDescription>{description}</TripDescription>
            </TripContent>
        </IonItem>
    )
}

const TripContent = styled.div`
    margin-top: 0.5rem;
`;

const TripHeader = styled.h2`
    margin-bottom: 0.2rem;
    margin-top: 0;
    font-size: 5vw;
`;

/*
    Css for clamping lines copied from here:
    https://stackoverflow.com/questions/3922739/limit-text-length-to-n-lines-using-css
*/

const TripDescription = styled.p`
    margin-top: 0;
    font-size: 4vw;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;

`;


export default Trip