import { observable, makeObservable, action } from 'mobx';
import { User, UserData, LoginData } from '../types/userTypes';
import * as usersService from '../utilities/users-service';

class UserStore {
    user: User | null = null;

    constructor() {
        makeObservable(this, {
            user: observable,
            signUp: action,
            login: action,
            logout: action,
        });
    }

    async signUp(userData: UserData): Promise<void> {
        try {
            const user = await usersService.signUp(userData);
            this.user = user;
        } catch (error) {
            console.error(error);
        }
    }

    async login(loginData: LoginData): Promise<void> {
        try {
            const user = await usersService.login(loginData);
            this.user = user;
        } catch (error) {
            console.error(error);
        }
    }

    logout(): void {
        try {
            usersService.logout();
            this.user = null;
        } catch (error) {
            console.error(error);
        }
    }
}

export default UserStore;
