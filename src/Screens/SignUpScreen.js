import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  Platform,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput} from 'react-native-paper';
import {RadioButton} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {AuthContext} from './Authentication/AuthProvider';
import AsyncStorage from '@react-native-community/async-storage';
import MainTabScreen from './MainTabScreen';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';

const SignUpScreen = ({navigation}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [imgsrc, setImgSrc] = useState(null);
  const {register, logout} = useContext(AuthContext);
  const userRef = firestore().collection('Users');

  const [data, setData] = useState({
    email: '',
    password: '',
    confirm_pass: '',
    name: '',
    dateOfBirthPicker: '',
    gender: 'Male',
    secureTextEntry: true,
    confirmSecureTextEntry: true,
    text_changed: false,
    name_changed: false,
  });

  const name_key = 'name_key';
  const email_key = 'email_key';
  const dob_key = 'dob_key';
  const gender_key = 'gender_key';
  const pass_key = 'pass_key';
  const profile_key = 'profile_key';

  const tofirebase = () => {
    userRef.add({
      Name: data.name,
      Email: data.email,
      DOB: data.dateOfBirthPicker,
      Gender: data.gender,
      Password: data.password,
      ImgSource: imgsrc,
    });
  };

  const imagepicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setImgSrc(image.path);
    });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setData({
      ...data,
      dateOfBirthPicker: JSON.stringify(date).slice(1, 11),
    });
    hideDatePicker();
  };

  const dateInputChange = (val) => {
    setData({
      ...data,
      dateOfBirthPicker: val,
    });
  };

  const emailInputChange = (val) => {
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

  const finalNameChange = (val) => {
    setData({
      ...data,
      name: val,
    });
  };

  const finalEmailChange = (val) => {
    setData({
      ...data,
      email: val,
    });
  };

  const nameInputChange = (val) => {
    if (val === 0) {
      setData({
        ...data,
        name_changed: true,
        name: val,
      });
    } else {
      setData({
        ...data,
        name_changed: false,
        name: val,
      });
    }
  };

  const handlePassword = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const handleConfirmPasword = (val) => {
    setData({
      ...data,
      confirm_pass: val,
    });
  };

  const handleGender = (val) => {
    setData({
      ...data,
      gender: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirmSecureTextEntry: !data.confirmSecureTextEntry,
    });
  };

  const createProfile = async () => {
    if (
      data.name === '' ||
      data.password === '' ||
      data.email === '' ||
      data.dateOfBirthPicker === '' ||
      data.gender === ''
    ) {
      Alert.alert('Incomplete Fields', 'Please fill all the details', [
        {text: 'Okay'},
      ]);
      console.log(data.name);
      console.log(data.password);
      console.log(data.email);
      console.log(data.dateOfBirthPicker);
      console.log(data.gender);
    } else {
      /* try {
        await AsyncStorage.setItem(name_key, data.name);
        await AsyncStorage.setItem(email_key, data.email);
        await AsyncStorage.setItem(pass_key, data.password);
        await AsyncStorage.setItem(dob_key, data.dateOfBirthPicker);
        await AsyncStorage.setItem(gender_key, data.gender);
        await AsyncStorage.setItem(profile_key, imgsrc);
      } catch (error) {
        console.log(error);
      }*/
      tofirebase();
      register(data.email, data.password);
    }
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <StatusBar backgroundColor="#A9EF0A" barStyle="light-content" />
          <View style={styles.header}>
            <Text style={styles.text_header}>Sign Up Now !</Text>
          </View>
          <Animatable.View style={styles.footer} animation="fadeInUpBig">
            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Enter Your Email"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => emailInputChange(val)}
                onEndEditing={(e) => finalEmailChange(e.nativeEvent.text)}
              />
              {data.text_changed ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null}
            </View>

            <Text style={styles.text_footer}>Name</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Enter Your Full-Name"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => nameInputChange(val)}
                onEndEditing={(e) => finalNameChange(e.nativeEvent.text)}
              />
              {data.name_changed ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null}
            </View>
            <Text style={styles.text_footer}>Profile Photo</Text>
            <View style={{margin: 15}}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{fontSize: 16, marginRight: 100}}>
                {imgsrc}
              </Text>
              <View style={{paddingRight: 15}}>
                <Button
                  title="Choose Photo"
                  onPress={() => {
                    imagepicker();
                    console.log(imgsrc);
                  }}
                />
              </View>
            </View>
            <Text style={styles.text_footer}>Gender</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <RadioButton.Group
                onValueChange={(value) => handleGender(value)}
                value={data.gender}>
                <View>
                  <Text>Male</Text>
                  <RadioButton value="Male" />
                </View>
                <View>
                  <Text>Female</Text>
                  <RadioButton value="Female" />
                </View>
                <View>
                  <Text>Other</Text>
                  <RadioButton value="Other" />
                </View>
              </RadioButton.Group>
            </View>

            <Text style={styles.text_footer}>Date of Birth</Text>
            <View style={styles.action}>
              <TouchableOpacity onPress={showDatePicker}>
                <Feather name="calendar" size={20} color="blue" />
              </TouchableOpacity>
              <TextInput
                placeholder="YYYY-MM-DD"
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType={'number-pad'}
                value={data.dateOfBirthPicker}
                onEndEditing={(e) => dateInputChange(e.nativeEvent.text)}
                onChangeText={(val) => dateInputChange(val)}
              />
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />

            <Text style={styles.text_footer}>Password</Text>
            <View style={styles.action}>
              <FontAwesome name="lock" color="#05375a" size={20} />
              <TextInput
                placeholder="Enter Your Password"
                style={styles.textInput}
                autoCapitalize="none"
                secureTextEntry={data.secureTextEntry ? true : false}
                onChangeText={(val) => handlePassword(val)}
              />
              <TouchableOpacity onPress={() => updateSecureTextEntry()}>
                {data.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.text_footer}>Confirm Password</Text>
            <View style={styles.action}>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                secureTextEntry={data.confirmSecureTextEntry ? true : false}
                onChangeText={(val) => handleConfirmPasword(val)}
              />
              <TouchableOpacity onPress={() => updateConfirmSecureTextEntry()}>
                {data.confirmSecureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => createProfile()}
                style={styles.signIn}>
                <LinearGradient
                  colors={['#A9EF0A', '#DAEF0A']}
                  style={styles.signIn}>
                  <Text style={[styles.textSign, {color: '#fff'}]}>
                    Register
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
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
    paddingBottom: 40,
  },
  footer: {
    flex: 5,
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
    fontSize: 16,
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
    flex: 0.75,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
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
});

export default SignUpScreen;
