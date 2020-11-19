import { IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonItemGroup, IonList, IonPage, IonSlide, IonSlides, IonSpinner, IonTitle, IonToolbar, IonVirtualScroll } from '@ionic/react';
import React, { useState } from 'react';
import {image, paperPlaneOutline, search} from 'ionicons/icons'
import {auth} from '../utils/nhost'
import styled from 'styled-components'
import Trip from '../components/Trip';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import ITrip from '../models/ITrip'
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import ECategory, { CategoryColors, CategoryImages, CategoryIndex } from '../models/ECategory';

interface FetchTrips {
  trips: [ITrip]
}

const FETCH_TRIPS = gql`
  query {
    trips {
      id
      title
      description
      image_filename
      user {
        id
        display_name
      }
      category
      cords
    }
  }
`

const Home: React.FC = (props: any) => {

  const {data,loading} = useQuery<FetchTrips>(FETCH_TRIPS)

  const categories = Object.values(ECategory)

  const logOut = () => {
    auth.logout();
  }

  if(loading) {
    return (
      <IonPage>
        <IonContent fullscreen>
          <IonTitle>
            <IonSpinner name="circles" />
          </IonTitle>
        </IonContent>
      </IonPage>
    )
  }

  return (
    <IonPage>
      <IonContent fullscreen>
          <IonItem lines={'none'}>
              <h2>Utforsk</h2>
              
              <Link slot='end' style={{textDecoration: 'none'}} to='/chats'>
                <Icon icon={paperPlaneOutline} />
              </Link>
              <Link slot='end' style={{textDecoration: 'none'}} to={{
                pathname:'/search',
                state: {
                  trips: data?.trips
                }
              }}>
                <Icon icon={search} />
              </Link>

          </IonItem>
          <IonSlides options={{slidesPerView: 2.5}}>

            {categories.map((category) => <IonSlide key={category}>
              <CategoryLink style={{textDecoration: 'none'}} to={{
                pathname: '/search',
                state: {
                  category: category,
                  trips: data?.trips
                }
              }} >
                <Category style={{
                    background: `URL(${CategoryImages[CategoryIndex[category]]})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'auto 100%'
                  }}>
                      <CategoryLabel style={{backgroundColor: CategoryColors[CategoryIndex[category]]}}>{category}</CategoryLabel>
                  </Category>
                </CategoryLink>
            </IonSlide>)}

          </IonSlides>
          <IonItem lines='none'>
              <Headline>Nye Turer</Headline>
          </IonItem>
          <TripsList>
                    {/*  this method of passing state through link is copied from lecture 3  */}
                    {data?.trips.map( (trip) => 
                    <Link style={{textDecoration: 'none'}} key={trip.id} to={{
                      pathname:`/detail/${trip.id}`,
                      state:{trip}
                    }}>
                      <Trip {...trip} />
                    </Link>)}
          </TripsList>
      </IonContent>
    </IonPage>
  );
};

// The styles in category link is the same styles that is being used by IonSlide, 
// need to copy that here so link does not overide its styling
const CategoryLink = styled(Link)`

    display: -ms-flexbox;
    display: flex;
    position: relative;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

`;

const TripsList = styled(IonList)`
  margin-bottom: 5rem;
`;

const Headline = styled.h2`
  margin-top: 0.4rem;
`

const UserAvatar = styled.img`
  width: 2.5rem;
  border-radius: 4px;
`;

const Icon = styled(IonIcon)`
    font-size: 24px;
    margin-top: 1rem;
    color: black;
`;

const Category = styled.div`
  width: 10rem;
  height: 14rem;
  background: URL("./assets/img/cabin.jpg");
  background-position: center;
  display:inline-block;
  border-radius: 8px;
  position: relative;
  margin: 1rem;
  margin-right: 0;

  -webkit-box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
  -moz-box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
  box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
`;

const CategoryLabel = styled.p`
  background-color: #72AB70;
  padding-left: 6px;
  padding-right: 6px;
  padding-top: 2px;
  padding-bottom: 4px;
  border-radius: 4px;
  position: absolute;
  color: #FFFFFF;
  bottom: 0rem;
  margin-left: 0.7rem;
  margin-bottom: 0.7rem;
`;


export default Home;
