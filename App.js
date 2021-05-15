import React from 'react';
import {StyleSheet, Text, View, LogBox} from 'react-native';
import {Container} from 'native-base';

import TodoList from './Components/TodoList';
import ProductContainer from './screens/Products/ProductContainer';
import Header from './Shared/Header';

//Navigator
import Main from './Navigator/Main';
import {NavigationContainer} from '@react-navigation/native';

//Redux
import {Provider} from 'react-redux';
import store from './Redux/store';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]);
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <TodoList /> */}
        <Header />
        <Main />
        {/* <ProductContainer /> */}
      </NavigationContainer>
    </Provider>
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
