import { IonItem } from "@ionic/react"
import React, { useEffect, useState } from "react"
import styled from "styled-components";
import IMessage from "../../models/IMessage";
import { auth } from "../../utils/nhost";

interface Message {
    content: IMessage;
    senderAvatar: string;
}

const Message = ({content,senderAvatar} : Message) => {

    const [side,setSide] = useState<'start' | 'end'>()

    interface css {
        background: string, 
        color: string, 
        textAlign: 'left' | 'right'
    }

    const [messageStyle,setMessageStyle] = useState<css>()

    useEffect(() => {
        if(messageStyle == undefined) {
            if(auth.isAuthenticated()) {
                const id = auth.getClaim('x-hasura-user-id')

                if(id === content.sender) {
                    // The current logged-in user sent this message
                    setSide('end')
                    setMessageStyle({
                        background: '#3686E2',
                        color: 'white',
                        textAlign: 'right'
                    })
                } else {
                    setSide('start')
                    setMessageStyle(
                        {
                            background: '#ECECEC',
                            color: 'black',
                            textAlign: 'left'
                           
                        }
                    )
                }
            }
        }
    })

    return (
        <IonItem lines='none'>
            <IonItem slot={side} lines='none'>
            <Image slot={side} style={{backgroundImage: `URL(${senderAvatar != undefined ? senderAvatar : './assets/img/NoAvatar.png'})`, clear: 'none'}} />
            <Msg style={messageStyle}>{content.message}</Msg>
            </IonItem>
        </IonItem>
    )
}


const Msg = styled.p`
    border-radius: 4px;
    max-width: 19rem;
    padding: 0.5rem;
`;

const Image = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    background-position: center;
    background-size: auto 100%;
    border-radius: 4px;
`;


export default Message