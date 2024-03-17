import UserStore from '../store/UserStore';

export type UserData = {
    name: string;
    email: string;
    password: string;
};

export type LoginData = {
    email: string;
    password: string;
};

export type User = {
    email: string;
    exp: number;
    iat: number;
    name: string;
    sub: string;
};

export type Props = {
    userStore: UserStore;
};
