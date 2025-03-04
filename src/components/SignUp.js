// src/components/SignUp.js
import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Appbar, TextInput, Button, Text, Snackbar, RadioButton } from 'react-native-paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDismissSnackBar = () => setVisible(false);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user type in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        userType: userType,
      });

      // Navigate to the Login screen after successful sign-up
      navigation.navigate('Login');
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
        <Appbar.Content title="Sign Up" />
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
      <Text>User Type:</Text>
      <RadioButton.Group onValueChange={setUserType} value={userType}>
        <View style={styles.radioContainer}>
          <RadioButton value="student" />
          <Text>Student</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton value="lecturer" />
          <Text>Lecturer</Text>
        </View>
      </RadioButton.Group>
      <Button mode="contained" onPress={handleSignUp} style={styles.button} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : 'Sign Up'}
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
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SignUp;