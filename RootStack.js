
import { createStackNavigator, CardStyleInterpolator, TransitionPresets } from '@react-navigation/stack';
import SignInScreen from "./component/SignInScreen";
import SignUpScreen from "./component/SignUpScreen";
import SplashScreen from "./component/SplashScreen";
import React from 'react';
import HomeScreen from './component/HomeScreen';
import ChartScreen from './component/ChartScreen';
import SensorScreen from './component/SensorScreen';
import DeviceScreen from './component/DeviceScreen';
import SettingScreen from './component/SettingScreen';
import LimitHumidScreen from './component/LimitHumidScreen';
import ControlScreen from './component/ControlScreen';
import LogScreen from './component/LogScreen';
import ChangeIntensityScreen from './component/ChangeIntensityScreen';
import DevicesLogScreen from './component/DevicesLogScreen';









const Stack = createStackNavigator();

const config = {

    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};

function RootStack() {

    return (
        <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
                gestureEnabled: false,
            }}
        >
            <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                    headerShown: false,
                    gestureEnabled: true,
                    gestureDirection: 'vertical'
                }}



            />
            <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                    headerShown: false,
                    gestureEnabled: true,
                    gestureDirection: 'vertical'
                }}
            />

            <Stack.Screen
                name="LimitHumid"
                component={LimitHumidScreen}
                options={{
                    title: "Giới hạn độ ẩm",
                    headerTitleStyle: {
                        paddingRight: 60,
                        alignSelf: 'center'
                    },
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            />
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                }}

            />

            <Stack.Screen
                name="Chart"
                component={ChartScreen}
                options={{

                    title: "Biểu đồ độ ẩm",
                    headerTitleStyle: {
                        paddingRight: 40,
                        alignSelf: 'center'
                    },

                    ...TransitionPresets.SlideFromRightIOS,
                }}
            />

            <Stack.Screen
                name="ChangeIntensity"
                component={ChangeIntensityScreen}
                options={{

                    title: "Điền chỉnh cường độ",
                    headerTitleStyle: {
                        paddingRight: 40,
                        alignSelf: 'center'
                    },

                    ...TransitionPresets.SlideFromRightIOS,
                }}
            />

            <Stack.Screen
                name="Sensor"
                component={SensorScreen}
                options={{
                    title: "Danh Sách cảm biến",
                    headerTitleStyle: {
                        paddingRight: 40,
                        alignSelf: 'center'
                    },
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            />

            <Stack.Screen
                name="Device"
                component={DeviceScreen}

                options={{
                    title: "Danh Sách thiết bị",
                    headerTitleStyle: {
                        paddingRight: 40,
                        alignSelf: 'center'
                    },
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            />

            <Stack.Screen
                name="Setting"
                component={SettingScreen}

                options={{
                    title: "Thiết lập tài khoản",
                    headerTitleStyle: {
                        paddingRight: 40,
                        alignSelf: 'center'
                    },
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            />

            <Stack.Screen
                name="Log"
                component={LogScreen}

                options={{
                    title: "Báo cáo hoạt động",
                    headerTitleStyle: {
                        paddingRight: 40,
                        alignSelf: 'center'
                    },
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            />

            <Stack.Screen
                name="DevicesLog"
                component={DevicesLogScreen}

                options={{
                    title: "Nhật ký thiết bị",
                    headerTitleStyle: {
                        paddingRight: 40,
                        alignSelf: 'center'
                    },
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            />

            <Stack.Screen
                name="Control"
                component={ControlScreen}

                options={{
                    title: "Điều khiến thiết bị",
                    headerTitleStyle: {
                        paddingRight: 40,
                        alignSelf: 'center'
                    },
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            />
        </Stack.Navigator>
    );
}

export default RootStack;