import Api from '../api';

const USER_PATH_URL = '/user';

class UserApi {
  async getUser() {
    const res = await Api.get(`${USER_PATH_URL}/me`);
    return res.data;
  }

  async updateUserData(name?: string, phoneNumber?: string, imageUrl?: string) {
    const res = await Api.put(
      `${USER_PATH_URL}/userData`,
      { name, phoneNumber, imageUrl },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return res.data;
  }
}

export default new UserApi();
