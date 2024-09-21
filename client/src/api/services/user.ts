import Api from '../api';

const USER_PATH_URL = '/user';

class UserApi {
  async getUser() {
    const res = await Api.get(`${USER_PATH_URL}/me`);
    return res.data;
  }

  async updateUserWeight(weight: number) {
    const res = await Api.put(`${USER_PATH_URL}/weight`, { weight });
    return res.data;
  }
}

export default new UserApi();
