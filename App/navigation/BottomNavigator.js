import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import OrdersScreen from '../screens/OrdersScreen';
import HomeNavigator from './HomeNavigation';

const BottomNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: ({navigation}) => {
      return {
        tabBarIcon: () => {
          return <Icon name="home" size={20} color="red" />;
        },
      };
    },
  },
  Orders: {
    screen: OrdersScreen,
    navigationOptions: ({navigation}) => {
      return {
        tabBarIcon: () => {
          return <Icon name="shopping-cart" size={20} color="red" />;
        },
      };
    },
  },
});

export default BottomNavigator;
