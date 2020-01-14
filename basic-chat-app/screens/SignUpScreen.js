import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class SignUpScreen extends Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>Basic{"\n"} Chat App</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder={'Name'} placeholderTextColor="black"></TextInput>
                    <TextInput style={styles.input} placeholder={'Email'} placeholderTextColor="black"></TextInput>
                    <TextInput style={styles.input} secureTextEntry={true} placeholder={'Password'} placeholderTextColor="black"></TextInput>
                    <TextInput style={styles.input} secureTextEntry={true} placeholder={'Password Confirm'} placeholderTextColor="black"></TextInput>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.buttonPrimary]}>
                        <Text>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={() => navigate('Login')}>
                        <Text>Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
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
      backgroundColor: '#E2E2E2',
      borderColor: '#E2E2E2',
      padding: 15,
      width: 350,
      marginBottom: 5
  },
  inputContainer: {
      marginBottom: 15
  },
  button: {
      padding: 15,
      borderRadius: 10,
      fontSize: 20,
      width: 350,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5
  },
  buttonPrimary: {
      backgroundColor: '#E2E2E2'
  },
  buttonSecondary: {
      backgroundColor: '#D6D6D6'
  }
});
