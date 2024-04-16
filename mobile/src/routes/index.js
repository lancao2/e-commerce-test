import {NavigationContainer} from '@react-navigation/native'
import StackRoutes from './routes'

export default function Routers(){
    return(
        <NavigationContainer>
            <StackRoutes/>
        </NavigationContainer>
    )
}