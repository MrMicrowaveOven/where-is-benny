import { StyleSheet, Text, View } from "react-native"

const Location = (name: string, index: number, corners: number[][], addresses: string[], currentLocation: number[], currentAddress: string) => {
    const isInLocation = (corners: number[][], currentLocation: number[]) => {
        const [corner1, corner2, corner3, corner4] = corners
        const slope1 = getSlope(corner1, corner2)
        const latAtGPSLng1 = corner1[1] + (corner1[0] - currentLocation[0])*slope1
        const aboveLine1 = latAtGPSLng1 > currentLocation[1]
        const slope2 = getSlope(corner2, corner3)
        const latAtGPSLng2 = corner2[1] + (corner2[0] - currentLocation[0])*slope2
        const aboveLine2 = latAtGPSLng2 > currentLocation[1]
        const slope3 = getSlope(corner3, corner4)
        const latAtGPSLng3 = corner3[1] + (corner3[0] - currentLocation[0])*slope3
        const aboveLine3 = latAtGPSLng3 > currentLocation[1]
        const slope4 = getSlope(corner4, corner1)
        const latAtGPSLng4 = corner4[1] + (corner4[0] - currentLocation[0])*slope4
        const aboveLine4 = latAtGPSLng4 > currentLocation[1]
        const above1xor3 = (aboveLine1 && !aboveLine3) || (!aboveLine1 && aboveLine3)
        const above2xor4 = (aboveLine2 && !aboveLine4) || (!aboveLine2 && aboveLine4)
        let matchesAddress = false
        if (!(above1xor3 && above2xor4)) {
            matchesAddress = checkIfAddressMatches()
        }
        return ((above1xor3 && above2xor4) || matchesAddress)
    }

    const checkIfAddressMatches = () => {
        let doesMatch = false
        addresses.forEach((address) => {
            const shortCurrentAddress = currentAddress.substring(0, address.length)
            if (shortCurrentAddress === address) doesMatch = true
        })
        return doesMatch
    }

    const getSlope = (point1: number[], point2: number[]) => {
        const numerator = point1[0] - point2[0]
        const denominator = point1[1] - point2[1]
        return numerator / denominator
    }

    return (
        <View style={[styles.box, isInLocation(corners, currentLocation) && {backgroundColor: 'orange'}]} key={index}>
            <Text style={styles.locationName}>{name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        width: '33%',
        height: '20%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black',
        backgroundColor: 'white'
    },
    locationName: {
        textAlign: 'center',
        color: 'black',
        margin: 5,
    }
});

export default Location;