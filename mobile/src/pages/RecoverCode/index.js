import {View, Text, StyleSheet, Button} from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function RecoverCode(){
    const navigation = useNavigation()
    return(
        <View style={styles.conteiner}>
            <Text>Hola mundo - Tela inserção de codigo de recuperação</Text>
            <Button title='digitei o codigo' onPress={()=> navigation.navigate('Editar senha')}/>

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