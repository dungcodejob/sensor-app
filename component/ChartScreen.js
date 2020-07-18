import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StatusBar, StyleSheet, TextInput, Button, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import firestore from '@react-native-firebase/firestore';
import ReactNativePickerModule from "react-native-picker-module"

const screenWidth = Dimensions.get("window").width;

function ChartScreen({ navigation }) {

  let pickerRef = null
  const [valueText, setValueText] = useState("Tất cả");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [areaNameText, setAreaNameText] = useState([]);

  const refLogHumid = firestore().collection('Consult_Humid_from_Sensor');
  const [logHumidList, setLogHumidList] = useState([]);

  const refSensor = firestore().collection('HumidSensor');
  const [sensorList, setSensorList] = useState([]);

  const refArea = firestore().collection('AreaPlant');
  const [areaList, setAreaList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNameArea = (list) => {
    const nameList = [];
    nameList.push("Tất cả")
    list.forEach(item => {
      nameList.push(item.AreaId);
    });
    setAreaNameText(nameList);
  }

  useEffect(() => {

    console.log("getArea");
    refArea.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { location, quantityofplant, typeplant } = doc.data();
        // console.log(doc)
        list.push({
          AreaId: doc.id,
          location,
          quantityofplant,
          typeplant,
        });
      });

      getNameArea(list);
      setAreaList(list);
    });


  }, []);

  useEffect(() => {

    refSensor.onSnapshot(async (querySnapshot) => {
      var list = [];
      querySnapshot.forEach(doc => {
        const { AreaId, status } = doc.data();
        // console.log(doc)
        list.push({
          id: doc.id,
          AreaId,
          status,
        });
      });

      setSensorList(list);
    });

    if (loading) {
      setLoading(false);
    }
  }, []);


  useEffect(() => {

    refSensor.onSnapshot(async (querySnapshot) => {
      var list = [];
      querySnapshot.forEach(doc => {
        const { SID, Time,Humid } = doc.data();
        // console.log(doc)
        list.push({
          id: doc.id,
          SID,
          Humid,
          Time: new Date(Time ? Time._seconds * 1000 : 0),

        });
      });


      setLogHumidList(list);

      var sensorListV2 = sensorList;
      sensorListV2.forEach(sensor => {
        sensorListV2.logHumid = [];
        list.forEach(humid => {
          if(humid.SID == sensor.id){
            sensorListV2.logHumid.push(humid);
          }
        });
      });

      setSensorList(sensorListV2);
    });

    if (loading) {
      setLoading(false);
    }


  }, []);


  if (loading) {
    return null;
  }

  const line = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        strokeWidth: 2, // optional
      },
    ],
  };

  const chartConfig = {

    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  return (
    <View style={styles.container}>


      <LineChart
        data={line}
        width={screenWidth}
        height={256}

        chartConfig={chartConfig}

      />

      <TouchableOpacity
        style={{
          paddingVertical: 8,
          borderBottomWidth: 1,
          borderTopWidth: 1,
          borderColor: "rgba(0,0,0,.32)",
        }}
        onPress={() => {
          pickerRef.show();
        }}>
        <View style={styles.selectBox}>
          <Text style={styles.selectBox_text}>Khu Vực: {valueText}</Text>
          <Feather style={styles.selectBox_icon} name="chevron-down" size={25} />
        </View>
        {/* <Text style={[{paddingHorizontal:10},{paddingVertical:10},{fontSize:16},{paddingBottom:5}]}>Số thiết bị hoạt động: {deviceAction + "/" + deviceList.length}</Text> */}

      </TouchableOpacity>
      {/* <Text>Selected Item Text: {valueText}</Text>
      <Text>Selected Item ID: {selectedIndex}</Text> */}
      <ReactNativePickerModule
        pickerRef={e => (pickerRef = e)}
        selectedValue={selectedIndex}
        title={"Select a Area"}
        items={areaNameText}
        onDismiss={() => {
          console.log("onDismiss")
        }}
        onCancel={() => {
          console.log("Cancelled")
        }}
        onValueChange={(valueText, index) => {
          // console.log("value: ", valueText)
          // console.log("index: ", index)
          setValueText(valueText)
          setSelectedIndex(index)
          console.log(sensorList)
          // getDevices(index)
        }}
      />

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



});

export default ChartScreen