import React from 'react';
import { Button } from 'react-native';
import * as XLSX from 'xlsx';
import RNFS from 'react-native-fs';

interface ExcelExporterProps {
  data: Array<{ name: string; phone: string; email: string }>;
}

const ExcelExporter: React.FC<ExcelExporterProps> = ({ data }) => {
  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Dados');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });

    // Caminho onde o arquivo será salvo
    const path = `${RNFS.DocumentDirectoryPath}/dados.xlsx`;
    try {
      await RNFS.writeFile(path, wbout, 'base64');
      alert(`Arquivo salvo em ${path}`);
    } catch (e) {
      console.error('Erro ao salvar o arquivo:', e);
    }
  };

  return (
    <Button title="Imprimir" onPress={exportToExcel} />
  );
};

export default ExcelExporter;
