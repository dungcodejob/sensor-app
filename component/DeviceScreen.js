
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import ReactNativePickerModule from "react-native-picker-module"

import ListViewDevice from "./ListView/ListViewDevice";
import firestore from '@react-native-firebase/firestore';
import * as Animetable from "react-native-animatable";


function DeviceScreen({ navigation }) {

  const [todo, setTodo] = useState('');
  let pickerRef = null
  const [valueText, setValueText] = useState()
  const [selectedIndex, setSelectedIndex] = useState(null)
  var ref = firestore().collection('Devices');
  const refArea = firestore().collection('AreaPlant')
  const [refresh,setRefresh] = useState(true);
  //
  async function addTodo() {
    await ref.add({
      title: todo,
      complete: false,
    });
    setTodo('');
  }


  const [areaNameText, setAreaNameText] = useState([]);
  const getNameArea = (list) => {
    const nameList = [];
    list.forEach(item => {
      nameList.push(item.AreaId);
    });
    setAreaNameText(nameList);
  }

  const [areaList, setAreaList] = useState([])
  const [loading, setLoading] = useState(true)
  const [todos, setTodos] = useState([])

  const getDevices = async (index) => {
    console.log(areaList[index].AreaId);
    var query = ref.where("AreaId", "==", areaList[index].AreaId);
    setTodos([]);
    await query.onSnapshot((querySnapshot) => {
      var list = [];
      querySnapshot.forEach(doc => {
        const { AID, type, status } = doc.data();
        // console.log(doc)
        list.push({
          id: doc.id,
          AID,
          type,
          status,
        });
      });
      console.log(list);

      setTodos(list);
      console.log(todos);
    });

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

    ref.onSnapshot((querySnapshot) => {
      var list = [];
      querySnapshot.forEach(doc => {
        const { AID, type, status } = doc.data();
        // console.log(doc)
        list.push({
          id: doc.id,
          AID,
          type,
          status,
        });
      });
      setTodos(list);

      if (loading) {
        setLoading(false);
      }
    });


  }, []);


  if (loading) {
    return null;
  }




  // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  // const [dataSource, setDataSource] = useState(ds.cloneWithRows(['row 1', 'row 2']));

  var buttonAnimationDuration = 0;
  return (

    <View style={styles.container}>
      <TouchableOpacity
        style={{
          paddingVertical: 24,
        }}
        onPress={() => {
          pickerRef.show();
        }}>
        <Text>Show Language Picker</Text>
      </TouchableOpacity>
      <Text>Selected Item Text: {valueText}</Text>
      <Text>Selected Item ID: {selectedIndex}</Text>

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
          getDevices(index)
        }}
      />

      <FlatList

        data={todos}
        extraData={refresh}
        renderItem={({ item }) =>

          <Animetable.View
            animation="fadeInLeft"
            duration={buttonAnimationDuration += 1000}
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
      />
    </View>
  );
}

var styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#EDF0F8"
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

export default DeviceScreen


