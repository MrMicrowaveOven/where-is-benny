import { StyleSheet, Text, View } from "react-native"

const Location = (name: string, index: number) => {
    return (
        <View style={styles.box} key={index}>
            <Text style={styles.locationName}>{name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        width: '33%',
        height: '25%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black',
    },
    locationName: {
        textAlign: 'center',
        color: 'black',
        margin: 5,
    }
});

export default Location;