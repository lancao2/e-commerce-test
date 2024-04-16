import {View, Text, StyleSheet, Button} from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function Login(){
    const navigation = useNavigation();
    return(
        <View style={styles.conteiner}>
            <Text>Hola mundo - Tela De login</Text>
            <Button title='Cadastrar-se' onPress={()=> navigation.navigate('Cadastro')}/>
            <Button title='Esqueci minha senha' onPress={()=> navigation.navigate('Recover')}/>
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