import React, {useContext, useEffect, useCallback, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Container} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import AuthGlobal from '../../Context/store/AuthGlobal';
import {logoutUser} from '../../Context/actions/Authactions';
import OrderCard from '../../Shared/OrderCard';

const UserProfile = props => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  const [orders, setOrders] = useState();

  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate('Login');
      }

      AsyncStorage.getItem('jwt')
        .then(res => {
          console.log('context', context);
          axios
            .get(`${baseURL}users/${context.stateUser.user.userId}`, {
              headers: {Authorization: `Bearer ${res}`},
            })
            .then(user => setUserProfile(user.data))
            .catch(err => console.log('ERR:', err));
        })
        .catch(error => console.log(error));

      axios
        .get(`${baseURL}orders`)
        .then(x => {
          const data = x.data;
          const userOrders = data.filter(order => {
            return order.user.id === context.stateUser.user.userId;
          });
          console.log(
            '🚀 ~ file: UserProfile.js ~ line 53 ~ useCallback ~ userOrders',
            userOrders,
          );
          setOrders(userOrders);
        })
        .catch(err => {
          console.log(err);
        });

      return () => {
        setUserProfile();
        setOrders();
      };
    }, [context.stateUser.isAuthenticated]),
  );

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <Text style={{fontSize: 30}}>
          {userProfile ? userProfile.name : ''}
        </Text>
        <View style={{marginTop: 20}}>
          <Text style={{margin: 10}}>
            Email: {userProfile ? userProfile.email : ''}
          </Text>
          <Text style={{margin: 10}}>
            Phone: {userProfile ? userProfile.phone : ''}
          </Text>
        </View>
        <View style={{marginTop: 80}}>
          <Button
            title={'Sign Out'}
            onPress={() => [
              AsyncStorage.removeItem('jwt'),
              logoutUser(context.dispatch),
            ]}
          />
        </View>
        <View style={styles.order}>
          <Text style={{fontSize: 20}}>My Orders</Text>
          <View>
            {orders ? (
              orders.map(x => {
                return <OrderCard key={x.id} {...x} />;
              })
            ) : (
              <View style={styles.order}>
                <Text>You have no orders</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  subContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  order: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 60,
  },
});

export default UserProfile;
