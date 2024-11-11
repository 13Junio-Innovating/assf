// codigo com erro
// // EquipamentosScreen.tsx
// import React, { useState } from 'react';
// import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import { StackScreenProps } from '@react-navigation/stack';
// import { RootStackParamList } from '../components/types';

// type Props = StackScreenProps<RootStackParamList, 'Equipamentos'>;

// const EquipamentosScreen: React.FC<Props> = ({ route, navigation }) => {
//     const equipamentos = ['Roupa', 'Prancha', 'Cadeira', 'Capacete', 'Óculos de Sol'];
//     const [selectedEquipamentos, setSelectedEquipamentos] = useState<string[]>([]);

//     const handleSelectEquipamento = (equipamento: string) => {
//         setSelectedEquipamentos(prevSelectedEquipamentos =>
//             prevSelectedEquipamentos.includes(equipamento)
//                 ? prevSelectedEquipamentos.filter(e => e !== equipamento)
//                 : [...prevSelectedEquipamentos, equipamento]
//         );
//     };

//     const handleGoBack = () => {
//         navigation.navigate('Dashboard', { selectedEquipamentos });
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Equipamentos</Text>
//             {equipamentos.map((equipamento, index) => (
//                 <TouchableOpacity
//                     key={index}
//                     style={[
//                         styles.equipamentoButton,
//                         selectedEquipamentos.includes(equipamento) && styles.selectedButton,
//                     ]}
//                     onPress={() => handleSelectEquipamento(equipamento)}
//                 >
//                     <Text style={styles.equipamentoButtonText}>{equipamento}</Text>
//                 </TouchableOpacity>
//             ))}
//             <Button title="Voltar" onPress={handleGoBack} />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     title: {
//         fontSize: 24,
//         marginBottom: 20,
//     },
//     equipamentoButton: {
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         width: '80%',
//         alignItems: 'center',
//         borderRadius: 20,
//         backgroundColor: '#007BFF',
//         marginVertical: 5,
//     },
//     selectedButton: {
//         backgroundColor: '#0056b3',
//     },
//     equipamentoButtonText: {
//         fontSize: 16,
//         color: 'white',
//     },
// });

// export default EquipamentosScreen;


// codigo novo
// EquipamentosScreen.tsx
// import React, { useState } from 'react';
// import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import { StackScreenProps } from '@react-navigation/stack';
// import { RootStackParamList } from '../components/types';

// type Props = StackScreenProps<RootStackParamList, 'Equipamentos'>;

// const EquipamentosScreen: React.FC<Props> = ({ navigation }) => {
//   const equipamentos = ['Roupa', 'Prancha', 'Cadeira', 'Capacete', 'Óculos de Sol'];
//   const [selectedEquipamentos, setSelectedEquipamentos] = useState<string[]>([]);

//   const handleSelectEquipamento = (equipamento: string) => {
//     setSelectedEquipamentos(prevSelectedEquipamentos =>
//       prevSelectedEquipamentos.includes(equipamento)
//         ? prevSelectedEquipamentos.filter(e => e !== equipamento)
//         : [...prevSelectedEquipamentos, equipamento]
//     );
//   };

//   const handleGoBack = () => {
//     navigation.navigate('Dashboard', { selectedEquipamentos });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Equipamentos</Text>
//       {equipamentos.map((equipamento, index) => (
//         <TouchableOpacity
//           key={index}
//           style={[
//             styles.equipamentoButton,
//             selectedEquipamentos.includes(equipamento) && styles.selectedButton,
//           ]}
//           onPress={() => handleSelectEquipamento(equipamento)}
//         >
//           <Text style={styles.equipamentoButtonText}>{equipamento}</Text>
//         </TouchableOpacity>
//       ))}
//       <Button title="Voltar" onPress={handleGoBack} />
//     </View>
//   );
// };