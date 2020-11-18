import { useMutation } from "@apollo/client";
import { IonModal, IonHeader, IonToolbar, IonButtons, IonBackButton, IonLabel, IonContent, IonFooter, IonList, IonItem } from "@ionic/react";
import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import IMessage from "../../models/IMessage";
import IUser from "../../models/IUser";
import { auth } from "../../utils/nhost";
import TextArea from "../Forms/TextArea";
import Message from "./Message";

const SEND_MESSAGE = gql`
    mutation sendMessage($from: uuid, $to: uuid, $message: String) {
        insert_messages_one(object: {message: $message, receiver: $to, sender: $from}) {
        message
        receiver
        sender
        user {
           display_name
           avatar_url 
        }
        }
    }
`;

interface Chat {
    messages: IMessage[]
    other: IUser;
    display: boolean
}

const Chat = ({messages,other,display} : Chat) => {

    let avatar = './assets/img/NoAvatar.png'

    const [message,setMessage] = useState<string>()
    
    const [sendMessage] = useMutation(SEND_MESSAGE)

  
    const submitMessage = async () => {

        if(auth.isAuthenticated() && message!.length > 0 && message != undefined) {
            const sender = auth.getClaim('x-hasura-user-id')
            const receiver = other.id

            await sendMessage({
                variables: {
                    from: sender,
                    to: receiver,
                    message: message
                }
            })

        }
        
    }

    const orderMsgs = messages.sort((a : IMessage,b : IMessage) => a.id - b.id)

    return (
        <IonModal isOpen={display}>
            <IonHeader>
                <ChatToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/chats' />
                    </IonButtons>
                    <IonLabel>{other.display_name}</IonLabel>
                </ChatToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    {orderMsgs.map((msg) => <Message key={msg.id} 
                                                                    content={msg} 
                                                                    senderAvatar={(msg.user.avatar_url !== undefined ? msg.user.avatar_url : avatar)} />) }
                </IonList>
                <IonFooter>
                    <IonItem lines='none'>
                        <MsgInput rows={3} onChange={(e: any) => setMessage(e.target.value)} />
                        <SendBtn onClick={submitMessage}>Send</SendBtn>
                    </IonItem>
                </IonFooter>
            </IonContent>
        </IonModal>
        )
}

const MsgInput = styled.textarea`
    resize: none;
    width: 15rem;
    background-color: #ECECEC;
    border: none;
    border-radius: 4px;
`;

const SendBtn = styled.button`
    padding: 1rem 2rem 1rem 2rem;
    margin: auto;
    background: #3686E2;
    border-radius: 4px;
    color:white;
    font-weight: 500;

`;

const ChatToolbar = styled(IonToolbar)`
    text-align: center;
`;

export default Chat;