import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GoogleFit, { Scopes } from 'react-native-google-fit';

export default function App() {
  useEffect(() => {
    // Auth check
    const options = {
      scopes: [
        Scopes.FITNESS_ACTIVITY_READ,
        Scopes.FITNESS_ACTIVITY_WRITE,
        Scopes.FITNESS_BODY_READ,
        Scopes.FITNESS_BODY_WRITE,
      ],
    };
    GoogleFit.authorize(options)
      .then((authResult) => {
        if (authResult.success) {
          // dispatch('AUTH_SUCCESS');
          console.log('auth_success >>>', authResult.success);
          fetchData();
        } else {
          // dispatch('AUTH_DENIED', authResult.message);
          console.log('auth_denied >>>', authResult.message);
        }
      })
      .catch((err) => {
        // dispatch('AUTH_ERROR');
        console.log('auth_error >>>', err.message);
      });
  }, []);

  const opt = {
    startDate: '2023-05-30T00:00:17.971Z', // required ISO8601Timestamp
    endDate: new Date().toISOString(), // required ISO8601Timestamp
    // bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
    bucketInterval: 1, // optional - default 1.
  };

  async function fetchData() {
    const res = await GoogleFit.getDailyStepCountSamples(opt);
    // console.log('response data: ', res);
    console.log('extract step data: ', res[1].steps);
  }

  return (
    <View style={styles.container}>
      <Text>stepData: Test</Text>
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
