import {View, Text, StyleSheet, Alert, TouchableOpacity, TextInput} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import api from '../../service/api';
import { useUserContext } from '../../context/userContext';

export default function Recover(){
    const { saveUser } = useUserContext()
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false);

    const userSchema = yup.object({
        email: yup.string().email('Email inválido').required('Email obrigatório'),
    });
    const { control, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(userSchema)});

    const handleLogin = async (data) => {
        setLoading(true);
        try {
            const response = await api.post('/RecoverPassword', {
                email: data.email,
            })
            if(response.message){
                throw new Error(response.message);
            } 
            saveUser({email: data.email})
            setLoading(false);    
            navigation.navigate('Verificação de código')
        } catch (error) {
          Alert.alert(error.message);
          setLoading(false);    
  
        }
    };

    return(
        <View style={styles.conteiner}>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    placeholder="Email"
                    
                />
                )}
                name="email"
                defaultValue=""
            />
            {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
            <TouchableOpacity
                    style={{ backgroundColor: 'blue', padding: 10, marginTop: 10 }}
                    onPress={handleSubmit(handleLogin)}
                    disabled={loading}
                >
                    <Text style={{ color: 'white', fontSize: 16 }}>{loading ? 'Enviando...' : 'Recuperar agora'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                    style={{ backgroundColor: 'white', padding: 10, marginTop: 10 }}
                    onPress={()=> navigation.navigate('Login')}
                    disabled={loading}
                >
                    <Text style={{ color: 'black', fontSize: 16 }}>lembrou da senha?</Text>
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