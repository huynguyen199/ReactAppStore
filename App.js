import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Container} from 'native-base';

import TodoList from './Components/TodoList';
import ProductContainer from './screens/Products/ProductContainer';
import Header from './Shared/Header';
export default function App() {
  return (
    <View style={styles.container}>
      {/* <TodoList /> */}
      <Header />
      <ProductContainer />
    </View>
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