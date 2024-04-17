import { createNativeStackNavigator } from '@react-navigation/native-stack' 

import Login from '../pages/Login';
import Register from '../pages/Register';
import Recover from '../pages/Recover';
import RecoverCode from '../pages/RecoverCode';
import EditPassword from '../pages/EditPassword';

const Stack = createNativeStackNavigator();

export default function StackRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name='Login'
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name='Cadastro'
                component={Register}
            />
            <Stack.Screen 
                name='Recover'
                component={Recover}
            />
            <Stack.Screen 
                name='Verificação de código'
                component={RecoverCode}
            />
            <Stack.Screen 
                name='Editar senha'
                component={EditPassword}
            />
        </Stack.Navigator>
    )
}