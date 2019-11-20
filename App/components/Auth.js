import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';

import {login, signup} from '../../store/actions/user';
import Card from './UI/Card';
import Input from './UI/Input';
import AnimatedInputLabel from './UI/AnimatedInputLabel';
import ActionButton from './UI/ActionButton';
import Colors from '../Constants/Colors';
import RedLogo from '../assets/images/logo.png';

const Auth = props => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const authMethod = props.method;

  useEffect(() => {
    if (authMethod === 'login') {
      const setLoginUsername = async () => {
        const username = await AsyncStorage.getItem('username');
        if (username) {
          setUserName(username);
        }
      };
      setLoginUsername();
    }
  }, []);

  let submitButtonTitle = 'შესვლა';

  if (authMethod === 'signup') {
    submitButtonTitle = 'რეგისტრაცია';
  }

  const changeTextHanlder = (value, state = 'userName') => {
    state === 'userName' ? setUserName(value) : setPassword(value);
  };

  const dispatch = useDispatch();
  const authHandler = async () => {
    const credentials = {userName, password};
    const action = authMethod === 'login' ? login : signup;

    try {
      setLoading(true);
      await dispatch(action(credentials));
      setLoading(false);
      props.navigation.navigate('Home');
    } catch (error) {
      setLoading(false);
      showMessage({
        message: `${error}`,
        position: {
          bottom: 10,
          left: 50,
          right: 50,
        },
      });
    }
  };
  return (
    <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
      <View style={styles.imgContainer}>
        <Image style={styles.image} source={RedLogo} />
      </View>
      <View style={styles.card}>
        <AnimatedInputLabel
          label="გადამრტყმელი"
          value={userName}
          onChangeText={value => changeTextHanlder(value)}
        />
        <AnimatedInputLabel
          label="პაროლი"
          value={password}
          onChangeText={value => changeTextHanlder(value, 'password')}
          secureTextEntry={true}
          containerStyle={{ marginTop: 25 }}
        />
        <View style={styles.actionsContainer}>
          <ActionButton
            loading={loading}
            onPress={authHandler}
            title={submitButtonTitle}
            style={styles.actionBtn}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    marginTop: 40 ,
    paddingTop : 20
  },
  imgContainer :{
    marginBottom: 50
  },
  wrapper: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 25,
    fontSize: 20,
    color: Colors.primary,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  input: {
    marginBottom: 20,
  },
  actionBtn: {
    backgroundColor: Colors.primary,
  },
  image: {
    width: 155,
    height: 126,
  },
});

export default Auth;
