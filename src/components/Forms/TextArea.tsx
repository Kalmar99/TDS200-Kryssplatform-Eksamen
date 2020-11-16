import { IonTextarea } from "@ionic/react";
import React, { useState } from "react"
import styled from "styled-components";
import { NTSColors } from "../NTSlides/NTSlidesStyles";

interface TextArea {
    onInput: (text: string) => void;
    placeholder: string;
}

const TextArea = ({onInput,placeholder} : TextArea) => {

    const [hasEdit,setHasEdit] = useState<boolean>(false)
    const [canShow,setCanShow] = useState<boolean>()

    return (
        <TextAreaStyled style={ (canShow && !hasEdit) ? {border: `2px solid ${NTSColors.error}`} : (canShow != undefined ? {border: `2px solid ${NTSColors.success}`} : {}) } 
        rows={4} 
        placeholder={placeholder}
        onFocus={() => setCanShow(true)}
        onIonInput={(e : any) => {onInput(e.target.value); setHasEdit(true)}} />
    )
}

export const TextAreaStyled = styled(IonTextarea)`
    border: 2px solid gray;
    border-radius: 4px;
`;


export default TextArea