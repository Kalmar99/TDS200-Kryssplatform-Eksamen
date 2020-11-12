import { IonItem, IonItemGroup } from '@ionic/react'
import React from 'react'
import styled from 'styled-components';


interface SectionDisplay {
    title: string;
    description: string;
    image: string
}

const SectionDisplay = ({title,description,image} : SectionDisplay) => {
    return (
        <SectionDisplayStyled lines='none'>
            <SectionImage slot="start"  style={{background: `URL(${image})`}} />
            <SectionGroup>
                <b>{title}</b>
                <p>{description}</p>
            </SectionGroup>
        </SectionDisplayStyled>
    )
}

const SectionDisplayStyled = styled(IonItem)`
    margin-top: 0.4rem;
`;

const SectionImage = styled.div`
    height: 4rem !important;
    width: 6rem !important;
    border-radius: 4px;

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