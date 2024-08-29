import React, { useEffect, useState } from 'react';
import Location from './Location'
import {
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import locations from './location_data'
import Geolocation from 'react-native-geolocation-service';

const App = () => {
  const [hasLocationPermission, setHasLocationPermission] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<number[]>([0,0])

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'Grant Location Data',
          message: 'Can I track your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setHasLocationPermission(true)
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  // useEffect(() => {
  //   setTimeout(() => {
  //       requestLocationPermission()
  //   }, 1000)
  // }, [])

  // requestLocationPermission().then(() => {
  if (hasLocationPermission) {
    Geolocation.watchPosition(
        (position) => {
          console.log(position)
          setCurrentLocation([position.coords.latitude, position.coords.longitude])
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, interval: 5000 }
    );
  }
  // })

  return (
    <SafeAreaView style={styles.safeApp}>
      <View style={styles.app}>
        {locations.map((location, index) => {
          return Location(location.name, index, location.corners, currentLocation)
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeApp: {
    width: "100%",
  },
  app: {
    width: "100%",
    height: '100%',
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: "wrap"
  }
});

export default App;
