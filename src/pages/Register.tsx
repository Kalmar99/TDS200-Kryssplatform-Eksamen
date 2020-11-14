import { useCamera } from '@capacitor-community/react-hooks/camera';
import { CameraResultType } from '@capacitor/core';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonItemGroup, IonLabel, IonPage, IonSlide, IonSlides, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ImageRounded from '../components/Design/ImageRounded';
import Input from '../components/Forms/Input';
import { auth, storage } from '../utils/nhost';
import { config } from '../utils/nhost-config';
import {generateHash} from '../utils/utils'


const Register = () => {

    const [username,setUsername] = useState<string>()
    const [email,setEmail] = useState<string>()
    const [password,setPassword] = useState<string>()
    const history = useHistory()

    const [pictureUrl,setPictureUrl] = useState('./assets/img/takePicture.png')

    const RegisterAccount = async () => {
        try {
            if( username != undefined && email != undefined && password != undefined) {

                let image_filename = `${generateHash(username)}`;

                let user = (pictureUrl != undefined && pictureUrl !== './assets/img/takePicture.png' ?
                {
                    display_name: username!,
                    avatar_url: `${config.backendUrl}/storage/o/public/${image_filename}.jpg`
                } :
                {
                    display_name: username!
                })

                await auth.register(email!, password!, user);
                await auth.login(email,password)
                let id = await auth.getClaim('x-hasura-user-id')
                if(pictureUrl != undefined && pictureUrl !== './assets/img/takePicture.png') {
                    uploadImage(pictureUrl,image_filename)
                }
                history.push(`/account/${id}`,{id:id})
            } 
        } catch(error) {
            console.log(error)
        }
    }

    /*  The camera function and hook is copied from lecture 7 */
    const {isAvailable,getPhoto,photo} = useCamera()

      /*  Code in this function is copied from lecture 7 but modified to fit my project    */
    const uploadImage = async (image: string, name: string) => {
        await storage.putString(`/public/${name}.jpg`,image, 'data_url',null, (progress : ProgressEvent) => {
            console.log(progress.loaded)
        })
    }


    const triggerCamera = async () => {
        await getPhoto({
            resultType: CameraResultType.DataUrl,
            quality: 20,
            allowEditing: false
        }).then( photo => {
            if(photo.dataUrl != undefined) {
                setPictureUrl(photo.dataUrl!)
            }
        })

    }

    return (
        <IonPage> 
            <IonContent>
                <IonSlidesFull>
                    <IonSlide>
                        <IonItemGroup>
                            <RegisterTitle>Ny Bruker</RegisterTitle>
                            <InputDescription>E-Post</InputDescription>
                            <Input placeholder='E-Post' type='text' onChange={ (e: string) => setEmail(e)} required={true}  />
                            <InputDescription>Brukernavn (synlig for andre brukere)</InputDescription>
                            <Input placeholder='Brukernavn' type='text' onChange={ (e: string) => setUsername(e)} required={true}  />
                            <InputDescription>Passord</InputDescription>
                            <Input placeholder='Passord' type='password' onChange={(e: string) => setPassword(e)} required={true} />
                            <p>Sveip til høyre når du har tastet inn alt</p>
                        </IonItemGroup>
                    </IonSlide>
                    <IonSlide>
                        <IonItemGroup>
                            <h2>Ta et bilde!</h2>
                            <InfoTxt>Vi ambefaler at du lager et profil bilde slik at andre brukere kjenner deg igjenn. Dette er valgfritt og du kan registrere uten bilde om du vil.</InfoTxt>
                            <div onClick={triggerCamera}><ImageRounded url={pictureUrl} x='' y='' w='8rem' h='8rem' size='100%'/></div>
                            <p>Trykk på bildet for å ta bilde</p>
                            <ButtonWrapper>
                                <RegisterButton onClick={RegisterAccount}>Register</RegisterButton>
                            </ButtonWrapper>
                        </IonItemGroup>
                    </IonSlide>
                </IonSlidesFull>
            </IonContent>
        </IonPage>
    )
}

const IonSlidesFull = styled(IonSlides)`
    height: 100%;
`;

const InfoTxt = styled.p`
    max-width: 20rem;
`;

const RegisterTitle = styled.h2`
    margin-bottom: 2rem;
    text-align: center;
`;

const InputDescription = styled(IonLabel)`
    margin-left: 1.7rem;
    margin-top: 1rem;
    margin-bottom: 0;
    text-align: left;
    font-size: 4vw !important;
`;

const ButtonWrapper = styled.div`
    width: 100%;
    text-align: center;
    margin-top: 1rem;
`;

const RegisterButton = styled(IonButton)`
    text-align: center;
`;


export default Register;