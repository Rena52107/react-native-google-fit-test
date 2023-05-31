import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GoogleFit, { Scopes } from 'react-native-google-fit';

export default function App() {
  const [isAuth, setIsAuth] = useState();
  const [stepData, setStepData] = useState(0);

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

  // const opt = {
  //   startDate: '2023-05-30T00:00:17.971Z', // required ISO8601Timestamp
  //   endDate: new Date().toISOString(), // required ISO8601Timestamp
  //   // bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
  //   bucketInterval: 1, // optional - default 1.
  // };

  // GoogleFit.getDailyStepCountSamples(opt)
  //   .then((res) => {
  //     console.log('Daily steps >>> ', res);
  //   })
  //   .catch((err) => {
  //     console.warn(err);
  //   });

  return (
    <View style={styles.container}>
      <Text>stepData: {stepData}</Text>
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
