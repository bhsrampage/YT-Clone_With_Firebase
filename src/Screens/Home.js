import React, {useState} from 'react';
import {
  Stylesheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from 'react-native';

const Card = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log(props);
        navigation.navigate('VideoPlayer', {
          videoId: props.videoId,
          title: props.title,
        });
      }}>
      <View style={{marginBottom: 10}}>
        <Image
          source={{
            uri: `${props.img_url}`,
          }}
          style={styles.image_style}
        />
        <View style={{flexDirection: 'row', margin: 5}}>
          <MaterialIcons name="account-circle" size={36} color="#212121" />
          <View style={{marginLeft: 10, width: '80%'}}>
            <Text
              style={styles.text_title}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {props.title}
            </Text>
            <Text>{props.channel}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={{flexDirection: 'row'}}>
        <AntDesign name="youtube" size={36} color="red" />

        <Text style={styles.text_header}>Youtube</Text>
      </View>
      <View style={{marginRight: 0}}>
        <Ionicons
          name="md-search"
          size={36}
          color="#212121"
          onPress={() => setisSearching(true)}
        />
      </View>
    </View>
  );
};

const Home = () => {
  const [cardData, setcardData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const fetchData = () => {
    setisLoading(true);
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${value1}&type=video&key=AIzaSyB3S9SVUAGWi4UVyg0AzqMorPHswwCT_6U`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setcardData(data.items);
        setisLoading(false);
      });
  };
  //fetchData();
  return (
    <View style={styles.search_view}>
      <View>
        <Header />
        <View>
          {isLoading ? (
            <ActivityIndicator size="large" color="red" />
          ) : (
            <FlatList
              data={cardData}
              renderItem={({item}) => {
                return (
                  <Card
                    videoId={item.id.videoId}
                    title={item.snippet.title}
                    channel={item.snippet.channelTitle}
                    img_url={item.snippet.thumbnails.high.url}
                  />
                );
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};
