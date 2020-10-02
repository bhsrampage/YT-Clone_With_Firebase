import React, {useEffect, useMemo, useState, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ActivityIndicator,
  View,
  Text,
  StatusBar,
  Button,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import MainTabScreen from './src/Screens/MainTabScreen';
import RootStackScreen from './src/Screens/RootStackScreen';
import {
  AuthContext,
  AuthProvider,
} from './src/Screens/Authentication/AuthProvider'; //changed directory
import AsyncStorage from '@react-native-community/async-storage';
import VideoPlayer from './src/Screens/VideoPlayer';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  /*const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(
    () => ({
      signIn: async () => {
        setUserToken('burhan');
        setIsLoading(false);
        try {
          //console.log(userToken);
          await AsyncStorage.setItem('userToken', 'burhan');
        } catch (e) {
          console.log(e);
        }
      },
      signOut: async () => {
        setUserToken(null);
        setIsLoading(false);
        try {
          AsyncStorage.clear();
        } catch (e) {
          console.log(e);
        }
      },
      signUp: async () => {
        setUserToken('burhan');

        setIsLoading(false);
      },
    }),
    [],
  );

  useEffect(() => {
    console.disableYellowBox = true;
    setTimeout(async () => {
      setIsLoading(false);

      try {
        setUserToken(await AsyncStorage.getItem('userToken'));
      } catch (e) {
        console.log(e);
      }
    }, 1500);
  }, []);*/

  //const {user, setUser} = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    console.disableYellowBox = true;
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <AuthProvider>
      <NavigationContainer>
        {user != null ? (
          <Stack.Navigator headerMode="none" initialRouteName="MainTab">
            <Stack.Screen component={MainTabScreen} name="MainTab" />
            <Stack.Screen component={VideoPlayer} name="VideoPlayer" />
          </Stack.Navigator>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthProvider>
  );
};
export default App;
