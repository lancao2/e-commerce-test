import {View, Text, StyleSheet,Button, TextInput, Alert, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import {  yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import api from '../../service/api';

export default function EditPassword(){
    const navigation = useNavigation()

    const userSchema = yup.object({
        password: yup.string().required('Senha obrigatória').min(6, 'senha precisa ter no minimo 6 caracteres'),
        confirmPassword: yup.string().required('Confirme sua senha').oneOf([yup.ref('password')], 'As senhas não são iguais'),

    });
    const { control, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(userSchema)});

    const onSubmit = async (data) => {
        try {

            const response = await api.post('/users/edit', {
                password: data.password
            })
            if(response.data.message){
                throw new Error(response.data.message);
            } 
            Alert.alert('Usuario editado com sucesso');
            navigation.navigate('Login')
    
    
    
        } catch (error) {
          Alert.alert(error.message);
        }
      };

    return(
        <View style={styles.conteiner}>
            <Text>Hola mundo - Tela De redefinição de senha</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    placeholder="Senha"
                    secureTextEntry
                />
                )}
                name="password"
                defaultValue=""
            />
            {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    placeholder="Confirme a senha"
                    secureTextEntry
                />
                )}
                name="confirmPassword"
                defaultValue=""
            />
            {errors.confirmPassword && <Text style={{ color: 'red' }}>{errors.confirmPassword.message}</Text>}
            <TouchableOpacity
                style={{ backgroundColor: 'blue', padding: 10, marginTop: 10 }}
                onPress={handleSubmit(onSubmit)}
            >
                <Text style={{ color: 'white', fontSize: 16 }}>Registrar</Text>
            </TouchableOpacity>
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