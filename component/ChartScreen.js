import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet,  TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import firestore from '@react-native-firebase/firestore';
import ReactNativePickerModule from "react-native-picker-module"

const screenWidth = Dimensions.get("window").width;

function ChartScreen({ navigation }) {

  let pickerRef = null
  const [valueText, setValueText] = useState("Tất cả");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [areaNameText, setAreaNameText] = useState([]);


  const refLogHumid = firestore().collection('SensorLog');
  const [logHumidList, setLogHumidList] = useState([]);

  const refSensor = firestore().collection('HumidSensor');
  const [sensorList, setSensorList] = useState([]);

  const refArea = firestore().collection('AreaPlant');
  const [areaList, setAreaList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [mode, setMode] = useState(0);

  const getNameArea = (list) => {
    const nameList = [];
    nameList.push("Tất cả")
    list.forEach(item => {
      nameList.push(item.AreaId);
    });
    setAreaNameText(nameList);
  }

  const getLables = () => {
    let lableString = [];
    let lableNumber = [];
    let day = new Date();
    day.setDate(day.getDate() - 7);
    if(mode == 0){
      for (let index = 6; index >= 0; index--) {
        day.setDate(day.getDate() + 1);
        lableString.push(day.getDate() + '/' + (day.getMonth() + 1));
        lableNumber.push(day.getDate());
      }
    }
    return  {lableString, lableNumber};
  }

  const [lableList, setLableList] = useState(getLables().lableString);
  const [dataChart, setDataChart] = useState([0,0,0,0,0,0,0]);


  const getHumidOfDay = (humidList,day) => {
    var humidSum = 0;
    var length = 0;

    humidList.forEach(element => {
      if(element.Time.getDate() == day){
        
        humidSum += parseFloat(element.Humid);
        length += 1;
      }
    });

    if(length != 0){
      return humidSum / length;
    }

    return 0;
  }


  const getSensor = (index) => {
    var query = refSensor;


    if (index != 0) { 
      query = query.where("AreaId", "==", areaList[index - 1].AreaId);
    }

    query.onSnapshot(async (querySnapshot) => {
      const sList = [];
      await querySnapshot.forEach(doc => {
        const { AreaId, Name, status } = doc.data();
        // console.log(doc)
        sList.push({
          id: doc.id,
          AreaId,
          Name,
          status,
          loglist: [],
        });
      });

      refLogHumid.onSnapshot((querySnapshot) => {
        const lList = [];
        var newSensorList  = [];
        querySnapshot.forEach(doc => {
          const { SID, Humid, Temp, Time } = doc.data();
          // console.log(doc)
          lList.push({
            id: doc.id,
            SID,
            Humid,
            Temp,
            Time: new Date(Time ? Time._seconds * 1000 : 0),
          });
        });

        

        sList.forEach(sensorItem => {
          lList.forEach(logItem => {
            if (sensorItem.id == logItem.SID) {
              sensorItem.loglist.push(logItem);
            }
          });

          newSensorList.push(sensorItem);
        });

        var labels = getLables().lableNumber;
        var data = [];
        labels.forEach(element => {
          var humidSum = 0;
          var length = 0;
          newSensorList.forEach(sensor => {

  

            humidSum += getHumidOfDay(sensor.loglist,element);
            if(humidSum != 0){
              length += 1;
            }
          });
          
          if(length == 0){
            length = 1;
          }

          data.push(humidSum/length);
          
        });
        

        console.log(data);
        setDataChart(data);
        setSensorList(newSensorList);

      });

    });
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
      const sList = [];
      await querySnapshot.forEach(doc => {
        const { AreaId, Name, status } = doc.data();
        // console.log(doc)
        sList.push({
          id: doc.id,
          AreaId,
          Name,
          status,
          loglist: [],
        });
      });

      refLogHumid.onSnapshot((querySnapshot) => {
        const lList = [];
        var newSensorList  = [];
        querySnapshot.forEach(doc => {
          const { SID, Humid, Temp, Time } = doc.data();
          // console.log(doc)
          lList.push({
            id: doc.id,
            SID,
            Humid,
            Temp,
            Time: new Date(Time ? Time._seconds * 1000 : 0),
          });
        });

        

        sList.forEach(sensorItem => {
          lList.forEach(logItem => {
            if (sensorItem.id == logItem.SID) {
              sensorItem.loglist.push(logItem);
            }
          });

          newSensorList.push(sensorItem);
        });

        var labels = getLables().lableNumber;
        var data = [];
        labels.forEach(element => {
          var humidSum = 0;
          var length = 0;
          newSensorList.forEach(sensor => {

  

            humidSum += getHumidOfDay(sensor.loglist,element);
            if(humidSum != 0){
              length += 1;
            }
          });
          
          if(length == 0){
            length = 1;
          }

          data.push(humidSum/length);

        });
        

        setDataChart(data);
        setSensorList(newSensorList);

      });

    });

    if (loading) {
      setLoading(false);
    }

  }, []);


   

  if(loading) {
    return null;
  }

  const line = {
    labels: lableList,
    datasets: [
      {
        data: dataChart,
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
        onValueChange={(valueText,index) => {
          // console.log("value: ", valueText)
          // console.log("index: ", index)
          setValueText(valueText)
          setSelectedIndex(index)
          getSensor(index)
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