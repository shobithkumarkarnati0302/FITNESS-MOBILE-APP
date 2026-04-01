import React, { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

import { useSelector, useDispatch } from 'react-redux';
import { loadTokenRequest } from '../store/actions/authAction';
import {
  selectToken,
  selectIsInitializing,
} from '../store/selectors/authSelector';

export default function RootNavigator() {
  const token          = useSelector(selectToken);
  const isInitializing = useSelector(selectIsInitializing);
  const dispatch       = useDispatch();

  useEffect(() => {
    dispatch(loadTokenRequest());
    
  }, [dispatch]);

  useEffect(() => {
    if (!isInitializing) {
      RNBootSplash.hide({ fade: true });
    }
  }, [isInitializing]);

  if (isInitializing) {
    return null;
  }

  return token ? <AppNavigator /> : <AuthNavigator />;
}
