import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as profileActionCreators from '@/store/actions/profileActionCreators';

export const useStoreProfileActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(profileActionCreators, dispatch);
};
