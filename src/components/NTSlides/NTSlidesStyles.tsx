import { IonInput, IonTextarea } from "@ionic/react";
import styled from "styled-components";

export const InfoDescription = styled.p`
    max-width: 19rem;
`;

export const TextArea = styled(IonTextarea)`
    border: 2px solid gray;
    border-radius: 4px;
`;

export const ImagePreview = styled.img`
    width: 14rem !important;
    border-radius: 5px;
`;

export const ImageDescription = styled.p`
    max-width: 14rem;
`;

export const Input = styled(IonInput)`
    border: 2px solid gray;
    border-radius: 4px;
`;

