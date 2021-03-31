import { combineReducers } from 'redux';
import { profileReducer } from '@/store/reducers/profileReducer';
import { eventsReducer } from '@/store/reducers/eventsReducer';

export default combineReducers({
  profile: profileReducer,
  events: eventsReducer,
});
