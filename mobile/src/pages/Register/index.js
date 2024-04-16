import {View, Text, StyleSheet} from 'react-native'

export default function Register(){
    return(
        <View style={styles.conteiner}>
            <Text>Hola mundo - Tela De registro</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    conteiner :{
        flex: 1, 
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});