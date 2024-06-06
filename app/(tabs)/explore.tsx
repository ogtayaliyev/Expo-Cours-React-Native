import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, FlatList } from 'react-native';

export default function App() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [websites200, setWebsites200] = useState<string[]>([]);
  const [websites404403, setWebsites404403] = useState<string[]>([]);

  const checkWebsite = async () => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        setWebsites200(prevWebsites => [...prevWebsites, url]);
        setStatus('Website is up and running!');
      } else if (response.status === 404 || response.status === 403) {
        setWebsites404403(prevWebsites => [...prevWebsites, url]);
        setStatus(`Website returned status code ${response.status}`);
      }
    } catch (error) {
      setStatus('Failed to fetch the website. Please check the URL.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/po1.png')} style={styles.logo} />
      <Text style={styles.title}>Website Checker</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter website URL"
        value={url}
        onChangeText={setUrl}
        keyboardType="url"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity style={styles.button} onPress={checkWebsite}>
        <Text style={styles.buttonText}>Check Website</Text>
      </TouchableOpacity>
      {status && <Text style={styles.status}>{status}</Text>}
      <View style={styles.cardsContainer}>
        <View style={[styles.card, styles.cardBlue]}>
          <Text style={styles.cardTitle}>200 OK</Text>
          <FlatList
            data={websites200}
            renderItem={({ item }) => <Text>{item}</Text>}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={[styles.card, styles.cardOrange]}>
          <Text style={styles.cardTitle}>404 or 403</Text>
          <FlatList
            data={websites404403}
            renderItem={({ item }) => <Text>{item}</Text>}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 32,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  status: {
    marginTop: 16,
    fontSize: 16,
  },
  cardsContainer: {
    flexDirection: 'column',
    width: '100%',
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
  },
  cardBlue: {
    borderColor: 'blue',
  },
  cardOrange: {
    borderColor: '#ffa500',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
