import { useMutation } from "@apollo/client";
import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonItemGroup, IonLabel, IonModal, IonSpinner, IonToolbar } from "@ionic/react";
import gql from "graphql-tag";
import { pencilOutline, star, starOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import IReview from "../models/IReview";
import IComment from "../models/IReview";
import { auth } from "../utils/nhost";
import TextArea from "./Forms/TextArea";
import { NTSColors } from "./NTSlides/NTSlidesStyles";
import Review from "./Review";
import User from "./User";

interface Reviews{
    reviews?: IReview[]
    trip: number
}

const ADD_REVIEW = gql`
    mutation addReview($review: reviews_insert_input!) {
        insert_reviews_one(object: $review) {
        comment
        rating
        trip_id
        user_id
        }
    }
`;

const Reviews = ({reviews,trip} : Reviews) => {

    console.log(reviews)

    const [userAvatar,setUserAvatar] = useState<string>();
    const [userName,setUserName] = useState<string>()

    const [showAll,setShowAll] = useState(false)
    const [writeNew,setWriteNew] = useState(false)

    const [stars,setStars] = useState<number>(0)
    const [starIcons,setStarIcons] = useState<any[]>([])
    const [reviewText,setReviewText] = useState<string>()
    const [error,setError] = useState<string>('')

    const [addReview] = useMutation(ADD_REVIEW)

    useEffect(() => {

        if(reviews != undefined && userAvatar == undefined && userName == undefined && reviews.length > 0) {
            setUserName(reviews[0].user.display_name)
            let avatar = reviews[0].user.avatar_url != undefined ? reviews![0].user.avatar_url : './assets/img/NoAvatar.png'
            setUserAvatar(avatar)
        }
    })


    if(reviews == undefined) {
        return <IonSpinner />
    } else if (reviews.length == 0) {
        return <p>Ingen har skrevet en anmeldse enda</p>
    }

    const starClick = (index: number) => {
        setStars(index)
        console.log('index: ',index)
        renderStars(index)
    }

    const renderStars = (selected: number) => {

        setStarIcons([])

        let sharedIndex = 0

        for(let i = 0; i < selected; i++) {

            setStarIcons((old) => [...old, <StarStyled size='large' key={i+'filled'} icon={star} style={{color: '#DECE3E'}} onClick={() => starClick(i + 1)} />])
            sharedIndex++;
        }

        for(let i = 0; i < (6 - selected); i++) {

            setStarIcons((old) => [...old, <StarStyled size='large' key={i} icon={starOutline} onClick={() => starClick(sharedIndex + i + 1)}/>])
        }

    }

    const newReview = () => {

        if(auth.isAuthenticated()) {

            if(reviewText != undefined && stars != 0) {
                addReview({
                    variables: {
                        review: {
                            user_id: auth.getClaim('x-hasura-user-id'),
                            comment: reviewText,
                            rating: stars,
                            trip_id: trip
                        }
                    }
                })

                setWriteNew(false);

            } else {
                setError('Du må fylle ut alle feltene!')
            }
        }

    }

    return(
        <div>
            <IonModal isOpen={showAll}>
                <IonHeader>
                    <ReviewToolBar>
                        { auth.isAuthenticated() && <CloseLabel slot='start' onClick={() => setShowAll(false)}>Skriv Ny</CloseLabel>}
                        <IonLabel>Alle Anmeldelser</IonLabel>
                        <CloseLabel slot='end' onClick={() => setShowAll(false)}>Lukk</CloseLabel>
                    </ReviewToolBar>
                </IonHeader>
                <IonContent>
                    {reviews.map((review) => <ReviewWrapper key={review.id}> <Review review={review} /> </ReviewWrapper> )}
                </IonContent>
            </IonModal>
            <IonModal isOpen={writeNew} onWillPresent={() => renderStars(stars)}>
                <IonHeader>
                    <ReviewToolBar>
                        <CloseLabel slot='start' onClick={() => setWriteNew(false)}>Avbryt</CloseLabel>
                        <IonLabel>Skriv Anmeldelse</IonLabel>
                        <CloseLabel slot='end' onClick={() => {newReview()}}>Lagre</CloseLabel>
                    </ReviewToolBar>
                </IonHeader>
                <IonContent>
                    <ReviewInputGroup>
                        <InputLabel>Ranger denne turen</InputLabel>
                        {starIcons?.map((star) => {return star})}
                        <InputLabel>Skriv en Anmeldelse</InputLabel>
                        <TextArea onInput={(text: string) => setReviewText(text)} placeholder='fortell andre brukere litt om denne turen' />
                       {error != undefined && <p style={{color: NTSColors.error}}>{error}</p>}
                    </ReviewInputGroup>
                </IonContent>
            </IonModal>
            <Review review={reviews[reviews.length-1]} displayButtons={true} openAll={() => setShowAll(true)} writeReview={() => setWriteNew(true)} />
        </div>
    )
}

const StarStyled = styled(IonIcon)`
    margin-right: 0.2rem;
    margin-bottom: 0.5rem;
`;

const ReviewInputGroup = styled(IonItemGroup)`
    margin: 1rem !important;
`;

const InputLabel = styled(IonLabel)`
    margin-bottom: 0.5rem;
`;

const ReviewWrapper = styled.div`
    margin: 1rem;
`;

const CloseLabel = styled(IonLabel)`
    margin: 1rem;
    color: blue;
`;

const ReviewToolBar = styled(IonToolbar)`
    text-align: center;
`;




export default Reviews;