// src/components/LecturerDashboard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

const LecturerDashboard = () => {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Lecturer Dashboard" />
      </Appbar.Header>
      <Text style={styles.text}>This is the Lecturer Dashboard.</Text>
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

export default LecturerDashboard;