import IUser from "./IUser";

interface IReview {
    user: IUser;
    comment: string;
    rating: number;
    id?: number;
}

export default IReview