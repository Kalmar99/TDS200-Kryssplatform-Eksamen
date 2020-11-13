import { useMutation } from '@apollo/client';
import gql from 'graphql-tag'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { auth } from '../utils/nhost';
import { NTSColors } from './NTSlides/NTSlidesStyles';

interface FollowButton {
    target: string;
    user_id: string;

}

const FollowButton = ({target,user_id} : FollowButton) => {

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
            if(id == user_id) {
                setMySelf(true)
            }
        })
    })

    const getUserID = async () => {
        let id = await auth.getClaim('x-hasura-user-id')
        return id;
    }

    const [isFollowing,setIsFollowing] = useState<boolean>(false)
    
     /* Code in this function is based on the code shown in lecture 8 but modified to fit my project */
    const follow = async () => {
        if(!isFollowing) {
            try {
                console.log(`user: ${user_id} tried to follow user: ${target}`)
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

    let followBtn;

    if(!isFollowing && !mySelf) {
        followBtn = <FollowButtonStyled style={{backgroundColor: '#3686E2'}} onClick={follow}>Følg</FollowButtonStyled>
    } else if(isFollowing) {
        followBtn = <FollowButtonStyled style={{backgroundColor: 'transparent', border: '2px solid gray'}} disabled={true}>Følger</FollowButtonStyled>
    } else if (mySelf) {
        followBtn = "";
    }

    return (
        <div style={{textAlign: 'center'}}>
            {followBtn}
        </div>
    )
}

const FollowButtonStyled = styled.button`
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    margin: auto;
    border-radius: 8px;
`;

export default FollowButton