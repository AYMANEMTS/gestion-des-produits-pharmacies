import 'react-native-gesture-handler'; 
import {NavigationContainer} from "@react-navigation/native";
import Home from '../screns/geust/Home.jsx';
import StoreScren from '../screns/geust/StoreScren.jsx';
import { View , Text} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TopHeaderDrawer from '../component/TopHeaderDrawer.jsx';

const Drawer = createDrawerNavigator();


export default function Main(){
    return (
        <>
            <NavigationContainer >
                <Drawer.Navigator screenOptions={{
                header: () => <TopHeaderDrawer />,
            }} > 
                    <Drawer.Screen name="Home" component={Home} />
                    <Drawer.Screen name="Store" component={StoreScren} />
                </Drawer.Navigator>
            </NavigationContainer>
        </>
    );
}