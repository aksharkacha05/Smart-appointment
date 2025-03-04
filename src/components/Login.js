// src/components/Login.js
import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Appbar, TextInput, Button, Text, Snackbar } from 'react-native-paper';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Adjust the path as needed

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDismissSnackBar = () => setVisible(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Retrieve user type from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        // Navigate to the appropriate dashboard based on user type
        if (userData.userType === 'lecturer') {
          navigation.navigate('Lecturer Dashboard');
        } else {
          navigation.navigate('Student Dashboard');
        }
      }
    } catch (error) {
      setError(error.message);
      setVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Login" />
      </Appbar.Header>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        mode="outlined"
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : 'Login'}
      </Button>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={3000}
      >
        {error}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default Login;