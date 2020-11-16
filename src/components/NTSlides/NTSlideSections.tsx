import { useCamera } from '@capacitor-community/react-hooks/camera'
import { CameraPhoto, CameraResultType } from '@capacitor/core'
import { IonButton, IonHeader, IonModal, IonSlide, IonToolbar } from '@ionic/react'
import React, { useState } from 'react'
import styled from 'styled-components'
import ISection from '../../models/ISection'
import TextArea from '../Forms/TextArea'
import { InfoDescription, ImagePreview,Input } from './NTSlidesStyles'

import SectionDisplay from './SectionDisplay'

interface NTSlideSections {
    updateSections: (sections: ISection[]) => void
}

const NTSlideSections = ({updateSections} : NTSlideSections) => {

    /*  The camera function and hook is copied from lecture 7 */
    const {isAvailable,getPhoto,photo} = useCamera()
    const [modal,setModal] = useState(false)

    const [sections,setSections] = useState<ISection[]>([])
    const [name, setName] = useState<string>("")
    const [description,setDescription] = useState<string>("")
    const [image,setImage] = useState<CameraPhoto>()
    

    const triggerCamera = async () => {
        await getPhoto({
            resultType: CameraResultType.DataUrl,
            quality: 20,
            allowEditing: false
        }).then( photo =>
            setImage(photo)
        )

    }

    let displayPhoto;

    if(photo && image != undefined) {
        displayPhoto = <ImagePreview src={photo.dataUrl} onClick={triggerCamera} />
    } else {
        displayPhoto = <IonButton onClick={triggerCamera}>Ta Bilde</IonButton>
    }

    const resetModal = () => {
        setName("")
        setDescription("")
        setImage(undefined)
        setModal(false)
    }

    const addSection = () => {

        const section = {
            image_name: image?.dataUrl,
            title: name,
            description: description,
            id: sections?.length,
        } as ISection

        /*  
            SetSections is async, to make sure i get the current updated state in the parent component i put updateSections
            inside setSections.
        */
        setSections(oldSections => {
            updateSections([...oldSections,section])
            return [...oldSections,section]
        })
       
        resetModal()
        
    }

    const removeSection = (id: number) => {
        setSections((current) => current.filter( section => section.id != id))
    }

    return (
        <IonSlide>
            <IonModal isOpen={modal}>
                <IonHeader>
                    <ModalToolBar>
                        <p slot='start' onClick={resetModal}>Avbryt</p>
                        <h3>Legg til aktivitet</h3>
                        <p slot='end' onClick={addSection}>Lagre</p>
                    </ModalToolBar>
                </IonHeader>
                <ModalGroup>
                    {displayPhoto}
                    {photo && <p style={{fontSize: '4vw', marginTop: '0'}}>Trykk på bildet for å ta et nytt</p>}
                    <p>Navn</p>
                    <Input onIonInput={(e : any) => setName(e.target.value)} placeholder='Aktivitetens Navn' />
                    <p>Beskrivelse</p>
                    <TextArea onInput={setDescription} placeholder='Fortell litt om aktiviteten' />
                </ModalGroup>
            </IonModal>
            <Group>
                <h2 className='title'>Legg til aktiviteter</h2>
                <InfoDescription>Finnes det noen spesielle aktiviteter man kan gjøre på denne turen. F.eks fisking, bading, klatring osv</InfoDescription>
                <IonButton className="add" onClick={() => setModal(true)}>Legg til Aktivitet</IonButton>
                <p>Aktiviteter:</p>
                {sections.map((section) => <SectionDisplay key={section.title + section.image_name} title={section.title} description={section.description} image={section.image_name} id={section.id} remove={removeSection} />)}
                <p className="info" >Når du er ferdig, sveip til høyre</p>
            </Group>
        </IonSlide>
    )
}

//<TextArea rows={3} placeholder='Fortell litt om aktiviteten' onIonInput={(e : any) => setDescription(e.target.value)}/>

const Group = styled.div`
    margin: auto;

    p {
        text-align: center;
        margin: auto;
    }

    .add {
        margin-top: 1.3rem;
        margin-bottom: 1.3rem;
    }

    .info {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
`;

const ModalGroup = styled.div`
    margin: auto;
    padding: 1rem;

`;

const ModalToolBar = styled(IonToolbar)`
    p {
        color: blue;
        margin: 0.2rem;
    }

    h3 {
        text-align: center;
    }
`;

export default NTSlideSections;