import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { electronStorage } from '@/store/electronStorage';
import { profileReducer } from '@/store/reducers/profileReducer';
import { eventsReducer } from '@/store/reducers/eventsReducer';

const config = {
  profile: {
    key: 'profile',
    storage: electronStorage,
    blacklist: ['notices', 'widgets', 'appState', 'status', '_persist'],
    serialize: false,
  },
};

export const rootReducer = combineReducers({
  profile: persistReducer(config.profile, profileReducer),
  events: eventsReducer,
});
