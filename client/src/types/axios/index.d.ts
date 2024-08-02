import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    useRefreshToken?: boolean;
  }
}
