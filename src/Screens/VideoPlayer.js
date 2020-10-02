import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, Platform, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {WebView} from 'react-native-webview';

const VideoPlayer = ({route}) => {
  const {videoId} = route.params;
  const {title} = route.params;
  const navigation = useNavigation();

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
