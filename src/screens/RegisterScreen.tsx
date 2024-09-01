// import React, { useState } from 'react';
// import { View, TextInput, Button, Image, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const RegisterScreen = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const navigation = useNavigation();

//   const handleRegister = () => {
//     // Lógica de registro aqui
//     navigation.navigate('Login');
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={require('../assets/assf-logo.png')} style={styles.logo} />
//       <TextInput
//         style={styles.input}
//         placeholder="Nome"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Telefone"
//         value={phone}
//         onChangeText={setPhone}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Senha"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button title="Cadastrar" onPress={handleRegister} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
// });

// export default RegisterScreen;

// import React, { useState } from 'react';
// import { View, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { StackNavigationProp } from '@react-navigation/stack';

// type RootStackParamList = {
//   Register: undefined;
//   Login: undefined;
// };

// type RegisterScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   'Register'
// >;

// const RegisterScreen = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');

//   const navigation = useNavigation<RegisterScreenNavigationProp>();

//   const saveUser = async (user: { name: string; email: string; phone: string; password: string }) => {
//     try {
//       await AsyncStorage.setItem('user', JSON.stringify(user));
//       Alert.alert('Sucesso', 'Usuário registrado com sucesso');
//       navigation.navigate('Login');
//     } catch (error) {
//       Alert.alert('Erro', 'Não foi possível registrar o usuário');
//     }
//   };

//   const handleRegister = () => {
//     if (!name || !email || !phone || !password) {
//       Alert.alert('Erro', 'Por favor, preencha todos os campos');
//       return;
//     }

//     const user = { name, email, phone, password };
//     saveUser(user);
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={require('../assets/logo.png')} style={styles.logo} />
//       <TextInput
//         style={styles.input}
//         placeholder="Nome"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Telefone"
//         value={phone}
//         onChangeText={setPhone}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Senha"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button title="Cadastrar" onPress={handleRegister} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
//     borderRadius: 20,
//   },
//   input: {
//     width: '100%',
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
// });

import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../App';
import Icon from 'react-native-vector-icons/FontAwesome';

type RegisterScreenNavigationProp = NavigationProp<RootStackParamList, 'Register'>;

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true); // Adicionado para controle da visibilidade da senha
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const saveUser = async (user: { name: string; email: string; phone: string; password: string }) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      Alert.alert('Sucesso', 'Usuário registrado com sucesso');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível registrar o usuário');
    }
  };

  const handleRegister = () => {
    if (!name || !email || !phone || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    const user = { name, email, phone, password };
    saveUser(user);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none" // Corrige o problema de capitalização automática
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad" // Ajusta o teclado para telefone
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureText}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.eyeIcon}>
          <Icon name={secureText ? 'eye-slash' : 'eye'} size={20} color="grey" />
        </TouchableOpacity>
      </View>
      <Button title="Cadastrar" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 20,
  },
  input: {
    width: '100%',
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
});

export default RegisterScreen;
