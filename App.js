import React from 'react';
import {StyleSheet, Text, View, LogBox} from 'react-native';
import {Container} from 'native-base';

import TodoList from './Components/TodoList';
import ProductContainer from './screens/Products/ProductContainer';
import Header from './Shared/Header';
import Toast from 'react-native-toast-message';

//Navigator
import Main from './Navigator/Main';
import {NavigationContainer} from '@react-navigation/native';

//Redux
import {Provider} from 'react-redux';
import store from './Redux/store';

import Auth from './Context/store/Auth';

// LogBox.ignoreLogs([
//   'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
// ]);
LogBox.ignoreAllLogs();
export default function App() {
  let navigator;
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          {/* <TodoList /> */}
          <Header />
          <Main />
          <Toast ref={ref => Toast.setRef(ref)} />
          {/* <ProductContainer /> */}
        </NavigationContainer>
      </Provider>
    </Auth>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
