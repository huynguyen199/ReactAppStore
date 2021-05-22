import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import AuthGlobal from '../../Context/store/AuthGlobal';
import Auth from '../../Context/store/Auth';
import Error from '../../Shared/Error';
import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import {loginUser} from '../../Context/actions/Authactions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = props => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState('huyabata@gmail.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate('User Profile');
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };

    if (email === '' || password === '') {
      setError('Please fill in your credentials');
    } else {
      console.log('success');
      loginUser(user, context.dispatch);
    }
  };

  return (
    <View style={{backgroundColor: 'white'}}>
      <FormContainer title={'Login'}>
        <Input
          placeholder={'Enter Email'}
          name={'email'}
          id={'email'}
          value={email}
          onChangeText={text => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder={'Enter Password'}
          name={'password'}
          id={'password'}
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
          <Button title="Login" onPress={() => handleSubmit()} />
        </View>
        <View
          style={[
            {
              marginTop: 40,
            },
            styles.buttonGroup,
          ]}>
          <Text style={styles.middleText}>Don't have an account yet?</Text>
          <Button
            title="Register"
            onPress={() => props.navigation.navigate('Register')}
          />
        </View>
      </FormContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    alignItems: 'center',
  },
  middleText: {
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default Login;
