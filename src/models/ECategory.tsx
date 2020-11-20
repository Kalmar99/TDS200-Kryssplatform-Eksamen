import { boatOutline, fishOutline, flowerOutline, homeOutline, mapOutline, storefront, storefrontOutline, walkOutline, waterOutline } from "ionicons/icons";

enum ECategory {
    Cabin = 'Hytter',
    Mountain = 'Fjelltur',
    Fishing = 'Fisketur',
    Woods = 'Gåtur',
    Atraction = 'Attraksjon',
    Coast = 'Kyststi',
    BoatTrip = 'Båt Tur'
}

export enum CategoryIndex {
    'Hytter' = 0,
    'Fjelltur' = 1,
    'Fisketur' = 2,
    'Gåtur' = 3,
    'Attraksjon' = 4,
    'Kyststi' = 5,
    'Båt Tur' = 6
}

export const CategoryNames = []

export const CategoryColors = [
    '#72AB70',
    '#885A5A',
    '#16697A',
    '#21B156',
    '#F59251',
    '#24D5C3',
    '#22D17F'

]

export const CategoryImages = [
    './assets/img/cabin.jpg',
    './assets/img/mountain.jpg',
    './assets/img/fishing.jpg',
    './assets/img/woods.jpg',
    './assets/img/Category/atraction.jpg',
    './assets/img/Category/coast.jpg',
    './assets/img/Category/boat.jpg'
]


export const CategoryIcons = [
    homeOutline,
    walkOutline,
    fishOutline,
    mapOutline,
    storefrontOutline,
    waterOutline,
    boatOutline

]




export default ECategory;