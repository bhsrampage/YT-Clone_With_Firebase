import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {ToastAndroid, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator } from 'react-native-paper';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [users, setUsers] = useState(null);
  const curentUser = auth().currentUser;
  //const [isLoading , setIsLoading] = useState(true);
  return (
    <AuthContext.Provider
      value={{
        users,
        setUsers,
        login: async (email, password) => {
          try {
            await auth()
              .signInWithEmailAndPassword(email, password)
              .then(() => {
                ToastAndroid.show(`Signed in as ${email}`, ToastAndroid.SHORT);
              })
              .catch((error) => {
                console.log(error.code);
                if (error.code === 'auth/invalid-email') {
                  Alert.alert(
                    'Invalid User!',
                    'Either username or password is incorrect or Signup if you are new',
                  );
                } else if (error.code === 'auth/wrong-password') {
                  Alert.alert(
                    'Incorrect Password!',
                    'The password entered was incorrect Check and try again',
                  );
                }
              });
          } catch (Exception) {
            console.log(Exception);
          }
        },

        register: async (email, password) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                //setIsLoading(false);
                ToastAndroid.show(
                  'User Profile Created Succesfully:)',
                  ToastAndroid.SHORT,
                );
              })
              .catch((error) =>
                Alert.alert(
                  'User already Exists',
                  'The email you entered has already been taken',
                ),
              );
          } catch (Exception) {
            console.log(Exception);
          }
        },

        logout: async () => {
          try {
            await auth().signOut();
            //AsyncStorage.clear();
          } catch (Exception) {
            console.log(Exception);
          }
        },

        delete1 : async() => {
          try{
             await curentUser.delete().then(
               () =>{
                ToastAndroid.show(
                  'User Deleted Successfully',
                  ToastAndroid.SHORT,
                );
               }
             )
          }catch(Exception){
            console.log(Exception);
          }
        }
      }}>
      {children}
    </AuthContext.Provider>
  );
};
