import { IonBackButton, IonChip, IonContent, IonHeader, IonIcon, IonLabel, IonList, IonPage, IonSearchbar, IonSlide, IonSlides } from "@ionic/react"
import { closeCircleOutline } from "ionicons/icons"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Trip from "../components/Trip"
import ECategory, { CategoryIndex, CategoryIcons } from "../models/ECategory"
import ITrip from "../models/ITrip"


interface Search {
    category?: ECategory
}

const Search = (props: any) => {

    const [filter,setFilter] = useState<string>()
    const [category,setCategory] = useState<ECategory | undefined>(props.location.state.category)
    const [trips,setTrips] = useState<ITrip[]>(props.location.state.trips)
    
    const filterTrips = (trip: ITrip) => {
        // Check if search string matches the title or description of a trip.
        if(filter != undefined && filter.length > 1) {

            //Also want to be able to filter on string during category search
            if(trip.category != undefined && category != undefined) {
              
                if(trip.category === category) {
                    if(trip.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) {
                        return trip;
                    } else if(trip.description.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) {
                        return trip;
                    }
                }
            } else if(category == undefined) {
                //Just filter on search string
                
                if(trip.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) {
                    return trip;
                } else if(trip.description.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) {
                    return trip;
                }
            }
        } else if(category != undefined) {
            //If there is no search string check if user has used catory search.
            if(trip.category != undefined) {
                if(trip.category == category) {
                    return trip;
                }
            }
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonBackButton style={{float: 'left'}} defaultHref='/home' />
                <SearchTitle>Søk</SearchTitle>
                <SearchSubtitle>Finn din neste tur</SearchSubtitle>
                <SearchBar placeholder='Søk' onIonInput={(e: any) => setFilter(e.target.value)}  />
                {category != undefined && <Chip onClick={() => setCategory(undefined)} style={{marginLeft: '1rem'}}>
                            <IonIcon icon={CategoryIcons[CategoryIndex[category]]} />
                            <IonLabel>{category}</IonLabel>
                            <IonIcon icon={closeCircleOutline} />
                </Chip>}
                
            </IonHeader>
            <IonContent>
                <IonList>
                {trips?.filter((trip) => filterTrips(trip)).map( (trip) => 
                    <Link style={{textDecoration: 'none'}} key={trip.id} to={{
                      pathname:`/detail/${trip.id}`,
                      state:{trip}
                    }}>
                      <Trip {...trip} />
                    </Link>)}
                </IonList>
            </IonContent>
        </IonPage>
    )
}

const Chip = styled(IonChip)`
    margin-top: 0.3rem;
    margin-bottom: 0.5rem;
`;

const SearchBar = styled(IonSearchbar)`
    padding-top: 0;
    padding-bottom: 0;
`;

const SearchSubtitle = styled.p`
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    margin-left: 1rem;
`;

const SearchTitle = styled.h2`
    margin-left: 1rem;
    margin-bottom: 0;
    margin-top: 3rem;
`;

export default Search