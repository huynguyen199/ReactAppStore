import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import ProductCard from './ProductCard';
var {width} = Dimensions.get('window');

const ProductList = props => {
  const {item} = props;
  return (
    <TouchableOpacity>
      <ProductCard {...item} />
    </TouchableOpacity>
  );
};

export default ProductList;
