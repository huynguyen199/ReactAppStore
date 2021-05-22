import React, {useContext, useEffect, useState} from 'react';
import {Text, View, Button, Dimensions} from 'react-native';
import {Item, Toast, Container, Form, Picker} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Input from '../../../Shared/Form/Input';
import FormContainer from '../../../Shared/Form/FormContainer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import AuthGlobal from '../../../Context/store/AuthGlobal';
const countries = require('../../../assets/countries.json');
var {width} = Dimensions.get('window');
const Checkout = props => {
  const context = useContext(AuthGlobal);
  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    setOrderItems(props.cartItems);

    if (context.stateUser.isAuthenticated) {
      console.log(context);
      setUser(context.stateUser.user.userId);
    } else {
      props.navigation.navigate('Cart');
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Please Login to Checkout',
        text2: '',
      });
    }

    return () => {
      setOrderItems();
    };
  }, []);

  const checkOut = () => {
    let c = {
      city,
      country,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      shippingAddress1: address,
      shippingAddress2: address2,
      status: '3',
      user,
      zip,
    };
    console.log('🚀 ~ file: Checkout.js ~ line 33 ~ checkOut ~ c', c);

    props.navigation.navigate('Payment', {order: c});
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}>
      <FormContainer title={'Shipping Address'}>
        <Input
          placeholder={'Phone'}
          name={'phone'}
          value={phone}
          keyboardType={'numeric'}
          onChangeText={text => setPhone(text)}
        />
        <Input
          placeholder={'Shipping Address 1'}
          name={'ShippingAddress1'}
          value={address}
          onChangeText={text => setAddress(text)}
        />
        <Input
          placeholder={'Shipping Address 2'}
          name={'ShippingAddress2'}
          value={address2}
          onChangeText={text => setAddress2(text)}
        />
        <Input
          placeholder={'City'}
          name={'city'}
          value={city}
          onChangeText={text => setCity(text)}
        />
        <Input
          placeholder={'Zip Code'}
          name={'zip'}
          value={zip}
          keyboardType={'numeric'}
          onChangeText={text => setZip(text)}
        />
        <Item picker style={{width: 120}}>
          <Picker
            // mode="dropdown"
            // note={false}
            style={{height: 50}}
            // iosIcon={<Icon name="arrow-down" color={'#007aff'} />}
            selectedValue={country}
            onValueChange={e => setCountry(e)}>
            {countries.map(c => {
              return <Picker.Item key={c.code} label={c.name} value={c.name} />;
            })}
          </Picker>
        </Item>
        <View style={{width: '80%', alignItems: 'center'}}>
          <Button title="Confirm" onPress={() => checkOut()} />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};
const mapStateToProps = state => {
  const {cartItems} = state;
  return {
    cartItems: cartItems,
  };
};
export default connect(mapStateToProps)(Checkout);
