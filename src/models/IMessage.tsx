import IUser from "./IUser";

interface IMessage {
    id: number;
    receiver: string;
    sender: string;
    message: string;
    user: IUser
}


export default IMessage;