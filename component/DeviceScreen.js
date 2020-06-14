
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from "react-native";

import ListViewDevice from "./ListView/ListViewDevice";
import firestore from '@react-native-firebase/firestore';


function DeviceScreen({ navigation }) {

  const [todo, setTodo] = useState('');
  const [loading, setLoading] = useState(true)
  const [todos, setTodos] = useState([])
  const ref = firestore().collection('todos');
  const ref1 = firestore().collection('Devices');
  //
  async function addTodo() {
    await ref.add({
      title: todo,
      complete: false,
    });
    setTodo('');
  }
  //
  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { title, complete } = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });
      
      setTodos(list);
      console.log("todo list");
      console.log(todos);
      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return null;
  }

  const listViewRender = (list) => {
    return (
      <ListViewDevice data={list} />
    );
  }

  // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  // const [dataSource, setDataSource] = useState(ds.cloneWithRows(['row 1', 'row 2']));


  return (
    <View style={styles.container}>
      {/* <Feather
                onPress={() => { navigation.goBack(null) }}
                name="arrow-left" size={20} /> */}
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


