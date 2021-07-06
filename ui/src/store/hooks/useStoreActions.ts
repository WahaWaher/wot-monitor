import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as profileActionCreators from '@/store/actions/profileActions';
import * as updateActionCreators from '@/store/actions/updateActions';

export const useStoreProfileActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(profileActionCreators, dispatch);
};

export const useStoreUpdateActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(updateActionCreators, dispatch);
};
