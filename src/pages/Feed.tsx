import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { IonLoading, IonPage, IonSpinner, IonTitle } from "@ionic/react"
import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router";
import FollowerPosts from "../components/FollowerPosts";
import IFollower from "../models/IFollower";
import { auth } from "../utils/nhost";

const FETCH_FOLLOWERS = gql`
        query fetchFollowers($userID: uuid) {
            followers(where: {followed_by: {_eq: $userID}}) {
            followed_by
            user_id
            }
        }
    `;


interface FetchFollowersResponse {
    followers: IFollower[]
}

const Feed = (props: any) => {

    const history = useHistory()
    
    const [userID,setUserID] = useState(props.location?.state?.id)

    useEffect(() => {
        if(userID == undefined) {
            if(auth.isAuthenticated()) {
                setUserID(auth.getClaim('x-hasura-user-id'))
            } else {
                history.replace('/home')
            }
        }
    })

    const [followers,setFollowers] = useState<string[]>()
    console.log('ID: ',userID)

    const {data,loading} = useQuery<FetchFollowersResponse>(FETCH_FOLLOWERS,{
        variables: {
            userID: userID
        }
    })

    if(!loading) {

        let followers = data?.followers.map((follower) => {return follower.user_id})

        if(followers != undefined) {
            return(
                <IonPage>
                    <FollowerPosts followers={followers} />
                </IonPage>
            )
        }
    } else {
        return (
            <IonPage>
                <IonTitle>
                    Laster inn..
                    <IonSpinner />
                </IonTitle>
            </IonPage>
        )
    }

    //This should never run
    return (
        <p>Hei</p>
    )

}


export default Feed;