import { IonImg, IonItem } from '@ionic/react'
import React from 'react'
import styled from 'styled-components'

interface TripProps {
    img: string,
    title: string,
    description: string,
    link: string
}

const Trip = ({img,title,description,link} : TripProps) => {

    const ImgContainer = styled.div`
        width: 6rem;
        height: 6rem;
        background: URL(${img});
        background-size: auto 100%;
        background-position: center center;
        background-repeat: no-repeat;
        border-radius: 4px;
    `;

    return (
        <IonItem lines='none'>
            <ImgContainer slot='start' />
            <TripContent>
                <TripHeader>Mjøsa</TripHeader>
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