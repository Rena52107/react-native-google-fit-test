import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GoogleFit, { Scopes } from 'react-native-google-fit';

export default function App() {
  const [stepData, setStepData] = useState(0);

  const options = {
    scopes: [Scopes.FITNESS_ACTIVITY_READ, Scopes.FITNESS_ACTIVITY_WRITE],
  };

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        await GoogleFit.checkIsAuthorized();
        console.log(GoogleFit.isAuthorized);
      } catch (err) {
        console.log('Authorize failed: ', err.message);
      }
    };

    checkAuthorization();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Test</Text>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
