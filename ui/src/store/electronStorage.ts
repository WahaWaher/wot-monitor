import { fetchCurrentProfile, postCurrentProfile } from '@/api/electronAPI';

export const electronStorage = {
  getItem(key: string) {
    if (key !== 'persist:profile') return Promise.reject();

    return fetchCurrentProfile();
  },
  setItem(key: string, data: any) {
    if (key !== 'persist:profile') return Promise.reject();

    return postCurrentProfile(data);
  },
  removeItem: (key: string) => Promise.reject(),
};
