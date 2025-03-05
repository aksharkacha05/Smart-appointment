// App.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import HomePage from './src/components/HomePage'; // Import the HomePage component
import StudentDashboard from './src/components/StudentDashboard';
import LecturerDashboard from './src/components/LecturerDashboard';
import About from './src/components/About';
import Login from './src/components/Login'; // Import the Login component
import SignUp from './src/components/SignUp'; // Import the SignUp component
import AppointmentBooking from './src/components/AppointmentBooking'; // Import the AppointmentBooking component
import SplashScreen from './src/components/SplashScreen'; // Import the SplashScreen component

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black', // Your primary color
    accent: '#ccc', // Your accent color
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Sign Up" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Appointment Booking" component={AppointmentBooking} />
          <Stack.Screen name="Student Dashboard" component={StudentDashboard} />
          <Stack.Screen name="Lecturer Dashboard" component={LecturerDashboard} />
          <Stack.Screen name="About" component={About} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;