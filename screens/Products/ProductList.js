import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import ProductCart from './ProductCart';
var {width} = Dimensions.get('window');

const ProductList = props => {
  const {item} = props;
  return (
    <TouchableOpacity>
      <ProductCart {...item} />
    </TouchableOpacity>
  );
};

export default ProductList;
