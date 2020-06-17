
import React, { useState, useEffect } from 'react';
import { View,Alert, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import Feather from "react-native-vector-icons/Feather";
import ReactNativePickerModule from "react-native-picker-module"
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { color } from 'react-native-reanimated';
import SplashScreen from "./SplashScreen";



function LimitHumidScreen({ navigation }) {

  // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  // const [dataSource, setDataSource] = useState(ds.cloneWithRows(['row 1', 'row 2']));
  let pickerRef = null
  const [lowerBound, setLowerBound] = useState();
  const [upperBound, setUpperBound] = useState();
  const [humidList, setHumidList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [valueText, setValueText] = useState("Tất cả");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const ref = firestore().collection('AreaPlant');

  const [areaNameText, setAreaNameText] = useState([]);
  const getNameArea = (list) => {
    const nameList = [];
    list.forEach(item => {
      nameList.push(item.id);
    });
    setAreaNameText(nameList);
  }


  useEffect(() => {
    ref.onSnapshot((querySnapshot) => {
      var list = [];
      querySnapshot.forEach(doc => {
        const { AID, lowerbound, upperbound } = doc.data();
        // console.log(doc)
        list.push({
          id: doc.id,
          lowerbound,
          upperbound,
        });
      });

      getNameArea(list);
      setHumidList(list);
      if (loading) {
        setLoading(false);
      }
    });


  }, []);


  if (loading) {
    return SplashScreen;
  }


  const update = () => {

    if (!selectedIndex) {
      Alert.alert('vui lòng chọn khu vực!');
      return;
    }
    if (!lowerBound || !upperBound) {
      Alert.alert('giới hạn trên hoặc giới hạn dưới không được phép để trống!');
      return;
    }
    else if(lowerBound > upperBound){
      Alert.alert('giới hạn trên phải lớn hơn giới hạn dưới!');
      return;
    }
    else if(lowerBound > 100 || upperBound > 100){
      Alert.alert('giới hạn độ ẩm phải ở trong khoảng từ 0 tới 100!');
      return;
    }
    else{
      console.log(selectedIndex);
      firestore().collection('AreaPlant').doc(humidList[selectedIndex].id)
      .update({
        lowerbound: parseInt(lowerBound),
        upperbound: parseInt(upperBound),
      }).then(() => {
        console.log('Cập nhật thành công!');
        Alert.alert('Cập nhật thành công!');
        setLowerBound(0);
        setUpperBound(0);
        return ref.get();
      });
    }
    
  }


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
          console.log(humidList)
        }}
      />

      <View style={[{ flex: 1 }, { backgroundColor: "#fff" }, { padding: 16 }]}>
        <Text style={styles.title}>{selectedIndex != null ? ("Giới hạn độ ẩm hiện tại :   " + humidList[selectedIndex].lowerbound + "  -  " + humidList[selectedIndex].upperbound + " %") : 'vui lòng chọn khu vực để xem giới hạn độ ẩm'} </Text>

        <Text style={[styles.title, { marginTop: 20 }]}>Đổi giới hạn độ ẩm</Text>

        <View style={styles.action}>
          <Text style={[{ width: 45 },{fontSize:18}]}>Từ    : </Text>
          <TextInput
            placeholder=""
            style={styles.textInput}
            value={lowerBound}
            keyboardType='numeric'
            onChangeText={value => setLowerBound(value)}
          />

          {/* {check_textInputChange ? (
          <Feather name="check-circle" color="green" size={20} />
        ) : null} */}
        </View>

        <View style={styles.action}>
        <Text style={[{ width: 45 },{fontSize:18}]}>Đến : </Text>
          <TextInput
            placeholder=""
            style={styles.textInput}
            keyboardType='numeric'
            value={upperBound}
            onChangeText={value => setUpperBound(value)}
          />

          {/* {check_textInputChange ? (
          <Feather name="check-circle" color="green" size={20} />
        ) : null} */}
        </View>
        <TouchableOpacity
        onPress={() => update()}
        style={[styles.signIn,{ backgroundColor: "#5db8fe"}]}>

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

  action: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    paddingBottom: 5,
    
  },

  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
    fontSize:18
  },

  signIn: {
    marginTop:20,
    width: "auto",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,

  },

  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    color:"#fff"
  }

});



export default LimitHumidScreen


