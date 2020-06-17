
import React, { useState, useEffect }  from 'react';
import { View } from "react-native";

import Feather from "react-native-vector-icons/Feather";
import ListViewSensor from './ListView/ListViewSensor';
import firestore from '@react-native-firebase/firestore';



function SensorScreen({ navigation }) {


  // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  // const [dataSource, setDataSource] = useState(ds.cloneWithRows(['row 1', 'row 2']));
  const [sensorList, setSensorList] = useState([]);
  const refSensor = firestore().collection('HumidSensor');
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    refSensor.onSnapshot((querySnapshot) => {
      var list = [];
      querySnapshot.forEach(doc => {
        const { AreaId, status ,logHumid } = doc.data();
        // console.log(doc)
        list.push({
          id: doc.id,
          AreaId,
          status,
          logHumid,
        });
      });


      console.log(list);
      setSensorList(list);

      if (loading) {
        setLoading(false);
      }
    });


  }, []);


  if (loading) {
    return null;
  }


  return (

    <View>

      
    </View>
  );
}





export default SensorScreen


