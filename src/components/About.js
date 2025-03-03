// src/components/About.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

const About = () => {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="About" />
      </Appbar.Header>
      <Text style={styles.text}>This is the About page.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default About;