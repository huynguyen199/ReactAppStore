import React, {useEffect, useReducer, userEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from '../reducer/AuthReducer';
import {setCurrentUser} from '../actions/Authactions';
import AuthGlobal from './AuthGlobal';
const Auth = props => {
  const [stateUser, dispatch] = useReducer(authReducer, {
    isAuthenticated: null,
    user: {},
  });

  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);

    if (AsyncStorage.jwt) {
      const decoded = AsyncStorage.jwt ? AsyncStorage.jwt : '';
      if (setShowChild) {
        console.log('state3', stateUser);

        dispatch(setCurrentUser(jwt_decode(decoded)));
      }
    }
    return () => setShowChild(false);
  }, []);

  if (!showChild) {
    console.log('show child');
    return null;
  } else {
    return (
      <AuthGlobal.Provider
        value={{
          stateUser,
          dispatch,
        }}>
        {props.children}
      </AuthGlobal.Provider>
    );
  }
};

export default Auth;
