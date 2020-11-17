import { useQuery } from "@apollo/client";
import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonItemGroup, IonLabel, IonModal, IonToolbar } from "@ionic/react";
import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Chat from "./Chat";
import IMessage from "../models/IMessage";
import IUser from "../models/IUser";
import { auth } from "../utils/nhost";


const GET_USER = gql`
    query getUser($user: uuid) {
        users(where: {id: {_eq: $user}}) {
        avatar_url
        display_name
        id
        }
    }
`;

interface LatestMessage {
    messages: IMessage[]
}

interface GetUserResponse {
    users: IUser[]
}

const LatestMessage = ({messages} : LatestMessage) => {
    
    const [senderName,setSenderName] = useState<string>()
    const [message,setMessage] = useState<string>()
    
    //The id of the other user (not the logged in one)
    const [id,setId] = useState<string>()

    const [openChat,setOpenChat] = useState(false)

    useEffect(() => {

        if(senderName === undefined && message == undefined) {
            if(messages[messages.length-1] != undefined) {
                
                setSenderName(messages[messages.length-1].user.display_name)
                setMessage(messages[messages.length-1].message)
                
                let id = auth.getClaim('x-hasura-user-id')
                if(messages[messages.length-1].user.id === id) {
                    setId(messages[messages.length-
                        1].receiver)
                } else {
                    setId(messages[messages.length-1].sender)
                }
            }
        }
    })

    // I need to get the user data gain here since the user object i get in IMessage is the user that sent the last message.
    // thus there is a possibility that the user object belongs to the current logged in user and i want to show the other user's image and name here.
    const {data,loading} = useQuery<GetUserResponse>(GET_USER,{variables: {
        user: id
    }})

    let avatar = 'URL(./assets/img/NoAvatar.png)'
    if(data?.users[0].avatar_url != undefined ) {
        avatar = `URL(${data?.users[0].avatar_url})`
    }

    return (
        <Msg>
            <Chat display={openChat} messages={messages} other={{id:data?.users[0].id,display_name: senderName, avatar_url: avatar} as IUser} />
            <UserImage style={{backgroundImage: avatar}} />
            <MsgInfo onClick={() => setOpenChat(true)}>
                <UserName>{senderName}</UserName>
                <LastMsg>{message}</LastMsg>
            </MsgInfo>
           
        </Msg>
    )
}

const ChatToolbar = styled(IonToolbar)`

`;

const Msg = styled(IonItem)`
    margin-bottom: 0.5rem;
`;

const MsgInfo = styled(IonItemGroup)`
    margin-left: 1rem;
    margin-bottom: 0.5rem;
`;

const UserImage = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    background-position: center;
    background-size: auto 100%;
    border-radius: 4px;
`;

const UserName = styled(IonLabel)`

`;

const LastMsg = styled.p`
    color: gray;
    margin: 0;
    font-size: 4vw;
`;

export default LatestMessage;