import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Appbar, Button, Text } from 'react-native-paper';

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      
      <View style={styles.content}>
        <Image
          source={require('../../assets/logo.png')} // Replace with your logo path
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome to Smart Appointment</Text>
        <Text style={styles.subtitle}>Your one-stop solution for booking appointments</Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Sign Up')}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Sign Up
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('Login')}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Login
        </Button>
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
    width: '80%',
  },
  buttonLabel: {
    color: 'orange',
  },
});

export default HomePage;
