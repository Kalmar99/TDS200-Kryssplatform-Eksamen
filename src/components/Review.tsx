import { IonItemGroup, IonItem, IonIcon, IonButton, IonLabel } from "@ionic/react";
import { starOutline, pencilOutline } from "ionicons/icons";
import React from "react";
import styled from "styled-components";
import IReview from "../models/IReview";


interface Review {
    review: IReview;
    displayButtons?: boolean
    openAll?: () => void
    writeReview?: () => void
}

const Review = ({review,displayButtons,openAll,writeReview} : Review) => {
    return (
        <ReviewGroup style={displayButtons ? {} : {borderRadius: '4px'}}>
            <ReviewItem lines='none'>
                <UserImage style={{backgroundImage: `URL(${review.user.avatar_url != undefined ? review.user.avatar_url : './assets/img/noAvatar.png' })`}} />
                <UserName>{review.user.display_name}</UserName>
                <IonItemGroup slot='end'>
                    <IonLabel>{review.rating} / 6  <IonIcon icon={starOutline} /></IonLabel>
                </IonItemGroup>
            </ReviewItem>
            <ReviewItem lines='none'>
                <ReviewComment>{review.comment}</ReviewComment>
            </ReviewItem>
            { displayButtons && <ReviewItem lines='none'>
                <ReviewButton onClick={openAll} style={{width:'35%', borderRight: '1px solid gray'}}><ReviewButtonIcon icon={starOutline} />Se Alle</ReviewButton>
                <ReviewButton onClick={writeReview} style={{width:'65%'}}><ReviewButtonIcon icon={pencilOutline} />Skriv En Anmeldelse</ReviewButton>
            </ReviewItem>}
        </ReviewGroup>
    )
}

const ReviewGroup = styled(IonItemGroup)`
    border-radius: 4px 4px 0px 0px;
    background: #F1ECEC !important;
`;

const ReviewItem = styled(IonItem)`

    ::part(native) {
        padding-left: 0;
        background: inherit !important;
    }

`;

const ReviewComment = styled.p`
    margin: 1rem;
`;

const ReviewButtonIcon = styled(IonIcon)`
    font-size: 5vw !important;
    margin-right: 0.5rem;
    
`;

const ReviewButton = styled(IonButton)`
    margin: 0;
    padding: 0;
    min-height: 3rem;
    font-size: 4vw;

    ::part(native) {
        background:  #F1ECEC;
        color: #2D2D2D;
        border-radius: 0px 0px 4px 4px;
    }
`;

const UserName = styled(IonLabel)`
    margin-left: 0.5rem;
    margin-top:0.5rem;
`;

const UserImage = styled.div`
    background-size: auto 100%;
    background-position: center;
    border-radius: 4px;
    width: 2rem;
    height: 2rem;
    margin-left: 1rem;
    margin-top:0.5rem;
`;

export default Review;