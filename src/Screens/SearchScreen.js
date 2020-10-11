import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  ActivityIndicator, 
  Keyboard,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {Header} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import SignUpScreen from './SignUpScreen';
// https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=songs&type=video&key=AIzaSyB3S9SVUAGWi4UVyg0AzqMorPHswwCT_6U

const SearchScreen = () => {
  const navigation = useNavigation();
  const currentUser = auth().currentUser;

  const Minicard = (props) => {
    return (
      <TouchableOpacity
        onPress={() => {
          //console.log(props);
          navigation.navigate('VideoPlayer', {
            videoId: props.videoId,
            title: props.title,
            snippet: props.snippet,
          });
        }}>
        <View style={{flexDirection: 'row', margin: 10}}>
          <Image
            source={{
              uri: `${props.img_url}`,
            }}
            style={{width: '45%', height: 100}}
          />
          <View style={{paddingLeft: 10}}>
            <Text
              style={[
                styles.text_title,
                {width: Dimensions.get('screen').width / 2},
              ]}
              ellipsizeMode="tail"
              numberOfLines={3}>
              {props.title}
            </Text>
            <Text style={{fontSize: 15}}>{props.channel}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const Searching = () => {
    const [miniCardData, setminiCardData] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [value, setValue] = useState('');

    const fetchData = () => {
      setisLoading(true);
      fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${value}&type=video&key=AIzaSyB3S9SVUAGWi4UVyg0AzqMorPHswwCT_6U`,
      )
        .then((res) => res.json())
        .then((data) => {
          setminiCardData(data.items);
          setisLoading(false);
        });
    };
    return (
      <View style={styles.search_view}>
        <View
          style={{
            padding: 5,
            flexDirection: 'row',
            justifyContent: 'space-around',
            elevation: 10,
            backgroundColor: 'white',
          }}>
          <Ionicons
            name="md-arrow-back"
            size={36}
            color="#212121"
            onPress={() => {
              setValue('');
             // updateInfo();
            }}
          />
          <TextInput
            onChangeText={(text) => {
              setValue(text);
            }}
            style={styles.search_input}
            value={value}
            placeholder="Search videos here"
          />
          <Ionicons
            onPress={() => {
              fetchData();
              Keyboard.dismiss();
            }}
            name="md-send"
            size={36}
            color="#212121"
          />
        </View>
        <View>
          {isLoading ? (
            <ActivityIndicator size="large" color="red" />
          ) : (
            <FlatList
              data={miniCardData}
              renderItem={({item}) => {
                //console.log(miniCardData);
                return (
                  <Minicard
                    videoId={item.id.videoId}
                    title={item.snippet.title}
                    channel={item.snippet.channelTitle}
                    img_url={item.snippet.thumbnails.high.url}
                    snippet={item.snippet}
                  />
                );
              }}
            />
          )}
        </View>
      </View>
    );
  };

  const [isSearching, setisSearching] = useState(true);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="light-content" />
      {isSearching ? <Searching /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  header: {
    height: 40,
    backgroundColor: 'white',
    marginTop: 0,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text_header: {
    color: '#212121',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 3,
  },
  image_style: {
    width: '100%',
    height: 200,
  },
  text_title: {
    color: 'black',
    fontSize: 20,
  },
  search_view: {
    color: '#fff',
    flex: 1,
  },
  search_input: {
    width: '80%',
    backgroundColor: '#e6e6e6',
    height: 18,
    fontSize: 15,
  },
});

export default SearchScreen;
