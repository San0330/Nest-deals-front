import axios from '../axios';
import User from '../domain/User';
import { CredentialType, RegisterUserType } from '../utils/types';

export interface IAuthRepository {
    login(credential: CredentialType): Promise<User>;
    register(user: RegisterUserType): Promise<Boolean>;
    getAuthUser(): Promise<User | null>;
    logout(): void;
}

export class AuthRepository implements IAuthRepository {

    private baseUrl = (url: string) => '/auth' + url

    async login(credential: CredentialType) {
        try {
            let res = await axios.post(this.baseUrl('/login'),
                {
                    email: credential.email,
                    password: credential.password,
                },
            )
            return new User(res.data)
        } catch (e) {
            throw e;
        }
    }

    async register(registerUser: RegisterUserType) {
        try {
            let res = await axios.post(this.baseUrl('/register'),
                {
                    email: registerUser.email,
                    password: registerUser.password,
                    first_name: registerUser.first_name,
                    last_name: registerUser.last_name,
                    date_of_birth: registerUser.date_of_birth,
                },
            )

            if (res.data) {
                return true;
            }

            return false;
        } catch (e) {
            throw e;
        }
    }

    async getAuthUser() {
        try {
            let res = await axios.get(this.baseUrl('/status'))

            if (res.data)
                return new User(res.data)

            return null;
        } catch (e) {
            throw e;
        }
    }

    async logout() {
        try {
            await axios.post(this.baseUrl('/logout'))
        } catch (e) {
            throw e;
        }
    }
}
