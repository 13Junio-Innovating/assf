import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginSreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
// import EquipamentosScreen from '../screens/EquipamentosScreen';
import { RootStackParamList } from '../components/types';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      {/* <Stack.Screen name="Equipamentos" component={EquipamentosScreen} /> */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
