import React, {useState} from 'react';
import {View, StyleSheet, Text, KeyboardAvoidingView} from 'react-native';
import {useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

import {login, signup} from '../../store/actions/user';
import Card from './UI/Card';
import Input from './UI/Input';
import ActionButton from './UI/ActionButton';
import Colors from '../Constants/Colors';

const Auth = props => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const authMethod = props.method;

  let pageTitle = 'Login Page';
  let submitButtonTitle = 'Login';

  if (authMethod === 'signup') {
    pageTitle = 'Signup Page';
    submitButtonTitle = 'Signup';
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
      <Card style={styles.card}>
        <Text style={styles.header}>{pageTitle}</Text>
        <Input
          value={userName}
          style={styles.input}
          label="Username"
          onChangeText={value => changeTextHanlder(value)}
        />
        <Input
          value={password}
          label="Password"
          onChangeText={value => changeTextHanlder(value, 'password')}
          secureTextEntry={true}
        />
        <View style={styles.actionsContainer}>
          <ActionButton
            loading={loading}
            onPress={authHandler}
            title={submitButtonTitle}
            style={styles.actionBtn}
          />
        </View>
      </Card>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFCD9C',
    height: '100%',
    justifyContent: 'center',
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
    justifyContent: 'space-between',
    marginTop: 20,
  },
  input: {
    marginBottom: 20,
  },
  actionBtn: {
    backgroundColor: Colors.primary
  }
});

export default Auth;