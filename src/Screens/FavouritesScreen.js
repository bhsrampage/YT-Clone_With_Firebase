import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';

const FavouritesScreen = () => {
  let favvid = [];
  const [favouriteVideos, setFavouriteVideos] = useState(null);
  const currentuser = auth().currentUser;
  const [docId, setDocId] = useState('');
  const navigation = useNavigation();
  //const isFocussed = useIsFocused();

  const getDocId = async () => {
    try {
      setDocId(await AsyncStorage.getItem('Doc_Id'));
    } catch (Exception) {
      console.log(Exception);
    }
  };
  getDocId();

  const Card = (props) => {
    return(
      <TouchableOpacity
      onPress={() => {
        //console.log(props);
        navigation.navigate('VideoPlayer', {
          videoId: props.videoId,
          title: props.title,
          snippet: props.snippet,
        });
      }}
      >
      <View style={{elevation:10 , marginBottom:15 }}>
        <Image source = {{uri:`${props.img_url}`}}
         style={{width:'100%', height:200}}
        />
        <View style={{flexDirection:'row' , margin:10}}>
          <MaterialIcons name='account-circle' size={36} color='#212121'/>
          <View style={{marginLeft:10}} >
          <Text 
          style ={{fontSize:20 , width:Dimensions.get("screen").width - 60}}
          ellipsizeMode='tail'
          numberOfLines={1}>{props.title}</Text>
          <Text>{props.channel}</Text>
          </View>
          
        </View>
      </View>
      </TouchableOpacity>
    );
  }
  

  // const userRef = firestore()
    //              .collection('Users')
      //            .doc(docId);
  /*
  const populateList = () => {
    favvid = [];
    if (favouriteVideos != null) {
      var ptr = favouriteVideos;
      console.log(ptr);
    }
  };
  useEffect(() => {
    favvid = [];
    userRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const {Fav} = doc.data();
        let favobj = JSON.parse(Fav);
        setFavouriteVideos(favobj);
      });
    });
  }, []),

  {
    isFocussed ? populateList() , :null
  }
*/

  const LoadVideos = (userId) => {
    useEffect(() => {
      
          const subscriber = firestore()
          .collection('Users')
          .doc(userId)
          .onSnapshot((documentSnapshot) => {
            
            try{
              const {Fav} = documentSnapshot.data();
              let favObj = JSON.parse(Fav);
              setFavouriteVideos(favObj);
              listing();
            }catch(Exception){
              console.log(Exception);
            }
              
            }
            
          );
      
        // Stop listening for updates when no longer required
        return () => subscriber();
        }

       
    , [userId]);
  };

  LoadVideos(docId);

  const listing = () => {
    var ptr = favouriteVideos;
    if (favouriteVideos != null) {
      favvid = [];
      for (var i in ptr) {
        favvid.push(ptr[i]);
      }
      //console.log(favvid);
    }
  };

  listing();
  if (typeof favvid[0] === 'undefined') {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="purple" barStyle="light-content" />
        <View>
          <Text>Currently there are no Favourites:(</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <StatusBar backgroundColor="purple" barStyle="light-content" />
        <ScrollView>
        <View>
         <FlatList
          data={favvid}
          renderItem={({item}) => {
            console.log(item);
            return(
              <Card
              videoId={item.id.videoId}
              title={item.snippet.title}
              channel={item.snippet.channelTitle}
              img_url={item.snippet.thumbnails.high.url}
              snippet={item.snippet}
              />
            );
          }}
         />
        </View>
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default FavouritesScreen;
