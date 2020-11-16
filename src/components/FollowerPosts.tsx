import { gql, useQuery } from "@apollo/client"
import { IonSpinner } from "@ionic/react";
import React from "react"
import styled from "styled-components";
import ITrip from "../models/ITrip";
import Trip from "./Trip";


interface FollowerPosts {
    followers: string[]
}

interface FetchTrips {
    trips: ITrip[]
}

const FETCH_TRIPS = gql`
    query fetchTrips($users: [uuid!]) {
        trips(where: {user_id: {_in: $users}}) {
        title
        user_id
        image_filename
        id
        description
        }
    }
`;

const FollowerPosts = ({followers} : FollowerPosts) => {
    
    console.log('followers',followers)

    
    const {data,loading} = useQuery<FetchTrips>(FETCH_TRIPS,{
        variables: {
            users: followers
        }
    })

    if(loading) {
        return <div><IonSpinner /></div>
    }
    
    return (
        <div>
            <Title>Nylige turer</Title>
            {data?.trips.map((trip) => <Trip key={trip.id} {...trip} />)}
        </div>
    )
}

const Title = styled.h2`
    margin-left: 1rem;
`;

export default FollowerPosts 