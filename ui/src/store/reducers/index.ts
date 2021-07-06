import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { electronStorage } from '@/store/electronStorage';
import { profileReducer } from '@/store/reducers/profileReducer';
import { updateReducer } from '@/store/reducers/updateReducer';

const config = {
  profile: {
    key: 'profile',
    storage: electronStorage,
    blacklist: ['notices', 'widgets', 'appState', 'status', '_persist'],
    serialize: false,
  },
};

type ProfileReducerType = typeof profileReducer;

export const rootReducer = combineReducers({
  /* @ts-ignore */
  profile: persistReducer(config.profile, profileReducer) as ProfileReducerType,
  update: updateReducer,
});
