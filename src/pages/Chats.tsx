import { OnSubscriptionDataOptions, useQuery, useSubscription } from "@apollo/client";
import { IonContent, IonList, IonPage } from "@ionic/react"
import gql from "graphql-tag"
import { push } from "ionicons/icons";
import React, { useEffect, useState } from "react"
import LatestMessage from "../components/LatestMessage";
import IMessage from "../models/IMessage";
import IUser from "../models/IUser";
import { auth } from "../utils/nhost";

interface MessagesResponse {
    messages: IMessage[]
}


const FETCH_MESSAGES = gql`
    subscription getMessages($userID: uuid) {
        messages(where: {
            _or:[
            {sender: {_eq: $userID}}
            {receiver:{_eq: $userID}}
            ]
            }) 
        {
        id
        message
        user {
            id
            avatar_url
            display_name
        }
        sender
        receiver
        }
    }
`;

/*
`
    subscription getMessages($userID: uuid) {
        messages(where: {receiver: {_eq: $userID}}) {
            id
            message
            user {
                id
                avatar_url
                display_name
            }
            sender
            receiver
        }
    }
`; */

const Chats = () => {

    const [messages,setMessages] = useState<Map<string,IMessage[]>>(new Map())

    // To keep track of sender's user,objects
    const [senders,setSenders] = useState<Map<string,IUser>>()

    //The actual message components
    const [msgComponents,setMsgComponents] = useState<any>([])

    const [id,setId] = useState<string>()

    useEffect(() => {
        //Get the user id if the user is logged in
        if(id === undefined) {
            if(auth.isAuthenticated()) {
                let id = auth.getClaim('x-hasura-user-id')
                setId(id)
            }
        }

    } )


    //Callback function for the subscription, This function filteres the data and creates the UI components
    const updateMessages = (data? : MessagesResponse) => {

        if(data?.messages != undefined && data.messages.length > 0 ) {

            //const oldValues = Array.from(messages!.values())

            //Filter the messages to get conversations
            const newMessages = filterMessages(data.messages)

            //const newValues = Array.from(messages!.values())
            
            
                setMessages(newMessages!)
                console.log('messages',newMessages!)
            
            
            const localMsgComponents : any = []

            //As far as i know i cant .map over a map so using a for each to add to array that i can map
            newMessages?.forEach((msgs,key) => {

                localMsgComponents.push(<LatestMessage key={key} messages={msgs} />)

            })
            /*
            setMsgComponents((prev : any) => {
                
                const NewData = prev.concat(localMsgComponents)
          
                console.log('Recieved New Messages',NewData)
                return NewData;
            }) */

        }
    }

    //Execute the subscription and register callback
    const {data,loading,error} = useSubscription<MessagesResponse>(FETCH_MESSAGES,{
        subscription: FETCH_MESSAGES,
        variables: {
            userID: id
        },
        shouldResubscribe: true,
        onSubscriptionData: (options: OnSubscriptionDataOptions<MessagesResponse>) => updateMessages(options.subscriptionData.data)
        
    })

    if(error) {
        console.log(error)
    }

    // dear hasura, why dont you support group by.......
    const filterMessages = (msg: IMessage[]) => {
        
        /*
            This functions takes an array of messages and filters them on sender.
            Stores the results in map where one entry is a array of messages. i use the senders id as key
        */

        //If user is not logged-in just quit function
        if(!auth.isAuthenticated())  return;

        const id = auth.getClaim('x-hasura-user-id')

        const messages = new Map<string,IMessage[]>()
        
        msg.forEach((message) => {

            //This conversation does not yet exist in the map
            //message.user.id -> the sender of message, i sort conversations on sender

            // First we check if we already have a conversation with this sender
            if(messages.get(message.sender) === undefined) {
              
                //Check if this message is sent by current logged-in user
                if(message.sender === id ) {
                    
                    //if it is. check if conversation already exist
                    const conversation = messages.get(message.receiver)
                    if(conversation !== undefined) {
                        //We already have a conversation with receving user. add current message
                        conversation.push(message)
                        messages.set(message.receiver,conversation)
                    } else {
                        //We dont have a conversation with this user. create it
                        messages.set(message.receiver,[message])
                    }
                } else {
                    setSenders((oldMap) => oldMap?.set(message.sender,message.user))
                    messages.set(message.sender,[message])
                }
                
            } else {
                //This conversation exists. add the message to it

                //check if current user sent it:
                if(message.sender === id) {
                    //Try to get the conversation
                    let conversation = messages.get(message.receiver)

                    if(conversation != undefined) {
                        // There exists a conversation with this user! add my response:
                        conversation.push(message)
                        messages.set(message.receiver,conversation)
                    } else {
                        // A conversation with this user does not yet exist. create one
                        messages.set(message.receiver,[message])
                    }
                } else {
                    // Current user is not the sender. add conversation
                    const conversation = messages.get(message.sender)
                    if(conversation != undefined) {
                        conversation?.push(message)
                        messages.set(message.sender,conversation)
                    }
                }
            }
        })

        return messages
    }



    return (
        <IonPage>
            <IonContent>
                <IonList>
                    {Array.from(messages!).map((message,i) => <LatestMessage key={i} messages={message[1]} />)}
                    {msgComponents?.map((msg : any) => msg)}
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default Chats