import React from "react";
import { StatusBar } from "react-native";
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthProvider } from "./src/context/AuthContext";
import { BookingProvider } from "./src/context/BookingContext";
import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import BookingScreen from "./src/screens/BookingScreen";
import ScheduleScreen from "./src/screens/ScheduleScreen";

const Stack = createNativeStackNavigator();
export const navigationRef = createNavigationContainerRef();

export default function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <NavigationContainer ref={navigationRef}>
          <StatusBar barStyle="dark-content" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Booking" component={BookingScreen} />
            <Stack.Screen name="Schedule" component={ScheduleScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </BookingProvider>
    </AuthProvider>
  );
}
