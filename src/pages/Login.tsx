import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonInput, IonButton, iosTransitionAnimation } from '@ionic/react'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { auth } from '../utils/nhost'


const Login : React.FC = () => {
    
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const history = useHistory()


    const login = async () => {
        try {
            await auth.login(email,password)
            history.push("/")
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonInput
                    placeholder="email"
                    onIonChange={(e : any) => setEmail(e.detail.value)}/>
                <IonInput
                    placeholder="password"
                    onIonChange={(e : any) => setPassword(e.detail.value)}/>
                <IonButton onClick={login} routerAnimation = {iosTransitionAnimation}>Login</IonButton>
            </IonContent>
        </IonPage>
    )
}

export default Login