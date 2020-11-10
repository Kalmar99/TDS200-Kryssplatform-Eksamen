import { IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonItemGroup, IonPage, IonSlide, IonSlides, IonTitle, IonToolbar, IonVirtualScroll } from '@ionic/react';
import React, { useState } from 'react';
import {image, search} from 'ionicons/icons'
import ExploreContainer from '../components/ExploreContainer';
import {auth} from '../utils/nhost'
import styled from 'styled-components'

const Home: React.FC = () => {

  let [loggedIn,setLoggedIn] = useState()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <SearchIcon slot="start" icon={search} size="medium" />
          <UserAvatar slot="end"  src="./assets/img/avatar.jpg"  />
        </IonToolbar>
      </IonHeader>
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
              <IonItem lines='none'>
                    <TripImageContainer>
                        <IonImg src='./assets/img/lake.jpg' />
                    </TripImageContainer>
              </IonItem>
            </IonInfiniteScrollContent>
          </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

const TripImageContainer = styled.div`
  width: 8rem;
  height: 8rem;
  overflow: hidden;
`


const Headline = styled.h2`
  margin-top: 0.4rem;
`

const UserAvatar = styled.img`
  width: 2.5rem;
  border-radius: 4px;
`;

const SearchIcon = styled(IonIcon)`
    font-size: 2rem;
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
