
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from "./component/SignInScreen";
import SignUpScreen from "./component/SignUpScreen";
import SplashScreen from "./component/SplashScreen";
import React from 'react';
import HomeScreen from './component/HomeScreen';









const Stack = createStackNavigator();


function RootStack() {

    return (
        <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ gestureEnabled: false }}
        >
            <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{  headerShown:false }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{  headerShown:false }}
            />
            <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{  headerShown:false }}
            />
             <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{  headerShown:false }}
            />
        </Stack.Navigator>
    );
}

export default RootStack;