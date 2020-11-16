import { useMutation } from '@apollo/client';
import { useCamera } from '@capacitor-community/react-hooks/camera';
import { CameraPhoto, CameraResultType } from '@capacitor/core';
import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonItemGroup, IonLabel, IonList, IonModal, IonSlide, IonTitle, IonToolbar } from '@ionic/react';
import gql from 'graphql-tag';
import { cameraOutline, logOutOutline, settingsOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import IUser from '../../models/IUser';
import { auth, storage } from '../../utils/nhost';
import { config } from '../../utils/nhost-config';
import { generateHash } from '../../utils/utils';
import ImageRounded from '../Design/ImageRounded';

const UPDATE_AVATAR = gql`
    mutation updateAvatar($id: uuid, $imgName: String) {
        update_users(where: {id: {_eq: $id}}, _set: {avatar_url: $imgName}) {
        affected_rows
        }
    }
`;

interface MASlideSettings {
    user?: IUser;
    setAvatar: (url: string) => void
}

const MASlideSettings = ({user,setAvatar} : MASlideSettings) => {

    const [changePicture,setChangePicture] = useState(false)

    const [updateAvatar] = useMutation(UPDATE_AVATAR)
    const [displayImage,setDisplayImage] = useState<string>('')

    useEffect(() => {
        if(photo != undefined) {
            setDisplayImage(`${photo.dataUrl}`)
        } else if(user?.avatar_url != undefined) {
            setDisplayImage(user.avatar_url)
        } else {
            setDisplayImage('./assets/img/TakePicture.png')
        }
    })

    /*  The camera function and hook is copied from lecture 7 */
    const {isAvailable,getPhoto,photo} = useCamera()

    const triggerCamera = async () => {
         await getPhoto({
             resultType: CameraResultType.DataUrl,
             quality: 20,
             allowEditing: false
         }).then(photo => setDisplayImage(`${photo.dataUrl}`))
     }

    /*  Code in this function is copied from lecture 7 but modified to fit my project    */
    const uploadImage = async (image: string, name: string) => {
        await storage.putString(`/public/${name}.jpg`,image, 'data_url',null, (progress : ProgressEvent) => {
            console.log(progress.loaded)
        })
    }

    const setProfilePicture = async () => {
        if(user != undefined && photo != undefined) {
            let imgName = `${generateHash(user!.display_name)}`;
            uploadImage(`${photo!.dataUrl}`,imgName)
            await updateAvatar({
                variables: {
                    id: user!.id,
                    imgName: `${config.backendUrl}/storage/o/public/${imgName}.jpg`
                }
            })
            setAvatar(`${photo.dataUrl}`)
        }
    }

    return (
        <IonSlide>
            <IonModal isOpen={changePicture}>
                <IonHeader>
                    <IonToolbar style={{textAlign: 'center'}}>
                        <ModalActionLabel slot='start' onClick={() => setChangePicture(false)}>Avbryt</ModalActionLabel>
                        <ModalTitle>Endre Profilbilde</ModalTitle>
                        <ModalActionLabel slot='end' onClick={() => {setProfilePicture(); setChangePicture(false)}}>Lagre</ModalActionLabel>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <div style={{marginTop: '2rem'}} onClick={triggerCamera}>
                        <ImageRounded url={displayImage}
                            x='' y='' 
                            w='8rem' h='8rem' 
                            size='auto 100%'/>
                    </div>
                    <p style={{textAlign: 'center'}}>Trykk på bildet for å ta et nytt</p>
                    
                </IonContent>
            </IonModal>
            <SettingsGroup>
                <SettingsList>
                    <IonItem>
                        <IonIcon icon={settingsOutline} />
                        <SettingsTitle>Instillinger</SettingsTitle>
                    </IonItem>
                    <IonItem onClick={() => setChangePicture(true)}>
                        <IonIcon icon={cameraOutline} />
                        <SettingsLabel>Bytt Profil bilde</SettingsLabel>
                    </IonItem>
                    <IonItem onClick={() => auth.logout()}>
                        <IonIcon icon={logOutOutline}/>
                        <SettingsLabel> Logg Ut</SettingsLabel>
                    </IonItem>
                </SettingsList>
            </SettingsGroup>
        </IonSlide>
    )
}

const ModalTitle = styled(IonLabel)`
    text-align:center;
    font-size: 5vw;
`;

const ModalActionLabel = styled(IonLabel)`
    margin: 1rem;
    color: blue;
`;

const SettingsLabel = styled(IonLabel)`
    margin-left: 0.5rem;
`;

const SettingsTitle = styled(IonLabel)`

    font-size: 6vw !important;
    margin-left: 0.5rem;
`;

const SettingsGroup = styled(IonItemGroup)`
    margin-top: 1rem;
    text-align:left;
    width: 100%;
`;

const SettingsList = styled(IonList)`
    width: 100%;
`;

export default MASlideSettings;