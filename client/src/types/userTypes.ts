import { SetStateAction } from 'react';

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
    user?: User;
    setUser: React.Dispatch<SetStateAction<User | null>>;
};
