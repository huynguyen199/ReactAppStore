import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Content, Left, Body, ListItem, Thumbnail, Text} from 'native-base';
var {width} = Dimensions.get('window');

const SearchedProducts = props => {
  const {productsFiltered} = props;
  console.log(
    '🚀 ~ file: SearchedProducts.js ~ line 8 ~ productsFiltered',
    productsFiltered,
  );

  return (
    <Content style={{width: width}}>
      {productsFiltered.length > 0 ? (
        productsFiltered.map(item => (
          <ListItem key={item.name} avatar>
            <Left>
              <Thumbnail
                source={{
                  uri: item.image
                    ? item.image
                    : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
                }}
              />
            </Left>
            <Body>
              <Text>{item.name}</Text>
              <Text note>{item.description}</Text>
            </Body>
          </ListItem>
        ))
      ) : (
        <View style={StyleSheet.center}>
          <Text style={{alignSelf: 'center'}}>
            No Products match the selectd criteria
          </Text>
        </View>
      )}
    </Content>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchedProducts;
