// src/components/StudentDashboard.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, List, Text } from 'react-native-paper';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const StudentDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const querySnapshot = await getDocs(collection(db, 'appointment_data'));
      const appointmentsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppointments(appointmentsData);
    };

    fetchAppointments();
  }, []);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Student Dashboard" />
      </Appbar.Header>
      {appointments.length > 0 ? (
        appointments.map(appointment => (
          <List.Item
            key={appointment.id}
            title={appointment.teacher}
            description={`${appointment.date} - ${appointment.time} (${appointment.status})`}
          />
        ))
      ) : (
        <Text>No appointments available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default StudentDashboard;