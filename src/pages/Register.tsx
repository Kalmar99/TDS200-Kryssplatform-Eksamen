import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonItemGroup, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Input from '../components/Forms/Input';
import { auth } from '../utils/nhost';



const Register = () => {

    const [username,setUsername] = useState<string>()
    const [email,setEmail] = useState<string>()
    const [password,setPassword] = useState<string>()
    const history = useHistory()

    const RegisterAccount = async () => {
        try {
            if( username != undefined && email != undefined && password != undefined) {
                await auth.register(email!, password!, { display_name: username! });
                let id = await auth.getClaim('x-hasura-user-id')
                history.push(`/account/${id}`,{id:id})
            } 
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <IonPage> 
            <IonContent>
                <RegisterTitle>Ny Bruker</RegisterTitle>
                <InputDescription>E-Post</InputDescription>
                <Input placeholder='E-Post' type='text' onChange={ (e: string) => setEmail(e)} required={true}  />
                <InputDescription>Brukernavn (synlig for andre brukere)</InputDescription>
                <Input placeholder='Brukernavn' type='text' onChange={ (e: string) => setUsername(e)} required={true}  />
                <InputDescription>Passord</InputDescription>
                <Input placeholder='Passord' type='password' onChange={(e: string) => setPassword(e)} required={true} />
                <ButtonWrapper>
                    <RegisterButton onClick={RegisterAccount}>Register</RegisterButton>
                </ButtonWrapper>
            </IonContent>
        </IonPage>
    )
}

const RegisterTitle = styled.h2`
    margin-bottom: 2rem;
    text-align: center;
`;

const InputDescription = styled(IonLabel)`
    margin-left: 1.7rem;
`;

const ButtonWrapper = styled.div`
    width: 100%;
    text-align: center;
`;

const RegisterButton = styled(IonButton)`
    text-align: center;
`;


export default Register;