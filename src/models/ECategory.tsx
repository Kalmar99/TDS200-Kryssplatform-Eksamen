import { fishOutline, flowerOutline, homeOutline, walkOutline } from "ionicons/icons";

enum ECategory {
    Cabin = 'Hytter',
    Mountain = 'Fjelltur',
    Fishing = 'Fisketur',
    Woods = 'Skogtur'
}

export enum CategoryIndex {
    'Hytter' = 0,
    'Fjelltur' = 1,
    'Fisketur' = 2,
    'Skogtur' = 3
}

export const CategoryNames = []

export const CategoryColors = [
    '#72AB70',
    '#885A5A',
    '#16697A',
    '#21B156'
]

export const CategoryImages = [
    './assets/img/cabin.jpg',
    './assets/img/mountain.jpg',
    './assets/img/fishing.jpg',
    './assets/img/woods.jpg'
]


export const CategoryIcons = [
    homeOutline,
    walkOutline,
    fishOutline,
    flowerOutline
]




export default ECategory;