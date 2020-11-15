import ITrip from "../../models/ITrip";
import React from 'react'
import { IonContent, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonSlide, IonTitle } from "@ionic/react";
import Trip from "../Trip";
import styled from "styled-components";


interface MASlideTrips {
    trips?: ITrip[]
}

const MASlideTrips = ({trips} : MASlideTrips) => {


    if(trips?.length == 0) {
        return <IonSlide><MaxHeight><p>Ingen turer å vise</p></MaxHeight></IonSlide>
    }

    return (
        <IonSlide>
            <MaxHeight>
                <IonInfiniteScrollContent>
                    {trips != undefined && trips.map(trip => <Wrapper key={trip.id}><Trip {...trip} /></Wrapper>)}
                </IonInfiniteScrollContent>
            </MaxHeight>
        </IonSlide>
    )
}

const Wrapper = styled.div`
    margin-top: 1rem;
`;

export const MaxHeight = styled(IonInfiniteScroll)`
    min-height: 25rem;
    width: 100%;
`;



export default MASlideTrips;