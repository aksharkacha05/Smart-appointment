// src/components/SignUp.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, TextInput, Button, Text, Snackbar, RadioButton } from 'react-native-paper';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Adjust the path as needed

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student'); // Default to student
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  const onDismissSnackBar = () => setVisible(false);

  const handleSignUp = async () => {
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
        onChangeText={text => setEmail(text)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
        secureTextEntry
        mode="outlined"
      />
      <Text>User Type:</Text>
      <RadioButton.Group onValueChange={value => setUserType(value)} value={userType}>
        <View style={styles.radioContainer}>
          <RadioButton value="student" />
          <Text>Student</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton value="lecturer" />
          <Text>Lecturer</Text>
        </View>
      </RadioButton.Group>
      <Button mode="contained" onPress={handleSignUp} style={styles.button}>
        Sign Up
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