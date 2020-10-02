import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from './SearchScreen';
import ProfileScreen from './ProfileScreen';
import FavouritesScreen from './FavouritesScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {StatusBar} from 'react-native';
import {View} from 'react-native-animatable';

const SearchStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const FavouriteStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Search"
      activeColor="#fff"
      shifting={true}
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          if (route.name === 'Search') {
            return <Ionicons name="ios-search" size={26} color={color} />;
          } else if (route.name === 'Favourites') {
            return <MaterialIcons name="favorite" size={26} color={color} />;
          }
        },
      })}>
      <Tab.Screen
        name="Search"
        component={SearchStackScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarColor: 'blue',
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouritesStackScreen}
        options={{
          tabBarLabel: 'Favourites',
          tabBarColor: 'purple',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#009387',
          tabBarIcon: ({color}) => (
            <FontAwesome name="user" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;

const SearchStackScreen = ({navigation}) => {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: 'blue'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
      }}>
      <SearchStack.Screen name="Search" component={SearchScreen} />
    </SearchStack.Navigator>
  );
};
const ProfileStackScreen = ({navigation}) => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#009387'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
      }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};
const FavouritesStackScreen = ({navigation}) => {
  return (
    <FavouriteStack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: 'purple'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
      }}>
      <FavouriteStack.Screen name="Favourites" component={FavouritesScreen} />
    </FavouriteStack.Navigator>
  );
};
