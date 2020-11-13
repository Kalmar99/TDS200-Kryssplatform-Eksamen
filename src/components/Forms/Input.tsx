import { IonInput } from "@ionic/react"
import React, { useState } from "react"
import styled from "styled-components"
import { NTSColors } from "../NTSlides/NTSlidesStyles"

interface Input {
    type?: 'password' |  'text'
    onChange: (e: any) => void;
    required: boolean;
    placeholder: string;
}

const Input = ({type, onChange,required,placeholder} : Input) => {

    const [hasEdit,setHasEdit] = useState<boolean>()
    const [canShow,setCanShow] = useState<boolean>()

    return (
        <InputWrapper>
            <InputStyled type={type} 
                        onIonInput={ (e: any) => {onChange(e.target.value); setHasEdit(true); setCanShow(false) } } 
                        style={(required && !hasEdit && canShow) ? {border: `1px solid ${NTSColors.error}`} : (hasEdit != undefined ? {border: `1px solid ${NTSColors.success}`} : {}) } 
                        onFocus={() => setCanShow(true)}
                        placeholder={placeholder}/>
            { (canShow ) ? <RequiredMsg>Du må fylle inn dette feltet</RequiredMsg> : (canShow != undefined ? <AcceptedMsg>Godkjent</AcceptedMsg> : "")}
        </InputWrapper>
    )
}

const AcceptedMsg = styled.p`
    color: ${NTSColors.success};
    font-size: 4vw;
`;

const InputWrapper = styled.div`
    width: 85%;
    margin:auto;
`;

const InputStyled = styled(IonInput)`
    margin-top: 1rem;
    margin-bottom: .5rem;
    border: 1px solid #4D4D4D;
    border-radius: 8px;
`;

const RequiredMsg = styled.p`
    color: ${NTSColors.error};
    font-size: 4vw;
`;

export default Input