import { IonContent, IonInfiniteScroll, IonInfiniteScrollContent, IonSlide } from '@ionic/react'
import React from 'react'
import IUser from '../../models/IUser'
import User from '../User'

interface MASlideFollowers {
    followers: IUser[]
}

const MASlideFollowers = ({followers} : MASlideFollowers) => {
    return (
        <IonSlide>
            <IonInfiniteScroll>
                <IonInfiniteScrollContent>
                    {followers.map(user => <User key={user.id} {...user} />)}
                </IonInfiniteScrollContent>
            </IonInfiniteScroll>
        </IonSlide>
    )
}

export default MASlideFollowers