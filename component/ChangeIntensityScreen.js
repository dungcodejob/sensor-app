
import React, { useState, useEffect } from 'react';
import { View, Alert, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import firestore from '@react-native-firebase/firestore';
import Feather from "react-native-vector-icons/Feather";
import ReactNativePickerModule from "react-native-picker-module"
import SplashScreen from "./SplashScreen";

import MQTT from 'sp-react-native-mqtt';

function ChangeIntensityScreen({ navigation, route }) {



    // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    // const [dataSource, setDataSource] = useState(ds.cloneWithRows(['row 1', 'row 2']));
    const [humidList, setHumidList] = useState([]);
    const [loading, setLoading] = useState(true);

    const [range, setRange] = useState([]);
    const refDevice = firestore().collection('Devices').doc(route.params.id)
    const [device, setDevice] = useState(null);




    useEffect(() => {
        var dv = null;
        const subscriber = firestore()
            .collection('Devices')
            .doc(route.params.id)
            .onSnapshot(documentSnapshot => {
                const { AID, type, status, Name } = documentSnapshot.data();
                dv = {
                    id: documentSnapshot.id,
                    AID,
                    type,
                    status,
                    Name,
                }
                setDevice(dv);
                if (loading) {
                    setLoading(false);
                }
            });



    }, []);




    if (loading) {
        return SplashScreen;
    }


    const update = () => {

        if (selectedIndex == null) {
            Alert.alert('vui lòng chọn khu vực!');
            return;
        }
        if (!lowerBound || !upperBound) {
            Alert.alert('giới hạn trên hoặc giới hạn dưới không được phép để trống!');
            return;
        }
        else if (lowerBound > upperBound) {
            Alert.alert('giới hạn trên phải lớn hơn giới hạn dưới!');
            return;
        }
        else if (lowerBound > 100 || upperBound > 100) {
            Alert.alert('giới hạn độ ẩm phải ở trong khoảng từ 0 tới 100!');
            return;
        }
        else {
            console.log(selectedIndex);

            var oldLowerBound = humidList[selectedIndex].lowerbound;
            var oldUpperBound = humidList[selectedIndex].upperbound;
            var text = "Giới hạn độ ẩm của khu vực " + humidList[selectedIndex].id
                + " được thay đổi từ " + oldLowerBound + " - " + oldUpperBound
                + "%  thành " + lowerBound + " - " + upperBound + "%";


            // firestore().collection('AreaPlant').doc(humidList[selectedIndex].id)
            //     .update({
            //         lowerbound: parseInt(lowerBound),
            //         upperbound: parseInt(upperBound),
            //     }).then(() => {
            //         console.log('Cập nhật thành công!');
            //         Alert.alert('Cập nhật thành công!');
            //         setLowerBound(0);
            //         setUpperBound(0);
            //         addLog(text);
            //         return ref.get();
            //     });
        }

    }

    const addLog = () => {
        if (!range) {
            Alert.alert('vui lòng nhập giá trị cường độ!');
            return;
        }
        if (range > 5000 || range < 0) {
            Alert.alert('giới hạn trên cường độ từ 0 -> 5000 (tương ứng với không bật, hoặc bật mạnh tối đa)');
            return;
        }

        var mess_send = '[{"device_id":"' + device.id + '","values":["0","' + range + '"]}]'

        /// Test mqtt
        console.log("MQTT Connect")
        const host1 = '52.187.125.59'
        const port1 = 1883
        const username = 'BKvm'
        const password = 'Hcmut_CSE_2020'

        /// Connect mqtt

        MQTT.createClient({
            uri: 'mqtt://52.187.125.59:1883',
            clientId: 'Nhom4',
            user: username,
            pass: password
        }).then(function (client) {

            client.on('closed', function () {
                console.log('mqtt.event.closed');
            });

            client.on('error', function (msg) {
                Alert.alert('Server has problem');
                console.log('mqtt.event.error', msg);
            });

            client.on('message', function (msg) {
                console.log('mqtt.event.message', msg);
            });

            client.on('connect', function () {
                console.log('connected');
                client.subscribe('Topic/Speaker', 0);
                client.publish('Topic/Speaker', mess_send, 0, false);
                Alert.alert('Cập nhật thành công!');
            });

            client.connect();
        }).catch(function (err) {
            console.log(err);
        });

        firestore()
            .collection('DevicesLog')
            .add({
                DID: device.id,
                Time: firestore.FieldValue.serverTimestamp(),
                Range: parseInt(range),
            })
            .then(() => {
                console.log('log added!');
            });
    }

    return (

        <View style={styles.container}>

            <View style={[{ flex: 1 }, { backgroundColor: "#fff" }, { padding: 16 }]}>
                <Text style={[styles.title, { fontSize: 22 }, { fontWeight: "700" }, { marginBottom: 10 }]}>Thông tin thiết bị</Text>
                <View style={styles.info}>
                    <Text style={styles.info_text}>Tên thiết bị: {device.Name}</Text>
                    <Text style={styles.info_text}>Loại: {device.type}</Text>
                    <Text style={[styles.info_text, { borderBottomWidth: 0 }]}>Trạng thái: {device.status ? 'hoạt động' : 'không hoạt động'}</Text>
                </View>

                <View style={styles.action}>
                    <Text style={[{ width: 'auto' }, { marginLeft: 10 }, { fontSize: 18 }]}>Nhập cường độ :</Text>
                    <TextInput
                        placeholder=""
                        style={styles.textInput}
                        value={range}
                        keyboardType='numeric'
                        onChangeText={value => setRange(value)}
                    />

                </View>
                <TouchableOpacity
                    onPress={() => addLog()}
                    style={[styles.signIn, { backgroundColor: "#5db8fe" }]}>

                    <Text style={[styles.textSign]}>
                        Cập nhật
                </Text>
                </TouchableOpacity>
            </View>


        </View>
    );
}

var styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#EDF0F8"
    },

    selectBox: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: 'row',
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#6aa8fd",
        backgroundColor: "#fff",
        marginHorizontal: 8,
        borderRadius: 4,
    },

    selectBox_text: {
        fontSize: 16,
        fontWeight: "700",
        paddingHorizontal: 12,
        paddingVertical: 8,
    },

    selectBox_icon: {
        paddingHorizontal: 8,
    },

    card: {
        display: "flex",
        backgroundColor: "#fff",
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "rgba(0,0,0,.32)",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 12,
        height: "auto",
        margin: 16,
    },

    card_title: {
        fontSize: 18,
    },

    status_card: {
        borderRadius: 30,
    },

    status_cardText: {
        color: "#fff",
        fontWeight: "700",
        paddingHorizontal: 8,
        paddingVertical: 2,


    },

    title: {
        color: "#05375a",
        fontSize: 18
    },
    info: {
        borderColor: "#343a49",
        borderWidth: 2,
        borderRadius: 5,
    },
    info_text: {
        color: "#05375a",
        fontSize: 18,
        borderBottomWidth: 1,
        borderColor: "#343a49",
        padding: 10
    },

    action: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#4dc2f8",
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 10

    },

    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: "#05375a",
        fontSize: 18,
    },

    signIn: {
        marginTop: 10,
        width: "auto",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,

    },

    textSign: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff"
    }

});



export default ChangeIntensityScreen


