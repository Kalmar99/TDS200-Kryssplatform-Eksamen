import { useQuery } from '@apollo/client'
import { IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonSegment, IonSegmentButton, IonSlide, IonSlides } from '@ionic/react'
import gql from 'graphql-tag'
import { compassOutline, heart, peopleOutline, settingsOutline } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ImageRounded from '../components/Design/ImageRounded'
import FollowButton from '../components/FollowButton'
import MASlideFollowers from '../components/MASlides/MASlideFollowers'
import MASlideSettings from '../components/MASlides/MASlideSettings'
import MASlideTrips from '../components/MASlides/MASlideTrips'
import IFollower from '../models/IFollower'
import ITrip from '../models/ITrip'
import IUser from '../models/IUser'
import { auth } from '../utils/nhost'


interface FetchDataResponse {
    users: IUser[]
    trips: ITrip[]
    followers: IFollower[]
}

const MyPage = (props: any) => {

    //This is the user id that belongs to the data on this page
    const [userId,setUserId] = useState(props?.location?.state?.id)
    
    // To ensure that the id gets updated when user f.ex: presses the my account button while watching another users page
    useEffect(() => setUserId(props?.location?.state?.id))

    const [user,setUser] = useState<IUser>()
    
    //This is the user id of the user viewing this page!

    const [userSelf,setUserSelf] = useState<string>()

    if(auth.isAuthenticated()) {
        if(userSelf == undefined) {
            setUserSelf(auth.getClaim('x-hasura-user-id'))
        }
    }

    const FETCH_DATA = gql`
        query {
            trips(where: {user_id: {_eq: "${userId}"}}) {
              description
              id
              image_filename
              title
            }
            users(where: {id: {_eq: "${userId}"}}) {
              display_name
              avatar_url
            }
            followers(where: {user_id: {_eq: "${userId}"}}) {
              followed_by
              user {
                avatar_url
                display_name
              }
            }
          }`;

    const {data, loading} = useQuery<FetchDataResponse>(FETCH_DATA);

    
   
    /*  
    The Code for getting the swiper object is copied from here:
    https://forum.ionicframework.com/t/get-swiper-instance-from-slides-component/186503  
    copied function: initSwiper()
    */
   const [swiper,setSwiper] = useState<any>({});
   const [hasInput,setHasInput] = useState(true)
   const [tab,setTab] = useState('trips')
 
   const initSwiper = async function(this: any) {
       let swiper = await this.getSwiper()

       //swiper.allowTouchMove = false;
       swiper.on('slideChange',() => {
           switch(swiper.realIndex) {
               case 0:
                setTab('trips')
               break;
               case 1:
                setTab('followers')
               break;
               case 2:
                setTab('settings')
               break;
           }
       })
       setSwiper(swiper);  
   }

    const changeTab = (tab: string) => {

        /* reference: https://swiperjs.com/api/#methods  */

        let time = 2;

        switch (tab) {
            case 'trips':
                swiper.slideTo(0,time)
            break;
            case 'followers':
                swiper.slideTo(1,time)
            break;
            case 'settings':
                swiper.slideTo(2,time)
            break

        }
    }

    return (
        <IonPage>
            <MyAccountHeader>
                <div style={{marginTop: '3rem'}}>
                    <ImageRounded url={data?.users[0].avatar_url != undefined ? data?.users[0].avatar_url : './assets/img/avatar.jpg' } x='' y='' w='8rem' h='8rem' size='100%'/>
                    <DisplayName>{data?.users[0].display_name}</DisplayName>
                   { userSelf != undefined && <FollowButton target={userId} user_id={userSelf}/>}
                </div>
                <TabBar value={tab} onIonChange={(e : any) => changeTab(e.detail.value)}>
                    <TabButon value='trips'> 
                        <IonIcon icon={compassOutline} />
                        <IonLabel>Turer</IonLabel>
                    </TabButon>
                    <TabButon value='followers'>
                        <IonIcon icon={peopleOutline} />
                        <IonLabel>Følgere</IonLabel>
                    </TabButon>
                   { (userId == userSelf) && <TabButon value='settings'>
                        <IonIcon icon={settingsOutline} />
                        <IonLabel>Instillinger</IonLabel>
                    </TabButon>}
                </TabBar>
            </MyAccountHeader>
            <IonContent fullscreen>
                <IonSlides onIonSlidesDidLoad={initSwiper}>
                    <MASlideTrips trips={data?.trips} />
                    <MASlideFollowers followers={data?.followers} />
                    {(userId == userSelf) && <MASlideSettings />}
                </IonSlides>
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
    height: 20rem;
    position: relative;
`;


export default MyPage