import {View, Text, StyleSheet,Button} from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function EditPassword(){
    const navigation = useNavigation()
    return(
        <View style={styles.conteiner}>
            <Text>Hola mundo - Tela De redefinição de senha</Text>
            <Button title='Ir para a tela inicial' onPress={()=> navigation.navigate('Login')}/>
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