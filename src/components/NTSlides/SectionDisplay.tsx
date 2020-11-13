import { IonAlert, IonIcon, IonItem, IonItemGroup } from '@ionic/react'
import React, { useState } from 'react'
import styled from 'styled-components';

import {NTSColors} from './NTSlidesStyles'

import {closeOutline} from 'ionicons/icons'


interface SectionDisplay {
    id?: number;
    title: string;
    description: string;
    image: string;
    remove?: (id: number) => void;
}

const SectionDisplay = ({id,title,description,image,remove} : SectionDisplay) => {

    const [confirm,setConfirm] = useState(false)

    return (
        
        <SectionDisplayStyled lines='none'>
            <IonAlert
                isOpen={confirm}
                onDidDismiss={() => setConfirm(false)}
                header={'Sikker?'}
                message={'Er du sikker på at du vil slette denne aktiviteten'}
                buttons={[
                    {
                    text: 'Nei',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: blah => {
                        setConfirm(false)
                    }
                    },
                    {
                    text: 'Ja Slett',
                    handler: () => {
                        if(remove != undefined && id != undefined) {
                            remove!(id!)
                        }
                        setConfirm(false)
                    }
                    }
                ]}/>
                
            <SectionImage slot="start"  style={{background: `URL(${image})`}}> 
              { remove != undefined && <DeleteIcon icon={closeOutline} onClick={() => setConfirm(true)}/>}
            </SectionImage>
            <SectionGroup>
                <b>{title}</b>
                <p>{description}</p>
            </SectionGroup>
        </SectionDisplayStyled>
    )
}

const DeleteIcon = styled(IonIcon)`
    margin-top: auto;
    color: white;
    position: absolute;
    top: -8px;
    left: -8px;
    background-color: ${NTSColors.error};
    font-size: 6vw;
    padding: 0px;
    border-radius: 50px;
`;

const SectionDisplayStyled = styled(IonItem)`
    margin-top: 0.4rem;
    overflow: visible
`;

const SectionImage = styled.div`
    height: 4rem !important;
    width: 6rem !important;
    border-radius: 4px;
    position:relative;
    overflow: visible
    -webkit-box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
    -moz-box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
    box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
    background-size: auto 100% !important;
    background-position: center center !important;
    background-repeat: no-repeat !important;
`;

const SectionGroup = styled(IonItemGroup)`
    b {
        padding-bottom: 0;
        margin-bottom: 0;
    }

    p {
        margin:0;
        padding:0;
        text-align: left !important;
        max-width: 12rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
`;

export default SectionDisplay