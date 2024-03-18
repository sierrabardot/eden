import { User, SetUser } from './userTypes';

export type AuthProps = {
    user: User | null;
    setUser: SetUser;
};

export type NavBarProps = {
    user: User | null;
    setUser: SetUser;
};
