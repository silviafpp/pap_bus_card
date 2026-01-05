import { registerRootComponent } from 'expo'; // IMPORTANTE: Adiciona isto
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

// MUITO IMPORTANTE: Substitui o XX pelo número que aparece no teu terminal (ipconfig)
const API_URL = "http://192.168.1.XX:3000"; 

function App() {
  const criarCartao = async () => {
    try {
      const res = await fetch(`${API_URL}/add-card`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 1,
          card_type: 'digital',
          modalidade: 'mensal',
          token_nfc: 'APP-' + Math.random().toString(36).substring(7)
        })
      });

      if (res.ok) {
        Alert.alert("Sucesso", "Dados gravados na Base de Dados!");
      } else {
        Alert.alert("Erro", "O servidor respondeu com um erro.");
      }
    } catch (e) {
      Alert.alert("Erro de Ligação", "Garante que o IP está correto e o Docker está ligado.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BusApp Mobile</Text>
      <TouchableOpacity style={styles.button} onPress={criarCartao}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Testar Ligação ao Docker</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: '#007AFF', padding: 20, borderRadius: 10 }
});

// IMPORTANTE: Esta linha regista a app para o Expo Go funcionar
registerRootComponent(App);
