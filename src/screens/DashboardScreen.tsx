// import React, { useState, useEffect } from 'react';
// import { View, Button, StyleSheet, Text, Modal, TouchableOpacity } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import RNFS from 'react-native-fs'; 
// import { toast } from 'react-toastify';
// import { PDFDocument, rgb } from 'pdf-lib';


// const DashboardScreen = () => {
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
//       toast.success('Opções salvas com sucesso!');
//     } catch (e) {
//       console.error('Erro ao salvar as opções:', e);
//     }
//   };

//   const handleSelectName = (name: string) => {
//     if (isReference) {
//       setReference(name);
//     } else if (isStudent) {
//       setStudents(prevStudents =>
//         prevStudents.includes(name)
//           ? prevStudents.filter(s => s !== name)
//           : [...prevStudents, name]
//       );
//     } else {
//       setBerolas(prevBerolas =>
//         prevBerolas.includes(name)
//           ? prevBerolas.filter(b => b !== name)
//           : [...prevBerolas, name]
//       );
//     }
//     setModalVisible(false);
//   };

//   const openModal = (forReference: boolean, forStudent: boolean) => {
//     setIsReference(forReference);
//     setIsStudent(forStudent);
//     setModalVisible(true);
//   };

//   const generatePDF = async () => {
//     try {
//       const pdfDoc = await PDFDocument.create();
//       const page = pdfDoc.addPage();
//       const { height } = page.getSize();
      
//       page.drawText(`Referência: ${reference}`, { x: 50, y: height - 50, size: 15, color: rgb(0, 0, 0) });
//       page.drawText(`Berolas: ${berolas.join(', ')}`, { x: 50, y: height - 80, size: 15, color: rgb(0, 0, 0) });
//       page.drawText(`Alunos: ${students.join(', ')}`, { x: 50, y: height - 110, size: 15, color: rgb(0, 0, 0) });

//       const pdfBytes = await pdfDoc.save();
//       const pdfPath = `${RNFS.DocumentDirectoryPath}/Relatorio.pdf`;
//       await RNFS.writeFile(pdfPath, pdfBytes, 'base64');
      
//       toast.success('PDF salvo com sucesso!');
//     } catch (e) {
//       console.error('Erro ao gerar PDF:', e);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Dashboard</Text>
//       <TouchableOpacity style={styles.dashboardButton} onPress={saveOptions}>
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
//       <TouchableOpacity style={styles.dashboardButton} onPress={generatePDF}>
//         <Text style={styles.dashboardButtonText}>Salvar como PDF</Text>
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
//     borderRadius: 20,
//     backgroundColor: '#007BFF',
//     marginVertical: 5,
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
//     borderRadius: 20,
//     backgroundColor: '#007BFF',
//     marginVertical: 5,
//   },
//   selectedButton: {
//     backgroundColor: '#0056b3',
//   },
//   modalButtonText: {
//     fontSize: 16,
//     color: 'white',
//   },
// });

// export default DashboardScreen;


// codigo novo esta bom
import { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text, Modal, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toast } from 'react-toastify';

const DashboardScreen = () => {
  const [reference, setReference] = useState(''); 
  const [berolas, setBerolas] = useState<string[]>([]); 
  const [students, setStudents] = useState<string[]>([]); 
  const [modalVisible, setModalVisible] = useState(false);
  const [isReference, setIsReference] = useState(true);
  const [isStudent, setIsStudent] = useState(false); 

  const names = ['Gustavo', 'Maria', 'Ana', 'Pedro', 'Luisa', 'Junio'];

  useEffect(() => {
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
    } catch {
      toast.error('Erro ao carregar as opções salvas:');
    }
  };

  const saveOptions = async () => {
    try {
      await AsyncStorage.setItem('@saved_reference', reference);
      await AsyncStorage.setItem('@saved_berolas', JSON.stringify(berolas));
      await AsyncStorage.setItem('@saved_students', JSON.stringify(students));
      toast.success('Opções salvas com sucesso!');
    } catch {
      toast.error('Erro ao salvar as opções:');
    }
  };

  const handleSelectName = (name: string) => {
    if (isReference) {
      setReference(name);
    } else if (isStudent) {
      setStudents(prevStudents =>
        prevStudents.includes(name)
          ? prevStudents.filter(s => s !== name)
          : [...prevStudents, name]
      );
    } else {
      setBerolas(prevBerolas =>
        prevBerolas.includes(name)
          ? prevBerolas.filter(b => b !== name)
          : [...prevBerolas, name]
      );
    }
    setModalVisible(false); 
  };

  const openModal = (forReference: boolean, forStudent: boolean) => {
    setIsReference(forReference);
    setIsStudent(forStudent);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <TouchableOpacity style={styles.dashboardButton} onPress={() => {
        saveOptions();
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
    borderRadius: 20, 
    backgroundColor: '#007BFF',
    marginVertical: 5,
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
    borderRadius: 20, 
    backgroundColor: '#007BFF',
    marginVertical: 5,
  },
  selectedButton: {
    backgroundColor: '#0056b3', 
  },
  modalButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default DashboardScreen;
