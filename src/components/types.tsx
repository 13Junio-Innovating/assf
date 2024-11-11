// types.ts
import { StackNavigationProp } from '@react-navigation/stack';

// Defina os parâmetros das suas telas

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Dashboard: { selectedEquipamentos: string[] };
    Equipamentos: undefined;
};

// Defina o tipo de navegação para cada tela
export type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;
export type EquipamentosScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Equipamentos'>;
