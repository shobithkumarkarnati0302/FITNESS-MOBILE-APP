import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


const Error = ({message,navigation}) => {
  return (
    <SafeAreaView style = {styles.safe}>
      <Text style = {styles.text}>{message?.message || String(message)}</Text>
      <TouchableOpacity style = {styles.btn} onPress={() => navigation.goBack()}>
        <Text style = {styles.btnText}>Go Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Error

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F97316',
  },
  btn: {
    backgroundColor: '#F97316',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 15,
  },
});