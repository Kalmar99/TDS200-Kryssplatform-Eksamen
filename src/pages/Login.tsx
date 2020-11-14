import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonInput, IonButton, iosTransitionAnimation } from '@ionic/react'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { auth } from '../utils/nhost'

import Input from '../components/Forms/Input'
import styled from 'styled-components'
import ImageRounded from '../components/Design/ImageRounded'
import { NTSColors } from '../components/NTSlides/NTSlidesStyles'


const Login : React.FC = () => {
    
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const history = useHistory()

    const [error,setError] = useState<string>()


    const login = async () => {
        try {
            await auth.login(username,password)
            if(auth.isAuthenticated()) {
                let id = await auth.getClaim('x-hasura-user-id')
                //history.replace(`/account/${id}`,{id:id})
                history.replace('/newtrip')
            } else {
                console.log("NOT LOGGED IN")
            }
        } catch(error) {
            setError('Feil Brukernavn eller passord')
            console.log(error)
        }
    }
    
    return (
        <IonPage>
            <IonHeader>
                <PushDown />
            </IonHeader>
            <IonContent>
                <ImageRounded url={'./assets/img/exporer.jpg'} x='-170px' y='-280px' w={'14rem'} h={'14rem'} />
                <LogInTitle>Logg Inn</LogInTitle>
                {error && <ErrorMsg>{error}</ErrorMsg>}
                <Input placeholder='Brukernavn' type='text' onChange={ (e: string) => setUsername(e)} required={true}  />
                <Input placeholder='Passord' type='password' onChange={(e: string) => setPassword(e)} required={true} />
                <LogInButton onClick={login} routerAnimation = {iosTransitionAnimation}>Login</LogInButton>
                <LogInButton onClick={() => history.push('/register')} routerAnimation = {iosTransitionAnimation}>Ny Bruker</LogInButton>
            </IonContent>
        </IonPage>
    )
}

const PushDown = styled.div`
    height: 8vw;
`;

const LogInTitle = styled.h2`
    text-align: center;
`;

const LogInButton = styled(IonButton)`
    margin-left: 1.7rem;
    min-width:6rem;
`;

const ErrorMsg = styled.p`
    font-size: 4vw;
    color: ${NTSColors.error};
    text-align: center;
`;


export default Login