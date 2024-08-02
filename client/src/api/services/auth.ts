import Api from '../api';

const AUTH_PATH_URL = '/auth';

class AuthApi {
  async register(email: string, password: string, name: string) {
    const res = await Api.post(`${AUTH_PATH_URL}/register`, { email, password, name });

    return res.data;
  }

  async login(email: string, password: string) {
    const res = await Api.post(`${AUTH_PATH_URL}/login`, {
      email,
      password,
    });
    return res.data;
  }

  async logout() {
    await Api.get(`${AUTH_PATH_URL}/logout`, {
      useRefreshToken: true,
    });
  }

  async refresh() {
    const response = await Api.get(`${AUTH_PATH_URL}/refresh`, {
      useRefreshToken: true,
    });

    return response.data;
  }
}

export default new AuthApi();
