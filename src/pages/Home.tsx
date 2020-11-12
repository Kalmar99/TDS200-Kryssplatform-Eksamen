import { IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonItemGroup, IonPage, IonSlide, IonSlides, IonSpinner, IonTitle, IonToolbar, IonVirtualScroll } from '@ionic/react';
import React, { useState } from 'react';
import {image, search} from 'ionicons/icons'
import {auth} from '../utils/nhost'
import styled from 'styled-components'
import Trip from '../components/Trip';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import ITrip from '../models/ITrip'
import { Link } from 'react-router-dom';

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
    }
  }
`

const Home: React.FC = () => {

  const {data,loading} = useQuery<FetchTrips>(FETCH_TRIPS)

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
          </IonItem>
          <IonSlides options={{slidesPerView: 2.5}}>
            <IonSlide>
                <Category style={{
                  background: 'URL("./assets/img/cabin.jpg")',
                  backgroundPosition: 'center'
                }}>
                    <CategoryLabel>Hytter</CategoryLabel>
                </Category>
            </IonSlide>
            <IonSlide>
            <Category style={{
                  background: 'URL("./assets/img/mountain.jpg")',
                  backgroundOrigin: 'content-box',
                  backgroundSize: 'auto 100%',
                  backgroundRepeat: 'no-repeat',
                  backgroundPositionX: '-50px'
                }}>
                    <CategoryLabel style={{
                      backgroundColor: '#885A5A'
                    }}>
                      Fjelltur
                    </CategoryLabel>
                </Category>
            </IonSlide>
            <IonSlide>
              <Category style={{
                  background: 'URL("./assets/img/fishing.jpg")',
                  backgroundOrigin: 'content-box',
                  backgroundSize: 'auto 100%',
                  backgroundRepeat: 'no-repeat',
                  backgroundPositionX: '-50px'
                }}>
                  <CategoryLabel style={{
                      backgroundColor: '#16697A'
                    }}>
                      Fisketur
                  </CategoryLabel>
              </Category>
            </IonSlide>
          </IonSlides>
          <IonItem lines='none'>
              <Headline>Nye Turer</Headline>
          </IonItem>
          <IonInfiniteScroll>
            <IonInfiniteScrollContent>
                    {/*  this method of passing state through link is copied from lecture 3  */}
                    {data?.trips.map( (trip) => 
                    <Link style={{textDecoration: 'none'}} key={trip.id} to={{
                      pathname:`/detail/${trip.id}`,
                      state:{trip}
                    }}>
                      <Trip {...trip} />
                    </Link>)}
            </IonInfiniteScrollContent>
          </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};


const Headline = styled.h2`
  margin-top: 0.4rem;
`

const UserAvatar = styled.img`
  width: 2.5rem;
  border-radius: 4px;
`;

const SearchIcon = styled(IonIcon)`
    font-size: 2rem;
    margin-left: 0.5rem;
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
