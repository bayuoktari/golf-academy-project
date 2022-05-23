import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './src/store';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/Student/HomeScreen';
import HomeCoach from './src/screens/Coach/Home';
import CheckInScreen from './src/screens/CheckIn';
import CheckOutScreen from './src/screens/CheckOut';
import StudentReport from './src/screens/Coach/StudentReport';
import AddReport from './src/screens/Coach/AddReport';
import MonthlyReport from './src/screens/MonthlyReport';
import Report from './src/screens/Report';
import PdfReport from './src/screens/Student/PdfReport';
import ChartReport from './src/screens/Student/ChartReport';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Home Coach" component={HomeCoach} />
          <Stack.Screen name="Monthly Report" component={MonthlyReport} />
          <Stack.Screen name="CheckIn" component={CheckInScreen} />
          <Stack.Screen name="CheckOut" component={CheckOutScreen} />
          <Stack.Screen name="StudentReport" component={StudentReport} />
          <Stack.Screen name="AddReport" component={AddReport} />
          <Stack.Screen name="ReportDetail" component={Report} />
          <Stack.Screen name="PdfReport" component={PdfReport} />
          <Stack.Screen name="ChartReport" component={ChartReport} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
