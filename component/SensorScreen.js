import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import ReactNativePickerModule from "react-native-picker-module"
import Feather from "react-native-vector-icons/Feather";
import firestore from '@react-native-firebase/firestore';
import * as Animetable from "react-native-animatable";


function SensorScreen({ navigation }) {

  let pickerRef = null
  const [valueText, setValueText] = useState("Tất cả");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [sensorList, setSensorList] = useState([]);
  const refSensor = firestore().collection('HumidSensor');
  const refArea = firestore().collection('AreaPlant');
  const refLog = firestore().collection('SensorLog').orderBy("Time");
  const [areaList, setAreaList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [areaNameText, setAreaNameText] = useState([]);
  const getNameArea = (list) => {
    const nameList = [];
    nameList.push("Tất cả")
    list.forEach(item => {
      nameList.push(item.AreaId);
    });
    setAreaNameText(nameList);
  }


  const calculateHumid = (datalist) => {
    datalist.forEach(item => {
      item.humid
    });
  }

  const getSensor = async (index) => {
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

      refLog.onSnapshot((querySnapshot) => {
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

      refLog.onSnapshot((querySnapshot) => {
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



        setSensorList(newSensorList);

      });

    });

    if (loading) {
      setLoading(false);
    }

  }, []);




  if (loading) {
    return null;
  }

  // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  // const [dataSource, setDataSource] = useState(ds.cloneWithRows(['row 1', 'row 2']));

  // const renderListView = () => {
  //   var animationDuration = 0;
  //   var i = 1000;

  //   return (
  //     <FlatList

  //       data={sensorList}
  //       extraData={sensorList}
  //       renderItem={({ item }) => {
  //         i -= 200;
  //         var time = new Date(item.datalist.length > 0 && item.datalist[item.datalist.length - 1].Time ? item.datalist[item.datalist.length - 1].Time._seconds * 1000 : 0);
  //         return <Animetable.View
  //           animation="fadeInLeft"
  //           duration={animationDuration += i}
  //           style={styles.card}>
  //           <View style={[{flexDirection: "row"},{display:"flex"},{justifyContent:"space-between"}]}>
  //           <View>
  //             <Text style={styles.card_title}>{item.id}</Text>
  //             <Text style={[{ fontSize: 16 },{marginTop:5}]}>{"Độ ẩm: " + (item.datalist.length > 0 ? item.datalist[item.datalist.length - 1].humid + "%" : '')}</Text>

  //           </View>
  //           <View>
  //             <Text style={[{ color: "#7d8a9a" }, { marginRight: 5 }, { marginBottom: 10 }, { textAlign: "right" }]}>Trạng thái</Text>
  //             {
  //               item.status == true ? (
  //                 <View style={[{ backgroundColor: "#67b373" }, styles.status_card]}>
  //                   <Text style={styles.status_cardText}>HOẠT ĐỘNG</Text>
  //                 </View>
  //               ) : (
  //                   <View style={[{ backgroundColor: "#f79229" }, styles.status_card]}>
  //                     <Text style={styles.status_cardText}>KHÔNG HOẠT ĐỘNG</Text>
  //                   </View>
  //                 )

  //             }
  //           </View>
  //           </View>


  //           <Text style={[{ fontSize: 16 },{marginTop:15}]}>
  //               {"Lần cập nhật cuối: " + (item.datalist.length > 0 ? 
  //                 (time.getDate()+'-'+ (time.getMonth() + 1)+'-'+time.getFullYear()+", ") + time.toLocaleTimeString() : '')}
  //               </Text>

  //         </Animetable.View>

  //       }

  //       }
  //     />
  //   )
  // }

  const renderListView = () => {
    var animationDuration = 0;
    var i = 1000;

    return (
      <FlatList

        data={sensorList}
        extraData={sensorList}
        renderItem={({ item }) => {
          i -= 200;
          console.log(item)
          // var time = new Date(item.loglist.length > 0 && item.loglist[item.loglist.length - 1].Time ? item.loglist[item.loglist.length - 1].Time._seconds * 1000 : 0);
          var time =item.loglist.length > 0 ?  item.loglist[item.loglist.length - 1].Time : null;

          return <Animetable.View
            animation="fadeInLeft"
            duration={animationDuration += i}
            style={styles.card}>
            <View style={[{ flexDirection: "row" }, { display: "flex" }, { justifyContent: "space-between" }]}>
              <View>
                <Text style={styles.card_title}>{item.Name}</Text>
                <Text style={[{ fontSize: 16 }, { marginTop: 5 }]}>{"Độ ẩm: " + (item.loglist.length > 0 ? item.loglist[item.loglist.length - 1].Humid + "%" : 'No value')}</Text>
                <Text style={[{ fontSize: 16 }, { marginTop: 5 }]}>{"Nhiệt độ: " + (item.loglist.length > 0 ? item.loglist[item.loglist.length - 1].Temp + "°C" : 'No value')}</Text>
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
            </View>


            <Text style={[{ fontSize: 16 }, { marginTop: 15 }]}>
              {"Lần cập nhật cuối: " + (item.loglist.length > 0 ?
                (time.getDate() + '-' + (time.getMonth() + 1) + '-' + time.getFullYear() + ", ") + time.toLocaleTimeString() : 'Chưa có dữ liệu')}
            </Text>

          </Animetable.View>

        }

        }
      />
    )
  }

  return (
    console.log(sensorList),
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
          getSensor(index)
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