import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  Platform,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from './Authentication/AuthProvider';

const SignInScreen = ({navigation}) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    secureTextEntry: true,
    text_changed: false,
    isValidUser: true,
    isValidpass: true,
  });
  /*
  const [email_1, setEmail1] = useState('');
  const [password_1, setPassword1] = useState('');

  const userCredentials = async () => {
    setEmail1(await AsyncStorage.getItem('email_key'));
    setPassword1(await AsyncStorage.getItem('pass_key'));

    // console.log(email_1);
    // console.log(password_1);
  };

  userCredentials();

  // const {signIn} = useContext(AuthContext);
  */
  const {login} = useContext(AuthContext);
  const textInputChange = (val) => {
    if (val.length != 0) {
      setData({
        ...data,
        text_changed: true,
        email: val,
      });
    } else {
      setData({
        ...data,
        text_changed: false,
        email: val,
      });
    }
  };

  const finalEmailChange = (val) => {
    setData({
      ...data,
      email: val,
    });
  };

  const handlePassword = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const loginHandle = (username, password) => {
    if (username === '' || password === '') {
      Alert.alert(
        'Empty Field!!',
        'Either username or password field is left empty',
      );
    } else {
      login(username, password);
    }
  };

  const handleValidUser = (val) => {
    if (val.trim() === '') {
      setData({...data, isValidUser: false});
    } else {
      setData({...data, isValidUser: true});
    }
  };

  const handleValidPass = (val) => {
    if (val.trim() === '') {
      setData({...data, isValidpass: false});
    } else {
      setData({...data, isValidpass: true});
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#A9EF0A" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!!!</Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Enter Your Email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            value={data.email}
            onEndEditing={(e) => {
              handleValidUser(e.nativeEvent.text);
              finalEmailChange(e.nativeEvent.text);
            }}
          />
          {data.text_changed ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Email field is empty</Text>
          </Animatable.View>
        )}
        <Text style={styles.text_footer}>Password</Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Enter Your Password"
            style={styles.textInput}
            autoCapitalize="none"
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={(val) => handlePassword(val)}
            onEndEditing={(e) => handleValidPass(e.nativeEvent.text)}
          />
          <TouchableOpacity onPress={() => updateSecureTextEntry()}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidpass ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password field is empty</Text>
          </Animatable.View>
        )}
        <View style={[styles.button, {alignItems: 'stretch'}]}>
          <TouchableOpacity
            onPress={() => {
              loginHandle(data.email, data.password);
            }}>
            <LinearGradient
              colors={['#A9EF0A', '#DAEF0A']}
              style={styles.signIn}>
              <Text style={[styles.textSign, {color: '#fff'}]}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <Text style={styles.text_footer}>New Here ?</Text>
          <TouchableOpacity
            style={[
              styles.signIn,
              {
                borderColor: '#A9EF0A',
                borderWidth: 2,
                marginTop: 15,
                justifyContent: 'space-evenly',
              },
            ]}
            onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={[styles.textSign, {color: '#A9EF0A'}]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A9EF0A',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
    backgroundColor: '#fff',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  tt: {
    flexDirection: 'row',
    flex: 1,
  },
});

export default SignInScreen;
