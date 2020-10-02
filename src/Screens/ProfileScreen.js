import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Button, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from './Authentication/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ProfileScreen = () => {
  const currentUser = auth().currentUser;
  const userRef = firestore()
    .collection('Users')
    .where('Email', '==', currentUser.email);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [used, setUsed] = useState(false);

  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
    dateOfBirth: '',
    gender: 'Male',
    imgsrc: '',
  });
  const {logout} = useContext(AuthContext);

  useEffect(() => {
    userRef.get().then((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const {Name, Password, DOB, Gender, ImgSource, Email} = doc.data();
        list.push({
          Name,
          Password,
          DOB,
          Gender,
          ImgSource,
          Email,
        });
      });
      setUsers(list);
    });

    if (loading) {
      setLoading(false);
    }
  }, []);
  {
    used
      ? null
      : users.map((user, index) => {
          console.log(user.Name);
          setUsed(true);
          setData({
            ...data,
            email: user.Email,
            password: user.Password,
            name: user.Name,
            dateOfBirth: user.DOB,
            gender: user.Gender,
            imgsrc: user.ImgSource,
          });
        });
  }
  /* const loadUser = async () => {
    try {
      setData({
        ...data,
        email: await AsyncStorage.getItem('email_key'),
        password: await AsyncStorage.getItem('pass_key'),
        name: await AsyncStorage.getItem('name_key'),
        dateOfBirth: await AsyncStorage.getItem('dob_key'),
        gender: await AsyncStorage.getItem('gender_key'),
        imgsrc: await AsyncStorage.getItem('profile_key'),
      });
    } catch (e) {
      console.log(e);
    }
  };*/

  return (
    <ScrollView indicatorStyle="white">
      <View style={styles.container}>
        <StatusBar backgroundColor="#009387" barStyle="light-content" />
        <View>
          <View style={styles.section}>
            <Image
              source={{uri: data.imgsrc}}
              style={{
                height: 150,
                width: 150,
                borderRadius: 150 / 2,
                marginTop: 25,
              }}
            />
          </View>
          <View style={styles.section}>
            <Icon name="ios-person" size={26} style={{paddingTop: 30}} />
            <Text style={styles.type}>Name: </Text>
            <Text style={styles.value}>{data.name}</Text>
          </View>
          <View style={styles.section}>
            <Icon
              name="mail-open-sharp"
              size={26}
              style={{paddingTop: 30, paddingLeft: 30}}
            />
            <Text style={[styles.type, {paddingLeft: 35}]}>Email-Id: </Text>
            <Text style={styles.value}>{data.email}</Text>
          </View>
          <View style={styles.section}>
            <Icon
              name="calendar"
              size={26}
              style={{paddingTop: 30, paddingLeft: 35}}
            />
            <Text style={styles.type}>Date Of Birth: </Text>
            <Text style={styles.value}>{data.dateOfBirth}</Text>
          </View>
          <View style={styles.section}>
            {data.gender == 'Male' ? (
              <Icon name="man-sharp" size={26} style={{paddingTop: 30}} />
            ) : (
              <Icon name="woman-sharp" size={26} style={{paddingTop: 30}} />
            )}
            <Text style={styles.type}>Gender: </Text>
            <Text style={styles.value}>{data.gender}</Text>
          </View>
          <View style={styles.section}>
            <Icon name="key-sharp" size={26} style={{paddingTop: 30}} />
            <Text style={styles.type}>Password: </Text>
            <Text style={styles.value}>{data.password}</Text>
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            style={[
              styles.signOut,
              {
                borderColor: 'black',
                borderWidth: 2,
                marginTop: 15,
                justifyContent: 'space-evenly',
              },
            ]}
            onPress={() => logout()}>
            <Text style={styles.textSign}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_header: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 10,
    flex: 1,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  type: {
    padding: 30,
    paddingLeft: 10,
    alignItems: 'flex-start',
    fontSize: 20,
    color: 'black',
    textDecorationLine: 'underline',
    flexDirection: 'row',
  },
  value: {
    padding: 30,
    paddingLeft: 5,
    paddingRight: 35,
    fontSize: 20,
    color: 'black',
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  signOut: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default ProfileScreen;
