import { IonContent, IonInfiniteScroll, IonInfiniteScrollContent, IonSlide } from '@ionic/react'
import React from 'react'
import IFollower from '../../models/IFollower'
import IUser from '../../models/IUser'
import User from '../User'

interface MASlideFollowers {
    followers?: IFollower[]
}

const MASlideFollowers = ({followers} : MASlideFollowers) => {
    return (
        <IonSlide>
            <IonInfiniteScroll>
                <IonInfiniteScrollContent>
                    {followers != undefined && followers.map(user => user.followed_by )}
                </IonInfiniteScrollContent>
            </IonInfiniteScroll>
        </IonSlide>
    )
}

//<User key={user.id} {...user} />

export default MASlideFollowers