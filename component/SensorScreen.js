
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import ReactNativePickerModule from "react-native-picker-module"
import Feather from "react-native-vector-icons/Feather";
import firestore from '@react-native-firebase/firestore';
import * as Animetable from "react-native-animatable";


function SensorScreen({ navigation }) {

  let pickerRef = null
  const [valueText, setValueText] = useState("Chọn khu vực");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [refresh, setRefresh] = useState(true);

  const [areaNameText, setAreaNameText] = useState([]);
  const getNameArea = (list) => {
    const nameList = [];
    nameList.push("Tất cả");
    list.forEach(item => {
      nameList.push(item.AreaId);
    });
    setAreaNameText(nameList);
  }


  const refSensor = firestore().collection('HumidSensor');
  const [sensorList, setSensorList] = useState([]);

  const refArea = firestore().collection('AreaPlant');
  const [areaList, setAreaList] = useState([]);
  const [loading, setLoading] = useState(true);


  const getSensors = async (index) => {
    var query = refSensor;

    console.log(index);
    if (index != 0) {
      query = query.where("AreaId", "==", areaList[index - 1].AreaId);
      setSensorList([]);
      await query.onSnapshot((querySnapshot) => {
        var list = [];
        querySnapshot.forEach(doc => {
          const { AID, status } = doc.data();
          // console.log(doc)
          list.push({
            id: doc.id,
            AID,
            type: "sensor",
            status,
          });
        });

        setSensorList(list);
      });
    }
    else{
      setSensorList([]);
    }
    setRefresh(!refresh);
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

    refSensor.onSnapshot((querySnapshot) => {
      var list = [];
      querySnapshot.forEach(doc => {
        const { AreaId, status } = doc.data();
        // console.log(doc)
        list.push({
          id: doc.id,
          AreaId,
          type: "sensor",
          status,
          logHumid,
        });
      });
      setSensorList([]);
      if (loading) {
        setLoading(false);
      }
    });


  }, []);


  if (loading) {
    return null;
  }

  const renderListView = () => {
    var animationDuration = 0;
    var i = 1000;
    return (
      <FlatList

        data={sensorList}
        extraData={refresh}
        renderItem={({ item }) => {
          i -= 200;
          return <Animetable.View
            animation="fadeInLeft"
            duration={animationDuration += i}
            style={styles.card}>
            <View>
              <Text style={styles.card_title}>{item.type}</Text>
            </View>
            <View>
              <Text style={[{ color: "#7d8a9a" }, { marginRight: 5 }, { marginBottom: 10 }, { textAlign: "right" }]}>Trạng thái</Text>
              {
                item.status == true ? (
                  <View style={[{ backgroundColor: "#67b373" }, styles.status_card]}>
                    <Text style={styles.status_cardText}>HOẠT ĐỘNG</Text>
                  </View>
                ) : (
                    <View style={[{ backgroundColor: "#f79229" }, styles.status_card]}>
                      <Text style={styles.status_cardText}>KHÔNG HOẠT ĐỘNG</Text>
                    </View>
                  )

              }
            </View>
          </Animetable.View>
        }

        }
      />
    )
  }


  // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  // const [dataSource, setDataSource] = useState(ds.cloneWithRows(['row 1', 'row 2']));

  return (

    <View style={styles.container}>
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
          getSensors(index)
        }}
      />
      {
        renderListView()
      }

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


  }


});

export default SensorScreen


