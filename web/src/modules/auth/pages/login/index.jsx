import { useState } from "react";
import { useForm} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import api from "../../../../service/api";
import { redirect } from 'react-router-dom'

const userSchema = yup.object().shape({
    email: yup.string().email('Email inválido').required('Email obrigatório'),
    password: yup.string().required('Senha obrigatória'),
});

function LoginPage(){
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({resolver: yupResolver(userSchema)});

    const submitForm = async(data) => {
        setLoading(true);
        try {
            await api.post('/auth/admin', {
                email: data.email,
                password: data.password,

            }).then((response) => {
                console.log(response)
                if(response.message){
                    throw new Error(response.message);
                } 
                if(response.error){
                    throw new Error(response.message);
                } 
            });
            // const {token, user} = response.data;
            // localStorage.setItem('@TOKEN', token)
            // console.log(token)
            // console.log(user)
            setLoading(false);
            redirect('/dashboard')
            console.log(errors)
        } catch (error) {
            console.log(error)
            setLoading(false);

        }

    }

    return (
        <div >
            <form onSubmit={handleSubmit(submitForm)}>
                <h1>Login</h1>
                <input
                    type="text"
                    placeholder="Email"
                    defaultValue=''
                    {...register('email')}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    defaultValue=''
                    {...register('password')}
                />
                {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
                <button
                    type="submit"
                    disabled={loading}
                >
                <span>{loading ? 'Carregando...' : 'Login'}</span>
                </button>
            </form>
        </div>
    )
}

export default LoginPage