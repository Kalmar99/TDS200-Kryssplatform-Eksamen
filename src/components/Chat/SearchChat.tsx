import { useQuery } from "@apollo/client";
import { IonModal, IonHeader, IonToolbar, IonSearchbar, IonContent } from "@ionic/react";
import gql from "graphql-tag";
import { arrowBackSharp, filter } from "ionicons/icons";
import React, { useEffect, useState } from "react"
import styled from "styled-components";
import IFollower from "../../models/IFollower";
import IMessage from "../../models/IMessage";
import IUser from "../../models/IUser";
import Chat from "./Chat";
import User from "../User";

const FETCH_FOLLOWED = gql`
    query getFollowers($id: uuid) {
        followers(where: {followed_by: {_eq: $id}}) {
            user_id
            followed_by
            FollowTarget {
                avatar_url
                display_name
                id
            }
        }
    }
`;

interface SearchChat {
    searchActive: boolean;
    messages: Map<string,IMessage[]>;
    setSearchActive: (active: boolean) => void;
    id?: string;
}


interface FollowerResponse {
    followers: IFollower[]
}

const SearchChat = ({searchActive,messages,setSearchActive,id} : SearchChat) => {

    const [searchString,setSearchString] = useState<string>()

    const{ data,loading} = useQuery<FollowerResponse>(FETCH_FOLLOWED,{
        variables: {
            id: id
        }
    })

    const [filteredFollowers,setFilteredFollowers] = useState<IFollower[]>()

    const [currentList,setCurrentList] = useState<IFollower[]>()

    if(!loading) {
        // set the current list with all the people you follow before any filter string is inputted
        //console.log('finished loading with data: ', data)
        if(data?.followers != undefined && currentList === undefined) {
            setCurrentList(data.followers)
        }
    }

    const onSearchInput = (input: string) => {

        if(searchString != undefined && searchString.length > 1) {
            //the string is not empty, Filter the current list
            filterFollowers()
            
        } else {
            //if the search string is empty, set all followers in the displaying lsit
            setCurrentList(data?.followers)
        }

        setSearchString(input)

        
       
    }

    const filterFollowers = () => {
        
        const result = data?.followers.filter( (follower) => {
            if(searchString != undefined) {
                if(follower.FollowTarget?.display_name.includes(searchString)) {
                    return follower;
                }
            }
        })

        setCurrentList(result)

    }

    const [target,setTarget] = useState<IUser>()
    const [showChat,setShowChat] = useState<boolean>(false)
    const [conversation,setConversation] = useState<IMessage[]>([])

    const openChat = (target?: IUser) => {
        if(target != undefined) {
            setTarget(target)

            //Check if a conversation already exists with this user. if it does use that
            if(messages.has(target.id)) {
                const convo = messages.get(target.id)
                if(convo != undefined) {
                    setConversation(convo)
                }   
            } else {
                //If not start fresh
                setConversation([])
            }

            setShowChat(true)
        } else {
            console.log('cant find the requested user')
        }
    }

    return(
        <IonModal isOpen={searchActive}>
            { target && <Chat messages={messages.get(target.id) != undefined ? messages.get(target.id)! : []} other={target} display={showChat} />}
            <IonHeader>
                <IonToolbar>
                    <FollowerSearch inputMode='search' cancelButtonText='Avbryt' showCancelButton='always' cancelButtonIcon={arrowBackSharp} onIonCancel={() => setSearchActive(false)} onIonInput={(e : any) => onSearchInput(e.target.value)} />
                </IonToolbar>
            </IonHeader>
            <IonContent>
                    {currentList?.map((follower,i) => <div onClick={() => openChat(follower.FollowTarget)} key={follower.FollowTarget!.id + follower.user_id}><User {...follower.FollowTarget!}  /> </div>)}
            </IonContent>
        </IonModal>
    )
}


const FollowerSearch = styled(IonSearchbar)`
    
    padding: 0 !important;
    margin: 0 !important;


    --background: white;
    --border-radius: 0;
    --color: black;
    --icon-color: black;
    --placeholder-color: black;
    --cancel-button-color: black;

`;

export default SearchChat