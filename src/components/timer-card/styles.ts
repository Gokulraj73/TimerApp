import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttons: {
        flexDirection: 'row',
        marginTop: 20,
    },
    buttonView: {
        margin: 10,
        alignItems: 'center',
        backgroundColor: '#2c73a7',
        borderRadius: 5
    },
    buttonText: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        color: 'white'
    }
});