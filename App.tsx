import React, { useEffect, useState } from 'react';
import Location from './Location'
import {
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import locations from './location_data'
import Geolocation from 'react-native-geolocation-service';

const App = () => {
  const [hasLocationPermission, setHasLocationPermission] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<number[]>([0,0])
  const [currentAddress, setCurrentAddress] = useState<string>('')

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
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
  useEffect(() => {getAddressFromCoordinates()}, [currentLocation])

  requestLocationPermission().then(() => {
    if (hasLocationPermission) {
      Geolocation.watchPosition(
          (position) => {
            setCurrentLocation([position.coords.latitude, position.coords.longitude])
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, interval: 15000 }
      );
    }
  })

  const getAddressFromCoordinates = async () => {
    const [latitude, longitude] = currentLocation
    const api_key=process.env.API_KEY

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${api_key}`;

    const result = await fetch(url)
    const resultJson = await result.json()

    setCurrentAddress(resultJson.results[0].formatted_address)
  }

  return (
    <SafeAreaView style={styles.safeApp}>
      <View style={styles.app}>
        {locations.map((location, index) => {
          return Location(location.name, index, location.corners, location.addresses, currentLocation, currentAddress)
        })}
      </View>
      <Text style={styles.locationText}>{`lat: ${currentLocation[0]}, lng: ${currentLocation[1]}`}</Text>
      <Text style={styles.addressText}>{currentAddress}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeApp: {
    width: "100%",
    height: '100%'
  },
  app: {
    width: "100%",
    height: '100%',
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: "wrap"
  },
  locationText: {
    position: 'absolute',
    fontSize: 30,
    bottom: 80,
    left: 10
  },
  addressText: {
    position: 'absolute',
    fontSize: 30,
    bottom: 10,
    left: 10
  }
});

export default App;
