import React from 'react';
import { StyleSheet, Text, View,  } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function App() {
  return (
    <View style={styles.container}>
        <Text style={styles.logo}>Basic{"\n"} Chat App</Text>
        <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder={'Username'} placeholderTextColor="white"></TextInput>
            <TextInput style={styles.input} secureTextEntry={true} placeholder={'Password'} placeholderTextColor="white"></TextInput>
        </View>
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
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30
  },
  input: {
      borderRadius: 10,
      borderWidth: 1,
      backgroundColor: '#D6D6D6',
      borderColor: '#E2E2E2',
      padding: 15,
      width: 350,
      marginBottom: 5
  }
});
