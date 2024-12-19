import { COOKIES } from '../../constants/cookies';
import axios, { AxiosInstance } from '../../node_modules/axios/index.d';
import Cookies from 'js-cookie';

export class HttpInstanceFactory {
    private static httpInstance: AxiosInstance | null = null;

    public static getInstance() {
        if (!this.httpInstance) {
            this.httpInstance = axios.create({
                baseURL: 'some_url',
            });
            this.httpInstance.interceptors.request.use(config => {
                const token = Cookies.get(COOKIES.TOKEN);

                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                } else {
                    delete config.headers.Authorization;
                }
                return config;
            });
        }
        return this.httpInstance;
    }
}
