import {View, Text, StyleSheet,Button} from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function Recover(){
    const navigation = useNavigation()
    return(
        <View style={styles.conteiner}>
            <Text>Hola mundo - Tela De Recuperação de senha</Text>
            <Button title='Esqueci minha senha' onPress={()=> navigation.navigate('Verificação de código')}/>
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