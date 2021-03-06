import React from 'react';
import {View, Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

//screens
import Checkout from '../screens/Cart/Checkout/Checkout';
import Payment from '../screens/Cart/Checkout/Payment';
import Confirm from '../screens/Cart/Checkout/Confirm';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        //enable button tabbar
        // listeners={{
        //   tabPress: e => {
        //     // Prevent default action
        //     e.preventDefault();
        //   },
        // }}
        name="Shipping"
        component={Checkout}
      />
      <Tab.Screen name="Payment" component={Payment} />
      <Tab.Screen name="Confirm" component={Confirm} />
    </Tab.Navigator>
  );
}

export default function CheckoutNavigator() {
  return <MyTabs />;
}
