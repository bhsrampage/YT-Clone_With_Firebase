import React from 'react';
import {View, Button, Text, StyleSheet, StatusBar} from 'react-native';

const FavouritesScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="purple" barStyle="light-content" />
      <Text>This is Favourites Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavouritesScreen;
