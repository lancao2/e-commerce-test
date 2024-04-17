import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import api from '../../service/api';

export default function Register(){
    const navigation = useNavigation();
    const [termsAccepted, setTermsAccepted] = useState(false);

    const userSchema = yup.object({
        name: yup.string().required('Nome obriatorio').max(20, 'Não precisamos do seu nome completo'),
        email: yup.string().email('Email inválido').required('Email obrigatório'),
        password: yup.string().required('Senha obrigatória').min(6, 'senha precisa ter no minimo 6 caracteres'),
        confirmPassword: yup.string().required('Confirme sua senha').oneOf([yup.ref('password')], 'As senhas não são iguais'),
        termsAccepted: yup.boolean().oneOf([true], 'aceite os termos para prosseguir')
    });
    const { control, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(userSchema)});

  const onSubmit = async (data) => {
    try {
        if (!termsAccepted) {
            throw new Error('Você deve aceitar os termos de privacidade para prosseguir.');
          }
        const response = await api.post('/users', {
            name: data.name,
            email: data.email,
            password: data.password
        })
        if(response.message){
            throw new Error(response.message);
        } 
        Alert.alert('Usuario cadastrado com sucesso');
        navigation.navigate('Login')



    } catch (error) {
      Alert.alert(error.message);
    }
  };

    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    placeholder="Nome"
                />
                )}
                name="name"
                rules={{ required: 'Nome é obrigatório' }}
                defaultValue=""
            />
            {errors.name && <Text style={{ color: 'red' }}>{errors.name.message}</Text>}

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
                rules={{ required: 'Email é obrigatório', pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' } }}
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
                rules={{ required: 'Senha é obrigatória', minLength: { value: 6, message: 'Senha deve ter pelo menos 6 caracteres' } }}
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
                rules={{ required: 'Confirme a senha', validate: value => value === control.fieldsRef.current.password || 'As senhas não coincidem' }}
                defaultValue=""
            />
            {errors.confirmPassword && <Text style={{ color: 'red' }}>{errors.confirmPassword.message}</Text>}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <TouchableOpacity onPress={() => setTermsAccepted(!termsAccepted)}>
                <View style={{ width: 20, height: 20, borderWidth: 1, borderRadius: 4, marginRight: 5, alignItems: 'center', justifyContent: 'center' }}>
                    {termsAccepted && <View style={{ width: 10, height: 10, backgroundColor: 'blue', borderRadius: 2 }} />}
                </View>
                </TouchableOpacity>
                <Text>Aceito os termos de privacidade</Text>
                {errors.termsAccepted && <Text style={{ color: 'red' }}>{errors.termsAccepted.message}</Text>}
            </View>
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
    // conteiner :{
    //     flex: 1, 
    //     backgroundColor: '#fff',
    //     alignItems: 'center',
    //     justifyContent: 'center'
    // }
});