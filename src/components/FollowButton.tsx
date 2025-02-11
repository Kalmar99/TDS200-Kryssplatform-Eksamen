import { useMutation } from '@apollo/client';
import gql from 'graphql-tag'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import IFollower from '../models/IFollower';
import { auth } from '../utils/nhost';
import { NTSColors } from './NTSlides/NTSlidesStyles';

interface FollowButton {
    target: string;
    user_id: string;
    followers?: IFollower[];

}

const FollowButton = ({target,user_id,followers} : FollowButton) => {

    const FOLLOW_MUTATION = gql`
        mutation insertFollow($user : uuid, $target : uuid) {
            insert_followers_one(object: {followed_by: $user, user_id: $target}) {
            followed_by
            user_id
            }
        }
    `;

    const [insertFollowMutation] = useMutation(FOLLOW_MUTATION)
    const [mySelf,setMySelf] = useState(false)

    useEffect( () => {
        
        getUserID().then( id => {
            setMySelf(false)
            if(id === target) {
                setMySelf(true)
                return;
            }

            if(followers != undefined) {
                // Need to set it to false first so that state is changed if user visits page that he/she does not follow.
                setIsFollowing(false)   
                //if the current viewing is following the account page he/she is currently on, display following instead of follow and disable the button;
                followers.forEach( follower => {
                    if(follower.followed_by == user_id) {
                        
                        setIsFollowing(true)
                    }
                })
            }
        })
    },[target,user_id,followers])

    const getUserID = async () => {
        let id = await auth.getClaim('x-hasura-user-id')
        return id;
    }

    const [isFollowing,setIsFollowing] = useState<boolean>(false)
    
     /* Code in this function is based on the code shown in lecture 8 but modified to fit my project */
    const follow = async () => {
        if(!isFollowing) {
            try {
                await insertFollowMutation({
                    variables: {
                        user: user_id,
                        target: target
                    }
                })
                setIsFollowing(true)
            } catch(error) {
                console.log(error)
            }
        }
    }

    return (
        <div style={{textAlign: 'center'}}>
            
            {!isFollowing && !mySelf ? 
                <FollowButtonStyled style={{backgroundColor: '#3686E2'}} onClick={follow}>Følg</FollowButtonStyled> 
                    : (isFollowing && target != user_id ? 
                        <FollowButtonStyled style={{backgroundColor: 'transparent', border: '2px solid gray', color: 'gray'}} disabled={true}>Følger</FollowButtonStyled> : '')}
        </div>
    )
}

const FollowButtonStyled = styled.button`
    padding-left: 1.2rem;
    padding-right: 1.2rem;
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    margin: auto;
    border-radius: 8px;
    font-size: 4vw;
    color: white;
`;

export default FollowButton