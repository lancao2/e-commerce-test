import {NavigationContainer} from '@react-navigation/native'
import StackRoutes from './routes'
import { Providers } from '../context'

export default function Routers(){
    return(
        <Providers>
            <NavigationContainer>
                <StackRoutes/>
            </NavigationContainer>
        </Providers>
    )
}