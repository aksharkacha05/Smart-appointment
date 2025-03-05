import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Appbar, TextInput, Button, Text, Snackbar, RadioButton } from 'react-native-paper';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the path as needed
import DatePicker from 'react-native-date-picker';

const AppointmentBooking = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [userType, setUserType] = useState('student'); // Default to student
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onDismissSnackBar = () => setVisible(false);

  const handleBooking = async () => {
    setLoading(true);
    try {
      const appointmentData = {
        date: date.toISOString(),
        time: time.toISOString(),
        userType,
        description,
      };

      // Store appointment data in Firestore
      await setDoc(doc(db, 'appointment_data', `${userType}_${date.getTime()}`), appointmentData);

      // Navigate to a confirmation screen or dashboard
      navigation.navigate('Student Dashboard'); // Change as needed
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
        <Appbar.Content title="Book Appointment" />
      </Appbar.Header>
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
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
      <Button mode="outlined" onPress={() => setShowDatePicker(true)} style={styles.button}>
        {`Select Date: ${date.toLocaleDateString()}`}
      </Button>
      <DatePicker
        modal
        open={showDatePicker}
        date={date}
        onConfirm={(date) => {
          setShowDatePicker(false);
          setDate(date);
        }}
        onCancel={() => {
          setShowDatePicker(false);
        }}
      />
      <Button mode="outlined" onPress={() => setShowTimePicker(true)} style={styles.button}>
        {`Select Time: ${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
      </Button>
      <DatePicker
        modal
        open={showTimePicker}
        date={time}
        mode="time"
        onConfirm={(time) => {
          setShowTimePicker(false);
          setTime(time);
        }}
        onCancel={() => {
          setShowTimePicker(false);
        }}
      />
      <Button mode="contained" onPress={handleBooking} style={styles.button} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : 'Book Appointment'}
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

export default AppointmentBooking;
