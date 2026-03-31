import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import React from 'react';
import { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';

export default function App() {
  // useEffect(() => {
  //   RNBootSplash.hide({ fade: true });
  // }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
