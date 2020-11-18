import IUser from './IUser'

interface ITrip {
    id: number;
    title: string;
    description: string;
    image_filename: string;
    user?: IUser
    category?: string;
}

export default ITrip


  