import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Dimensions, Platform, StyleSheet, Text, View} from 'react-native';
import {Button, List} from 'react-native-paper';
import {WebView} from 'react-native-webview';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';

const VideoPlayer = ({route}) => {
  const {videoId} = route.params;
  const {title} = route.params;
  const {snippet} = route.params;
  const navigation = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);
  const [docId, setDocId] = useState('');
  const isFocussed = useIsFocused();

  const getDocId = async () => {
    try {
      setDocId(await AsyncStorage.getItem('Doc_Id'));
    } catch (Exception) {
      console.log(Exception);
    }
  };
  getDocId();

  let FavouriteVids = {};

  const userRef = firestore().collection('Users').doc(docId);

  const loadFavourites = () => {
    userRef.get().then((doc) => {
      if (doc.exists) {
        if (doc.data().Fav != null) {
          let fvidObj = JSON.parse(doc.data().Fav);
          FavouriteVids = fvidObj;
          if (typeof FavouriteVids[videoId] === 'undefined') {
            setIsFavourite(false);
          } else {
            setIsFavourite(true);
          }
        } else {
          console.log('Fail');
          FavouriteVids = {};
        }
      } else {
        console.log('No Such Document');
      }
    });
  };
  loadFavourites();
  //console.log(FavouriteVids);
  //console.log(typeof FavouriteVids[videoId]);

  const addFavourite = () => {
    setIsFavourite(true);
    FavouriteVids[videoId] = {};
    FavouriteVids[videoId]['id'] = {};
    FavouriteVids[videoId]['snippet'] = snippet;
    FavouriteVids[videoId]['id']['videoId'] = videoId;
    let favvid = JSON.stringify(FavouriteVids);
    //console.log(FavouriteVids);
    userRef.update({
      Fav: favvid,
    });
  };

  const removeFavourite = () => {
    setIsFavourite(false);
    delete FavouriteVids[videoId];
    let favvid = JSON.stringify(FavouriteVids);
    userRef.update({
      Fav: favvid,
    });
  };

  

  return (
    <View style={{flex: 1, marginTop: 5}}>
      <View style={{width: '100%', height: '50%'}}>
        <WebView
          source={{uri: `https://www.youtube.com/embed/${videoId}`}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsFullscreenVideo={true}
          scrolling={false}
          scalesPageToFit={Platform.OS === 'android'}
       />
       

      </View>
      <Text
        style={{
          fontSize: 20,
          width: Dimensions.get('screen').width - 50,
          margin: 9,
        }}
        ellipsizeMode="tail"
        numberOfLines={2}>
        {title}
      </Text>

      <View style={{borderBottomWidth: 1}} />
      <Animatable.View style={{alignItems: 'center', padding: 25}}>
        {isFavourite ? (
          <AntDesign
            name="heart"
            size={40}
            color="red"
            onPress={() => removeFavourite()}
          />
        ) : (
          <AntDesign
            name="hearto"
            size={40}
            color="red"
            onPress={() => addFavourite()}
          />
        )}
      </Animatable.View>
      <Button
        style={styles.button}
        onPress={() => navigation.navigate('MainTab')}>
        <Text style={{fontSize: 20}}> Go Back</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
});

export default VideoPlayer;
