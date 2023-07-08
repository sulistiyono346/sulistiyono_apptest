import React from 'react';
import RootNavigation from './src/navigation';
import {Provider} from 'react-redux';
import store from './src/store/stores';
import Toast from 'react-native-toast-message';

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
