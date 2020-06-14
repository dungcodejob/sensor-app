
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet,TouchableOpacity } from "react-native";
import ReactNativePickerModule from "react-native-picker-module"

import ListViewDevice from "./ListView/ListViewDevice";
import firestore from '@react-native-firebase/firestore';


function DeviceScreen({ navigation }) {

  const [todo, setTodo] = useState('');
  const [loading, setLoading] = useState(true)
  
  const [todos, setTodos] = useState([])
  const [areaList, setAreaList] = useState([])

  let pickerRef = null
  const [valueText, setValueText] = useState()
  const [selectedIndex, setSelectedIndex] = useState(null)
  const ref = firestore().collection('Devices').where("AreaId","==","A001");
  const refArea = firestore().collection('AreaPlant')

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

  useEffect(async () => {
    await getDevices();
    return refArea.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { location ,quantityofplant, typeplant } = doc.data();
        // console.log(doc)
        list.push({
          AreaId: doc.id,
          location,
          quantityofplant,
          typeplant,
        });
      });

      console.log("area");
      console.log(list);
      getNameArea(list);
      setAreaList(list);
      
      console.log("set area");
      console.log(todos);
      if (loading) {
        setLoading(false);
      }
    });


  }, []);

  if(loading){
    return null;
  }
  //
  async function getDevices()  {
    ref.onSnapshot((querySnapshot) => {
      var list = [];
      querySnapshot.forEach(doc => {
        const { AID ,type, status } = doc.data();
        // console.log(doc)
        list.push({
          id: doc.id,
          AID,
          type,
          status,
        });
      });

      console.log("list");
      console.log(list);

      setTodos(list);
      
      console.log("set todo");
      console.log(todos);
      if (loading) {
        setLoading(false);
      }
    });
  }




  // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  // const [dataSource, setDataSource] = useState(ds.cloneWithRows(['row 1', 'row 2']));


  return (
    <View style={styles.container}>
     

<TouchableOpacity
        style={{
          paddingVertical: 24,
        }}
        onPress={() => {
          pickerRef.show()
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
          console.log("value: ", valueText)
          console.log("index: ", index)
          setValueText(valueText)
          setSelectedIndex(index)
        }}
      />

      <ListViewDevice data={todos} />
    </View>
  );
}

var styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#EDF0F8"
  },





});

export default DeviceScreen


