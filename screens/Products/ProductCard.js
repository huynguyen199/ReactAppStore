import {Button} from 'native-base';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
var {width} = Dimensions.get('window');
import Toast from 'react-native-toast-message';

const ProductCard = props => {
  console.log('props', props);
  const {name, price, image, countInStock} = props;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: image
            ? image
            : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
        }}
      />
      <View style={{marginTop: 140}} />
      <Text style={styles.title}>
        {name.length > 15 ? name.substring(0, 15 - 3) + '...' : name}
      </Text>
      <Text style={styles.price}>${price}</Text>
      {countInStock > 0 ? (
        <TouchableOpacity
          onPress={() => {
            props.addItemToCart(props);
            Toast.show({
              topOffset: 60,
              type: 'success',
              text1: `${name} added to Cart`,
              text2: 'Go to your cart to complete order',
            });
          }}
          style={{backgroundColor: '#03bafc', padding: 5, borderRadius: 15}}>
          <Text style={{color: 'white'}}>ADD TO CART</Text>
        </TouchableOpacity>
      ) : (
        <Text style={{marginTop: 20}}>Currently Unavailable</Text>
      )}
    </View>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: product => {
      dispatch(actions.addToCart({quantity: 1, product}));
    },
  };
};

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    height: width / 1.6,
    padding: 10,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    elevation: 8,
    backgroundColor: 'white',
  },
  image: {
    width: width / 2 - 20 - 10,
    height: width / 2 - 20 - 30,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -8,
    resizeMode: 'contain',
  },
  card: {
    marginBottom: 10,
    height: width / 2 - 20 - 40,
    width: width / 2 - 20 - 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    color: 'orange',
  },
});

export default connect(null, mapDispatchToProps)(ProductCard);
// export default ProductCard;
