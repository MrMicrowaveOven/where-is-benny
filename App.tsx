import React, { useEffect, useState } from 'react';
import Location from './Location'
import {
  Button,
  Modal,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
// import locations from './location_data'
import Geolocation from 'react-native-geolocation-service';

type Location = {
  name: string;
  image_url: string;
  corners: number[][];
  // lat1: number;
  // lng1: number;
  // lat2: number;
  // lng2: number;
  // lat3: number;
  // lng3: number;
  // lat4: number;
  // lng4: number;
  addresses: string[];
}

const App = () => {
  const [hasLocationPermission, setHasLocationPermission] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<number[]>([0,0])
  const [currentAddress, setCurrentAddress] = useState<string>('')

  const [locations, setLocations] = useState<Location[]>([])

  const [tapHistory, setTapHistory] = useState<number[]>([])
  const [userModalOpen, setUserModalOpen] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>('')

  useEffect(() => {
    if(tapHistory.length > 7) {
      setTapHistory(tapHistory.slice(tapHistory.length - 7))
    }
    if(tapHistory.join() === [0,1,2,4,6,7,8].join()) {
      setUserModalOpen(true)
    } else {
      setUserModalOpen(false)
    }
  }, [tapHistory])

  
  useEffect(() => {
    const callServer = async () => {
      const locations_raw = await fetch('https://wheres-benny-server-3fb5049d2775.herokuapp.com/locations')
      const locations_from_server = await locations_raw.json()
      // locations.forEach((location: any) => console.log(location.name))
      setLocations(locations_from_server.map((location: any) => {
        return {
          name: location.name,
          corners: [
            [location.lat1, location.lng1],
            [location.lat2, location.lng2],
            [location.lat3, location.lng3],
            [location.lat4, location.lng4],
          ],
          addresses: location.addresses,
          image_url: location.image_url
        }
      }))
    }
    callServer()
  }, [])
  console.log(locations)

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
    if (resultJson?.results?.[0]?.formattedAddress) {
      setCurrentAddress(resultJson.results[0].formatted_address)
    }
  }

  return (
    <SafeAreaView style={styles.safeApp}>
      <View style={styles.app}>
        {locations.map((location, index) => {
          return (
            <TouchableWithoutFeedback key={index} onPress={() => setTapHistory(tapHistory.concat(index))}>
              {Location(location.name, index, location.corners, location.addresses, currentLocation, currentAddress)}
            </TouchableWithoutFeedback>
          )
        })}
      </View>
      <Text style={styles.locationText}>{`lat: ${currentLocation[0]}, lng: ${currentLocation[1]}`}</Text>
      <Text style={styles.addressText}>{currentAddress}</Text>
      <Modal visible={userModalOpen}>
        <Text>Set User Name</Text>
        <TextInput onChangeText={(val) => setUserName(val)} value={userName}/>
        <Button title={'Close'} onPress={() => setUserModalOpen(false)}/>
      </Modal>
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
