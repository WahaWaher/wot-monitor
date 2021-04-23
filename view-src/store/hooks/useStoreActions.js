import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as profileActionCreators from '@/store/actions/profileActionCreators';
import * as updateActionCreators from '@/store/actions/updateActionCreators';

export const useStoreProfileActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(profileActionCreators, dispatch);
};

export const useStoreUpdateActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(updateActionCreators, dispatch);
};
