import { StyleSheet, Text, View } from "react-native"

const Location = (name: string, index: number, humans: string[]) => {
    return (
        <View style={[styles.box, humans.length > 0 && {backgroundColor: 'orange'}]} key={index}>
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