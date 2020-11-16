import { useQuery } from '@apollo/client'
import { IonContent, IonInfiniteScroll, IonInfiniteScrollContent, IonSlide, IonTitle } from '@ionic/react'
import gql from 'graphql-tag'
import React from 'react'
import { Link } from 'react-router-dom'
import IFollower from '../../models/IFollower'
import IUser from '../../models/IUser'
import User from '../User'
import { MaxHeight } from './MASlideTrips'

interface MASlideFollowers {
    followers?: IFollower[]
}

interface FollowersResponse {
    users: IUser[]
}

const MASlideFollowers = ({followers} : MASlideFollowers) => {

    const followersFormatted = JSON.stringify(followers?.map( follower => {return follower.followed_by}))

    const FETCH_FOLLOWERS = gql`
        query {
            users(where: {id: {_in: ${followersFormatted}}}) {
            avatar_url
            display_name
            id
            }
        }
    `;

    const {data,loading} = useQuery<FollowersResponse>(FETCH_FOLLOWERS)

    if(loading) {
        return <IonSlide><IonTitle>Loading...</IonTitle></IonSlide>
    }

    if(followers?.length == 0) {
        return <IonSlide><p>Denne brukeren har ingen følgere</p></IonSlide>
    }

    return (
        <IonSlide style={{minHeight: '15rem'}}> 
            <MaxHeight>
                <IonInfiniteScrollContent>
                { data?.users.map( user => <Link style={{textDecoration: 'none'}} key={user.id} to={{
                        pathname:`/account/${user.id}`,
                        state:{id: user.id}
                        }}>
                            <User key={user.id} {...user}/>
                        </Link>)}
                
                </IonInfiniteScrollContent>
            </MaxHeight>
        </IonSlide>
    )
}


//<User key={user.id} {...user} />

export default MASlideFollowers