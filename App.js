import React, { useEffect } from 'react';

import Routes from './src/routes';
import { Provider } from 'react-redux';
import store from './src/redux/store';

export default function App() {

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
};