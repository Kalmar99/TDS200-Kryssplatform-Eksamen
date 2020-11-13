import styled from "styled-components"
import React from 'react'

interface ImageRounded {
    url: string;
    x: string;
    y: string;
    w: string;
    h: string;
    size?: string;
}

const ImageRounded = ({url,x,y,w,h,size} : ImageRounded) => {
    return (
        <RoudedImage style={{
            backgroundImage: `URL(${url})`,
            backgroundPositionX: `${x}`,
            backgroundPositionY: `${y}`,
            width: `${w}`,
            height: `${h}`,
            backgroundSize: (size != undefined ? size : '')

        }} > </RoudedImage>
    )
}

const RoudedImage = styled.div`
    background-position: center;
    background-repeat: no-repeat;
    margin:auto;
    display:block;
    border-radius: 14rem;
`

export default ImageRounded