import React from 'react';
import RootNavigation from './src/navigation';
import {Provider} from 'react-redux';
import store from './src/store/stores';
import Toast from 'react-native-toast-message';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

function App() {
  return (
    <>
      <Provider store={store}>
        <RootNavigation></RootNavigation>
      </Provider>
      <Toast position="top" />
    </>
  );
}

export default App;
