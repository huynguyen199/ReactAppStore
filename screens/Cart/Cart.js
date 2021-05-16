import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
} from 'react-native';
import {
  Container,
  Text,
  Left,
  Right,
  H1,
  ListItem,
  Thumbnail,
  Body,
  Footer,
} from 'native-base';

import {SwipeListView} from 'react-native-swipe-list-view';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as actions from '../../Redux/Actions/cartActions';
import CartItem from './CartItem';

var {width, height} = Dimensions.get('window');

const Cart = props => {
  var total = 0;
  const data = props.cartItems;

  props.cartItems.forEach(cart => {
    return (total += cart.product.price);
  });

  console.log('🚀 ~ file: Cart.js ~ line 6 ~ props', data);

  return (
    <>
      {props.cartItems.length ? (
        <View>
          <ScrollView>
            <Container>
              <H1 style={{alignSelf: 'center'}}>Cart</H1>
              {/* {props.cartItems.map(data => {
                return <CartItem item={data} />;
              })} */}
              <SwipeListView
                data={data}
                keyExtractor={item => item.product._id.$oid}
                renderItem={data => <CartItem item={data} />}
                renderHiddenItem={data => (
                  <View style={styles.hiddenContainer}>
                    <TouchableOpacity
                      style={styles.hiddenButton}
                      onPress={() => props.removeFromCart(data.item)}>
                      <Icon name="trash" color={'white'} size={30} />
                    </TouchableOpacity>
                  </View>
                )}
                disableRightSwipe={true}
                previewOpenDelay={3000}
                friction={1000}
                tension={40}
                leftOpenValue={75}
                stopLeftSwipe={75}
                rightOpenValue={-75}
              />
            </Container>
          </ScrollView>

          <View style={styles.bottomContainer}>
            <Left>
              <Text style={styles.price}>$ {Math.floor(total)}</Text>
            </Left>
            <Right>
              <Button title="Clear" onPress={() => props.clearCart()} />
            </Right>
            <Right>
              <Button
                title="Checkout"
                onPress={() => props.navigation.navigate('CheckOut')}
              />
            </Right>
          </View>
        </View>
      ) : (
        <Container style={styles.emptyContainer}>
          <Text>Looks like your cart is empty</Text>
          <Text>Add products to your cart to get started</Text>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = state => {
  const {cartItems} = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: item => dispatch(actions.removeFromCart(item)),
  };
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ListItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  body: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: 'red',
    width: 120,
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  hiddenButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
