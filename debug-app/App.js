import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.chatContainer}>
          <Text style={{padding: 20}}>Open up App.js to start working on your app!</Text>
          <Text style={{padding: 20}}>Open up App.js to start working on your app!</Text>
          <Text style={{padding: 20}}>Open up App.js to start working on your app!</Text>
          <Text style={{padding: 20}}>Open up App.js to start working on your app!</Text>
          <Text style={{padding: 20}}>Open up App.js to start working on your app!</Text>
          <Text style={{padding: 20}}>Open up App.js to start working on your app!</Text>
          <Text style={{padding: 20}}>Open up App.js to start working on your app!</Text>
          <Text style={{padding: 20}}>Open up App.js to start working on your app!</Text>
          <Text style={{padding: 20}}>Open up App.js to start working on your app!</Text>
          <Text style={{padding: 20}}>Open up App.js to start working on your app!</Text>
          <Text style={{padding: 20}}>Open up App.js to start working on your app!</Text>
          <Text style={{padding: 20}}>Open up App.js to start working on your app!</Text>
          <Text style={{padding: 20}}>Open up App.js to start working on your app!</Text>
          <Text style={{padding: 20}}>Open up App.js to start working on your app!</Text>
          <Text style={{padding: 20}}>Open up App.js to start working on your app!</Text>
          <Text style={{padding: 20}}>Open up App.js to start working on your app!</Text>
          <Text style={{padding: 20}}>Open up App.js to start working on your app!</Text>
          <Text style={{padding: 20}}>Open up App.js to start working on your app!</Text>
          <Text style={{padding: 20}}>Open up App.js to start working on your app!</Text>
          <Text style={{padding: 20}}>Open up App.js to start working on your app!</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatContainer: {
    flex: 1,
    // justifyContent: 'flex-end',
    padding: 10
},
});
