import React, { useState } from 'react';
import {View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import api from '../../service/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login(){
    const navigation = useNavigation();

    const { control, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
  
    const handleLogin = async (data) => {
      setLoading(true);
      try {
        const response = await api.post('/auth', {
            email: data.email,
            password: data.password
        })
        if (!response.data.token){
            throw new Error(response.data.message)
        }else{
            await AsyncStorage.setItem('@TOKEN', response.data.token);
            setLoading(false);
            return
        }

      } catch (error) {
        Alert.alert(error.message);
        setLoading(false);    

      }
    };

    return(
        <View style={styles.conteiner}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
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
                    rules={{ required: 'Email é obrigatório' }}
                    defaultValue=""
                />
                {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
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
                    rules={{ required: 'Senha é obrigatória' }}
                    defaultValue=""
                />
                {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}
                <TouchableOpacity
                    style={{ backgroundColor: 'blue', padding: 10, marginTop: 10 }}
                    onPress={handleSubmit(handleLogin)}
                    disabled={loading}
                >
                    <Text style={{ color: 'white', fontSize: 16 }}>{loading ? 'Carregando...' : 'Login'}</Text>
                </TouchableOpacity>
            </View>
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
        justifyContent: 'center',
        
    }
});