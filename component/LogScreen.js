

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList
} from "react-native";
import firestore from '@react-native-firebase/firestore';

function LogScreen({ navigation }) {

  const [check_textInputChange, setCheck_textInputChange] = useState(false);
  const [logList, setLogList] = useState([]);
  const ref = firestore().collection('Log').orderBy("Time");
  const [loading, setLoading] = useState(true);

  const compareDate = (date1, date2) => {
    if (date1.getDay() != date2.getDay()) {
      return false;
    }
    else if (date1.getMonth() != date2.getMonth()) {
      return false;
    }
    else if (date1.getFullYear() != date2.getFullYear()) {
      return false;
    }
    return true;
  }

  useEffect(() => {
    ref.onSnapshot((querySnapshot) => {
      var list = [];
      querySnapshot.forEach(doc => {
        const { Time, Messages } = doc.data();
        // console.log(doc)


        list.push({
          id: doc.id,
          Time: new Date(Time ? Time._seconds * 1000 : 0),
          Messages,
        });
      });


      // đảo ngược list
      var oldList = []
      for (let index = list.length - 1; index >= 0; index--) {
        oldList.push(list[index]);
      }

      var formatList = [];
      oldList.forEach(item1 => {
        var check = false;
        formatList.forEach(item2 => {
          if (compareDate(item1.Time, item2.Time) == true) {
            item2.List.push({
              Time:item1.Time,
              Messages:item1.Messages
            });
            check = true;
          }
        });

        if (check == false) {
          formatList.push({
            Time: item1.Time,
            List: [{
              Time:item1.Time,
              Messages:item1.Messages
            }],
          });


        }
      });
      console.log(formatList);

      setLogList(formatList);
      if (loading) {
        setLoading(false);
      }
    });


  }, []);


  if (loading) {
    return null;
  }

  const getDayNameString = (i) => {
    if (i == 1) {
      return 'Chủ nhật';
    }
    else if (i == 2) {
      return 'Thứ hai'
    }
    else if (i == 3) {
      return 'Thứ ba'
    }
    else if (i == 4) {
      return 'Thứ tư'
    }
    else if (i == 5) {
      return 'Thứ năm'
    }
    else if (i == 6) {
      return 'Thứ sáu'
    }
    else if (i == 7) {
      return 'Thứ bảy'
    }
  }

  const renderLogView = (list) => {
    if(list){
      return list.map((item) => {
        return (
          <View style={[styles.item_log,]}>
            <Text style={styles.item_log_time}>
              {item.Time.getHours() + ":" + item.Time.getMinutes()}
            </Text>
            <Text style={styles.item_log_messages}>{item.Messages}</Text>
          </View>
        )
      });
    }
    else{
      return null
    }
  }

  var a = new Date()

  return (
    <View style={styles.container}>

      <FlatList

        data={logList}
        extraData={logList}
        renderItem={({ item }) => {

          return <View style={[styles.item]}>
            <View style={styles.title}>
            <Text style={styles.title_text}>
              {getDayNameString(item.Time.getDay())}, {item.Time.getDate() + "-" + a.getMonth()}
            </Text>
            </View>
            {
              renderLogView(item.List)
            }
          </View>
        }

        }
      />
    </View>
  );
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"

  },
  item: {
    display: "flex",
  },

  title:{
    width:"100%",
    backgroundColor:"#e4eaee",
  },

  title_text:{
    fontSize:18,
    paddingVertical:16,
    paddingHorizontal:10,
  },

  item_log:{
    flexDirection: "row",
    borderColor:"#ced9df",
    alignItems:"center",
    borderBottomWidth:1,
    paddingVertical:16,
    paddingHorizontal:10,
  },

  item_log_time:{
    paddingRight: 20,
    fontSize:18,
    fontWeight:"bold",
    width:"20%",
  },
  item_log_messages:{
    width:"80%",
    fontSize:16,
  },


});

export default LogScreen