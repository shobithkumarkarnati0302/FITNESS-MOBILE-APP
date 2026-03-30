import React, { useEffect } from 'react';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import { ActivityIndicator, View } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { loadTokenRequest }         from '../store/actions/authAction';
import {selectToken, selectAuthLoading} from '../store/selectors/authSelector';

export default function RootNavigator() {
  const token = useSelector(selectToken);
  const loading = useSelector(selectAuthLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTokenRequest());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return token ? <AppNavigator /> : <AuthNavigator />;
}
