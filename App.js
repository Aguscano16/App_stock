import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  const handlePress = (value) => {
    if (value === '=') {
      calculateResult();
    } else if (value === 'C') {
      clearInput();
    } else {
      setInput(input + value);
    }
  };

  const calculateResult = () => {
    try {
      const res = eval(input);
      setResult(res.toString());
      setHistory([...history, `${input} = ${res}`]);
      setInput('');
    } catch (error) {
      setResult('Error');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw9199zKSbHgmGxS_MDRW9Rg__DVbu3UPKBA&s' }} // URL de la imagen de fondo
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        
        {/* Título de la Calculadora */}
        <Text style={styles.title}>Calculadora</Text>

        {/* Historial de Operaciones */}
        <ScrollView style={styles.historyContainer}>
          {history.map((entry, index) => (
            <Text key={index} style={styles.historyText}>{entry}</Text>
          ))}
        </ScrollView>

        {/* Pantalla de la Calculadora */}
        <Text style={styles.input}>{input || '0'}</Text>
        <Text style={styles.result}>{result}</Text>

        {/* Botones */}
        <View style={styles.row}>
          {['7', '8', '9', '/'].map((item) => (
            <Button key={item} value={item} onPress={handlePress} />
          ))}
        </View>

        <View style={styles.row}>
          {['4', '5', '6', '*'].map((item) => (
            <Button key={item} value={item} onPress={handlePress} />
          ))}
        </View>

        <View style={styles.row}>
          {['1', '2', '3', '-'].map((item) => (
            <Button key={item} value={item} onPress={handlePress} />
          ))}
        </View>

        <View style={styles.row}>
          {['C', '0', '=', '+'].map((item) => (
            <Button key={item} value={item} onPress={handlePress} />
          ))}
        </View>
      </View>
    </ImageBackground>
  );
}

const Button = ({ value, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => onPress(value)}>
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
  },
  // Estilo del título
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20, // Espacio entre el título y el historial
    color: '#333',
  },
  input: {
    fontSize: 40,
    color: '#333',
    textAlign: 'right',
    paddingRight: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  result: {
    fontSize: 32,
    color: '#888',
    textAlign: 'right',
    paddingRight: 20,
    paddingVertical: 10,
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 10,
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  historyContainer: {
    maxHeight: 150,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
  },
  historyText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
  },
});
