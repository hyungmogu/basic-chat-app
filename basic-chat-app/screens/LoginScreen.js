import React from 'react';
import { StyleSheet, Text, View,  } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function App() {
  return (
    <View style={styles.container}>
        <Text style={styles.logo}>Basic&nbsp; Chat App</Text>
        <TextInput style={styles.loginInput} placeholder={'Username'} placeholderTextColor="white"></TextInput>
        <TextInput style={styles.loginInput} secureTextEntry={true} placeholder={'Password'} placeholderTextColor="white"></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 250,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  loginInput: {
      borderRadius: 10,
      borderWidth: 1,
      backgroundColor: '#D6D6D6',
      borderColor: '#E2E2E2',
      padding: 15,
      width: 350,
      marginBottom: 5
  }
});
