import { StyleSheet, Text, View, ActivityIndicator,Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Loading = ({message}:any) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require('../assets/images/Bicep_Exercise.gif')} />
      {/* <ActivityIndicator size="large" color="#F97316" /> */}
      <Text style={styles.text}>{message}</Text>
    </SafeAreaView>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex          : 1,
    justifyContent: 'center',
    alignItems    : 'center',
    backgroundColor: "#ffffff"
  },
  image:{
    height    : 200,
    width     : 200,
    resizeMode: 'contain',
    marginRight: 35
  },
  text:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F97316',
  }
});
