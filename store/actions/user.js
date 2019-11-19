import AsyncStorage from '@react-native-community/async-storage';

import env from '../../env';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_SIGNUP = 'USER_SIGNUP';
export const USER_LOGOUT = 'USER_LOGOUT';

export const login = user => {
  return async dispatch => {
    try {
      let res = await fetch(env.usersUrl + '/login', {
        method: 'POST',
        body: JSON.stringify({user}),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (res.status >= 400) {
        throw new Error(data.error);
      } else {
        await AsyncStorage.setItem('username', user.userName);
        await AsyncStorage.setItem('password', user.password);
        return dispatch({type: USER_LOGIN, user: data});
      }
    } catch (error) {
      throw error;
    }
  };
};

export const signup = user => {
  return async dispatch => {
    try {
      let response = await fetch(env.usersUrl + '/register', {
        method: 'POST',
        body: JSON.stringify({user}),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.status >= 400) {
        throw new Error(data.error);
      } else {
        await AsyncStorage.setItem('username', user.userName);
        await AsyncStorage.setItem('password', user.password);
        return dispatch({type: USER_LOGIN, user: data});
      }
    } catch (error) {
      throw error;
    }
  };
};

export const logout = () => {
  AsyncStorage.removeItem('password');
  return {type: USER_LOGOUT};
};
