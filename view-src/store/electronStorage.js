import { fetchCurrentProfile, postCurrentProfile } from '@/api/electronAPI';

export const electronStorage = {
  getItem(key) {
    if (key !== 'persist:profile') return Promise.reject();

    return fetchCurrentProfile();
  },
  setItem(key, data) {
    if (key !== 'persist:profile') return Promise.reject();

    return postCurrentProfile(data);
  },
  removeItem: (key) => Promise.reject(),
};
