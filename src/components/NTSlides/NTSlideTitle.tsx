import { IonIcon, IonItemGroup, IonSelect, IonSelectOption, IonSlide} from '@ionic/react'
import React, { useState } from 'react'
import styled from 'styled-components'
import ECategory, { CategoryIndex, CategoryIcons } from '../../models/ECategory'

import {Input,ErrorMsg,SuccessMsg,NTSColors} from './NTSlidesStyles'

interface NTSlideTitle {
    setTitle: (title: string) => void
    hasInput: boolean
    setCategory: (category: string) => void
}

const NTSlideTitle = ({setTitle,hasInput,setCategory} : NTSlideTitle) => {

    const [shownMsg,setShownMsg] = useState<boolean>()

    const categories = Object.values(ECategory)

    return (
        <IonSlide>
            <IonItemGroup>
                <h2>Hva heter destinasjonen?</h2>
                <Input style={ (!hasInput && !shownMsg) ? {border: `2px solid ${NTSColors.error}`} : (shownMsg != undefined ? {border: `2px solid ${NTSColors.success}`} : {}) } type="text" placeholder="Navn på destinasjon" onIonInput={(e : any) => {
                    setTitle(e.target.value); 
                    setShownMsg(true)
                }} />
                 { !hasInput && !shownMsg ? <ErrorMsg>Dette feltet kan ikke være blankt</ErrorMsg> : (shownMsg != undefined ? <SuccessMsg>Godkjent</SuccessMsg> : "") }
                <p>Du kan også velge kategori. Dette er valgfritt</p>
                <CategorySelect onIonChange={(value: any) => setCategory(value.target.value)} placeholder='Velg en kategori' okText='Velg' interface='action-sheet' cancelText='Avbryt'  >
                    {categories.map((category) => <IonSelectOption key={category} value={category}><IonIcon icon={CategoryIcons[CategoryIndex[category]]} />{category}</IonSelectOption>)}
                </CategorySelect>
                <p>Sveip til høyre når du er ferdig</p>
            </IonItemGroup>
        </IonSlide>
    )
}

const CategorySelect = styled(IonSelect)`
    border: 1px solid black;
`;


export default NTSlideTitle;