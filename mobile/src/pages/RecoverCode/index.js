import {View, Text, StyleSheet, Button, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import api from '../../service/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserContext } from '../../context/userContext';

export default function RecoverCode(){
    const { user } = useUserContext()
    const navigation = useNavigation()

    const handleVerify = async (data) => {
        try {
            const response = await api.post('/RecoverPassword/code', {
                email: user.email,
                key: data.key
            })
            if(response.data.message){
                throw new Error(response.data.message);
            }
            // console.log(response.data.token)
            await AsyncStorage.setItem('@TOKEN', response.data.token);      
            navigation.navigate('Editar senha')
        } catch (error) {
          Alert.alert(error.message); 
        }
    };

    return(
        <View style={styles.conteiner}>
            <Text>Hola mundo - Tela inserção de codigo de recuperação</Text>
            <OTPInputView pinCount={5} 
            style={styles.otpinput}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled = {(code => {
                handleVerify({ key:code })
            })}
            />
            <Button title='digitei o codigo' onPress={()=> navigation.navigate('Editar senha')}/>

        </View>
    )

}

const styles = StyleSheet.create({
    conteiner :{
        flex: 1, 
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'red'
    },

    otpinput: {
        width: '80%', 
        height: 200,
        
    },

    borderStyleBase: {
      width: 30,
      height: 45,
      
    },
  
    borderStyleHighLighted: {
      borderColor: "#03DAC6",
      
    },
  
    underlineStyleBase: {
      width: 30,
      height: 45,
      borderWidth: 0,
      borderBottomWidth: 1,
      color: 'black'
    },
  
    underlineStyleHighLighted: {
      borderColor: "blue",
    },
  });