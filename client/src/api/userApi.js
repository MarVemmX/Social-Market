import axiosClient from './axiosClient';
import { StorageKeys } from '../constants';

const userApi = {
  register(data) {
    const url = 'api/auth/register';
    return axiosClient.post(url, data);
  },

  login(data) {
    const url = 'api/auth/login';
    return axiosClient.post(url, data);
  },

  updateUser(data) {
    const token = localStorage.getItem(StorageKeys.TOKEN);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const id = data.id;
    const url = `api/profile/${id}/edit`;
    return axiosClient.patch(url, data, config);
  },

  getUser(id) {
    const url = `api/profile/${id}`;
    return axiosClient.get(url);
  },

  updateAvatar(data, id) {
    const token = localStorage.getItem(StorageKeys.TOKEN);
    const url = `api/profile/${id}/avatar`;
    return axiosClient.put(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default userApi;
