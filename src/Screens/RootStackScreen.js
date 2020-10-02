import React, {useContext, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import MainTabScreen from './MainTabScreen';
import {AuthContext} from './Authentication/AuthProvider';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator headerMode="none" initialRouteName="SignInScreen">
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    <RootStack.Screen name="MainTabScreen" component={MainTabScreen} />
  </RootStack.Navigator>
);

export default RootStackScreen;
