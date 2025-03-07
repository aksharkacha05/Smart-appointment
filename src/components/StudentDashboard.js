// src/components/StudentDashboard.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Appbar, List, Text, Button, Card } from 'react-native-paper';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const StudentDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const navigation = useNavigation(); // Use navigation hook

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

  const renderAppointment = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.title}>Appointment with: {item.lecturer}</Text>
        <Text style={styles.description}>Date: {new Date(item.date).toLocaleDateString()}</Text>
        <Text style={styles.description}>Time: {new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        <Text style={styles.description}>Description: {item.description}</Text>
        <Text style={styles.status}>Status: {item.status}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Student Dashboard" />
      </Appbar.Header>
      <Button mode="contained" onPress={() => navigation.navigate('Book Appointment')}>
        Book Appointment
      </Button>
      <FlatList
        data={appointments}
        renderItem={renderAppointment}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text>No appointments available.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginVertical: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
  },
  list: {
    paddingBottom: 16,
  },
});

export default StudentDashboard;