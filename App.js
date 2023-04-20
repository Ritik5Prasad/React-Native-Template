import {View, Text} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/Redux/Store';
import TodoScreen from './src/Screens/TodoScreen';

const App = () => {
  return (
    <Provider store={store}>
      <TodoScreen />
    </Provider>
  );
};

export default App;
