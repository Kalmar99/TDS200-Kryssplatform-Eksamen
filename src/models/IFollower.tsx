import IUser from "./IUser";

interface IFollower {
    user_id: string;
    followed_by: string;
    FollowTarget?: IUser;
}

export default IFollower