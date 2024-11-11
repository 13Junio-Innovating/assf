// // DashboardScreen.tsx
// import React, { useState, useEffect } from 'react';
// import { View, Button, StyleSheet, Text, Modal, TouchableOpacity } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { StackScreenProps } from '@react-navigation/stack';
// import { RootStackParamList } from '../components/types';

// type Props = StackScreenProps<RootStackParamList, 'Dashboard'>;

// const DashboardScreen: React.FC<Props> = ({ route, navigation }) => {
//   const { selectedEquipamentos } = route.params;
//   const [reference, setReference] = useState('');
//   const [berolas, setBerolas] = useState<string[]>([]);
//   const [students, setStudents] = useState<string[]>([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [isReference, setIsReference] = useState(true);
//   const [isStudent, setIsStudent] = useState(false);
//   const names = ['Gustavo', 'Maria', 'Ana', 'Pedro', 'Luisa', 'Junio'];

//   useEffect(() => {
//     loadSavedOptions();
//   }, []);

//   const loadSavedOptions = async () => {
//     try {
//       const savedReference = await AsyncStorage.getItem('@saved_reference');
//       const savedBerolas = await AsyncStorage.getItem('@saved_berolas');
//       const savedStudents = await AsyncStorage.getItem('@saved_students');

//       if (savedReference) setReference(savedReference);
//       if (savedBerolas) setBerolas(JSON.parse(savedBerolas));
//       if (savedStudents) setStudents(JSON.parse(savedStudents));
//     } catch (e) {
//       console.error('Erro ao carregar as opções salvas:', e);
//     }
//   };

//   const saveOptions = async () => {
//     try {
//       await AsyncStorage.setItem('@saved_reference', reference);
//       await AsyncStorage.setItem('@saved_berolas', JSON.stringify(berolas));
//       await AsyncStorage.setItem('@saved_students', JSON.stringify(students));
//       console.log('Opções salvas com sucesso!');
//     } catch (e) {
//       console.error('Erro ao salvar as opções:', e);
//     }
//   };

//   const handleSelectName = (name: string) => {
//     if (isReference) {
//       setReference(name);
//     } else if (isStudent) {
//       setStudents(prevStudents =>
//         prevStudents.includes(name) ? prevStudents.filter(s => s !== name) : [...prevStudents, name]
//       );
//     } else {
//       setBerolas(prevBerolas =>
//         prevBerolas.includes(name) ? prevBerolas.filter(b => b !== name) : [...prevBerolas, name]
//       );
//     }
//     setModalVisible(false);
//   };

//   const openModal = (forReference: boolean, forStudent: boolean) => {
//     setIsReference(forReference);
//     setIsStudent(forStudent);
//     setModalVisible(true);
//   };

//   const printTable = () => {
//         console.table({
//           'Referência': reference,
//           'Berolas': berolas.join(', '),
//           'Alunos': students.join(', '),
//         });
//       };

//     return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Dashboard</Text>
//       <TouchableOpacity style={styles.dashboardButton} onPress={() => {
//         saveOptions();
//         printTable(); // Imprime a tabela no console
//       }}>
//         <Text style={styles.dashboardButtonText}>Marcar Horário</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.dashboardButton} onPress={() => openModal(true, false)}>
//         <Text style={styles.dashboardButtonText}>Selecionar Referência</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.dashboardButton} onPress={() => openModal(false, false)}>
//         <Text style={styles.dashboardButtonText}>Selecionar Berola</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.dashboardButton} onPress={() => openModal(false, true)}>
//         <Text style={styles.dashboardButtonText}>Selecionar Aluno</Text>
//       </TouchableOpacity>
//       <Text>Referência: {reference}</Text>
//       <Text>Berolas: {berolas.join(', ')}</Text>
//       <Text>Alunos: {students.join(', ')}</Text>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>
//               Selecionar {isReference ? 'Referência' : isStudent ? 'Aluno' : 'Berola'}
//             </Text>
//             {names.map((name, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={[
//                   styles.modalButton,
//                   !isReference && !isStudent && berolas.includes(name) && styles.selectedButton,
//                   isStudent && students.includes(name) && styles.selectedButton,
//                 ]}
//                 onPress={() => handleSelectName(name)}
//               >
//                 <Text style={styles.modalButtonText}>{name}</Text>
//               </TouchableOpacity>
//             ))}
//             <Button title="Cancelar" onPress={() => setModalVisible(false)} />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   dashboardButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     width: '80%',
//     alignItems: 'center',
//     borderRadius: 20, // Arredondar os botões
//     backgroundColor: '#007BFF',
//     marginVertical: 5, // Espaçamento vertical entre os botões
//   },
//   dashboardButtonText: {
//     fontSize: 16,
//     color: 'white',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     width: '80%',
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   modalButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     width: '100%',
//     alignItems: 'center',
//     borderRadius: 20, // Arredondar os botões
//     backgroundColor: '#007BFF',
//     marginVertical: 5, // Espaçamento vertical entre os botões
//   },
//   selectedButton: {
//     backgroundColor: '#0056b3', // Cor diferente para os botões selecionados
//   },
//   modalButtonText: {
//     fontSize: 16,
//     color: 'white',
//   },
// });

// export default DashboardScreen;


// codigo novo esta bom
import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text, Modal, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardScreen = () => {
  const [reference, setReference] = useState(''); // Estado para armazenar a referência selecionada
  const [berolas, setBerolas] = useState<string[]>([]); // Estado para armazenar uma lista de berolas selecionadas
  const [students, setStudents] = useState<string[]>([]); // Estado para armazenar uma lista de alunos selecionados
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal
  const [isReference, setIsReference] = useState(true); // Estado para diferenciar entre referência e berola
  const [isStudent, setIsStudent] = useState(false); // Estado para diferenciar entre aluno e outros

  const names = ['Gustavo', 'Maria', 'Ana', 'Pedro', 'Luisa', 'Junio']; // Lista de nomes

  useEffect(() => {
    // Carregar as opções salvas ao iniciar o componente
    loadSavedOptions();
  }, []);

  const loadSavedOptions = async () => {
    try {
      const savedReference = await AsyncStorage.getItem('@saved_reference');
      const savedBerolas = await AsyncStorage.getItem('@saved_berolas');
      const savedStudents = await AsyncStorage.getItem('@saved_students');

      if (savedReference) setReference(savedReference);
      if (savedBerolas) setBerolas(JSON.parse(savedBerolas));
      if (savedStudents) setStudents(JSON.parse(savedStudents));
    } catch (e) {
      console.error('Erro ao carregar as opções salvas:', e);
    }
  };

  const saveOptions = async () => {
    try {
      await AsyncStorage.setItem('@saved_reference', reference);
      await AsyncStorage.setItem('@saved_berolas', JSON.stringify(berolas));
      await AsyncStorage.setItem('@saved_students', JSON.stringify(students));
      console.log('Opções salvas com sucesso!');
    } catch (e) {
      console.error('Erro ao salvar as opções:', e);
    }
  };

  const handleSelectName = (name: string) => {
    if (isReference) {
      setReference(name);
    } else if (isStudent) {
      // Adiciona ou remove o nome da lista de alunos
      setStudents(prevStudents =>
        prevStudents.includes(name)
          ? prevStudents.filter(s => s !== name)
          : [...prevStudents, name]
      );
    } else {
      // Adiciona ou remove o nome da lista de berolas
      setBerolas(prevBerolas =>
        prevBerolas.includes(name)
          ? prevBerolas.filter(b => b !== name)
          : [...prevBerolas, name]
      );
    }
    setModalVisible(false); // Fecha o modal após selecionar o nome
  };

  const openModal = (forReference: boolean, forStudent: boolean) => {
    setIsReference(forReference);
    setIsStudent(forStudent);
    setModalVisible(true);
  };

  const printTable = () => {
    console.table({
      'Referência': reference,
      'Berolas': berolas.join(', '),
      'Alunos': students.join(', '),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <TouchableOpacity style={styles.dashboardButton} onPress={() => {
        saveOptions();
        printTable(); // Imprime a tabela no console
      }}>
        <Text style={styles.dashboardButtonText}>Marcar Horário</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.dashboardButton} onPress={() => openModal(true, false)}>
        <Text style={styles.dashboardButtonText}>Selecionar Referência</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.dashboardButton} onPress={() => openModal(false, false)}>
        <Text style={styles.dashboardButtonText}>Selecionar Berola</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.dashboardButton} onPress={() => openModal(false, true)}>
        <Text style={styles.dashboardButtonText}>Selecionar Aluno</Text>
      </TouchableOpacity>
      <Text>Referência: {reference}</Text>
      <Text>Berolas: {berolas.join(', ')}</Text>
      <Text>Alunos: {students.join(', ')}</Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Selecionar {isReference ? 'Referência' : isStudent ? 'Aluno' : 'Berola'}
            </Text>
            {names.map((name, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.modalButton,
                  !isReference && !isStudent && berolas.includes(name) && styles.selectedButton,
                  isStudent && students.includes(name) && styles.selectedButton,
                ]}
                onPress={() => handleSelectName(name)}
              >
                <Text style={styles.modalButtonText}>{name}</Text>
              </TouchableOpacity>
            ))}
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  dashboardButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '80%',
    alignItems: 'center',
    borderRadius: 20, // Arredondar os botões
    backgroundColor: '#007BFF',
    marginVertical: 5, // Espaçamento vertical entre os botões
  },
  dashboardButtonText: {
    fontSize: 16,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    borderRadius: 20, // Arredondar os botões
    backgroundColor: '#007BFF',
    marginVertical: 5, // Espaçamento vertical entre os botões
  },
  selectedButton: {
    backgroundColor: '#0056b3', // Cor diferente para os botões selecionados
  },
  modalButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default DashboardScreen;




// Esse é o codigo bom (primeiro codigo)

// import React, { useState, useEffect } from 'react';
// import { View, Button, StyleSheet, Text, Modal, TouchableOpacity } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const DashboardScreen = () => {
//   const [reference, setReference] = useState(''); // Estado para armazenar a referência selecionada
//   const [berolas, setBerolas] = useState<string[]>([]); // Estado para armazenar uma lista de berolas selecionadas
//   const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal
//   const [isReference, setIsReference] = useState(true); // Estado para diferenciar entre referência e berola

//   const names = ['Gustavo', 'Maria', 'Ana', 'Pedro', 'Luisa']; // Lista de nomes

//   useEffect(() => {
//     // Carregar as opções salvas ao iniciar o componente
//     loadSavedOptions();
//   }, []);

//   const loadSavedOptions = async () => {
//     try {
//       const savedReference = await AsyncStorage.getItem('@saved_reference');
//       const savedBerolas = await AsyncStorage.getItem('@saved_berolas');

//       if (savedReference) setReference(savedReference);
//       if (savedBerolas) setBerolas(JSON.parse(savedBerolas));
//     } catch (e) {
//       console.error('Erro ao carregar as opções salvas:', e);
//     }
//   };

//   const saveOptions = async () => {
//     try {
//       await AsyncStorage.setItem('@saved_reference', reference);
//       await AsyncStorage.setItem('@saved_berolas', JSON.stringify(berolas));
//       console.log('Opções salvas com sucesso!');
//     } catch (e) {
//       console.error('Erro ao salvar as opções:', e);
//     }
//   };

//   const handleSelectName = (name: string) => {
//     if (isReference) {
//       setReference(name);
//     } else {
//       // Adiciona ou remove o nome da lista de berolas
//       setBerolas(prevBerolas =>
//         prevBerolas.includes(name)
//           ? prevBerolas.filter(b => b !== name)
//           : [...prevBerolas, name]
//       );
//     }
//     setModalVisible(false); // Fecha o modal após selecionar o nome
//   };

//   const openModal = (forReference: boolean) => {
//     setIsReference(forReference);
//     setModalVisible(true);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Dashboard</Text>
//       <TouchableOpacity style={styles.dashboardButton} onPress={() => saveOptions()}>
//         <Text style={styles.dashboardButtonText}>Marcar Horário</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.dashboardButton} onPress={() => openModal(true)}>
//         <Text style={styles.dashboardButtonText}>Selecionar Referência</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.dashboardButton} onPress={() => openModal(false)}>
//         <Text style={styles.dashboardButtonText}>Selecionar Berola</Text>
//       </TouchableOpacity>
//       <Text>Referência: {reference}</Text>
//       <Text>Berolas: {berolas.join(', ')}</Text>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>
//               Selecionar {isReference ? 'Referência' : 'Berola'}
//             </Text>
//             {names.map((name, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={[
//                   styles.modalButton,
//                   !isReference && berolas.includes(name) && styles.selectedButton,
//                 ]}
//                 onPress={() => handleSelectName(name)}
//               >
//                 <Text style={styles.modalButtonText}>{name}</Text>
//               </TouchableOpacity>
//             ))}
//             <Button title="Cancelar" onPress={() => setModalVisible(false)} />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   dashboardButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     width: '80%',
//     alignItems: 'center',
//     borderRadius: 20, // Arredondar os botões
//     backgroundColor: '#007BFF',
//     marginVertical: 5, // Espaçamento vertical entre os botões
//   },
//   dashboardButtonText: {
//     fontSize: 16,
//     color: 'white',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     width: '80%',
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   modalButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     width: '100%',
//     alignItems: 'center',
//     borderRadius: 20, // Arredondar os botões
//     backgroundColor: '#007BFF',
//     marginVertical: 5, // Espaçamento vertical entre os botões
//   },
//   selectedButton: {
//     backgroundColor: '#0056b3', // Cor diferente para os botões selecionados
//   },
//   modalButtonText: {
//     fontSize: 16,
//     color: 'white',
//   },
// });

// export default DashboardScreen;

