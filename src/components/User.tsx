import { IonItem, IonItemGroup } from '@ionic/react'
import React from 'react'
import styled from 'styled-components'
import IUser from '../models/IUser'


const User = ({id,display_name,avatar_url} : IUser) => {
    return (
        <UserWrapper>
            <IonItem lines='none'>
                <UserAvatar style={{backgroundImage: (avatar_url != undefined ? `URL(${avatar_url})` : 'URL(./assets/img/NoAvatar.png)')}} />
                <UserName>{display_name}</UserName>
            </IonItem>
        </UserWrapper>
    )
}

const UserWrapper = styled(IonItemGroup)`
    margin-top: 1rem;
`;

const UserAvatar = styled.div`
    width: 3rem;
    height: 3rem;
    border-radius: 4px;
    background-position: center;
    background-size: 100%;

    -webkit-box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
        -moz-box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
        box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16); 
`;

const UserName = styled.b`
    margin-left: 1rem;
    color: #2D2D2D;
    font-size: 4vw;
`;

export default User