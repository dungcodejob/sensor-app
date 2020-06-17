import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import * as Animetable from "react-native-animatable";






function HomeScreen({ navigation }) {

  const initialArr = [
    {
      title: 'Giới hạn độ ẩm',
      icon: 'thermometer',
      address:'LimitHumid'
    },
    {
      title: 'Biểu đồ độ ẩm',
      icon: 'bar-chart-2',
      address:'Chart',
    },
    {
      title: 'Báo cáo hoạt động',
      icon: 'file-text',
      address:'Log',
    },
    {
      title: 'Thiết lập tài khoản',
      icon: 'settings',
      address:'Setting',
    },
  ];



  const renderButtons = () => {

    var buttonAnimationDuration = 1000;

    return initialArr.map((buttonInfo) => {
      buttonAnimationDuration += 200;
      return (
        <Animetable.View animation="fadeInLeft" duration={buttonAnimationDuration} >
          <TouchableOpacity style={styles.card}
        onPress={() =>  {
          if(buttonInfo.address){
            navigation.navigate(buttonInfo.address);
          }
        }}>
          <View style={[{ flexDirection: 'row' }, { alignItems: 'center' }]}>
            <Feather style={styles.card_icon} name={buttonInfo.icon} size={30} />
            <Text style={styles.card_text}>
              {buttonInfo.title}
            </Text>
          </View>

          <Feather style={[{ marginRight: 10 }]} name="chevron-right" size={20} />

        </TouchableOpacity>
        </Animetable.View>
        
      );
      
    });
  };

  return (
    <View style={styles.container}>

      <View style={styles.average}>
        <Text style={styles.average_text}>Độ ẩm trung bình: 45</Text>
      </View>

      <View style={styles.list_group}>
        <View style={[{ flexDirection: 'row' }, { justifyContent: 'space-between' }]}>


          <Animetable.View animation="bounceIn"
            duration={1500} style={styles.box}>
            <Image style={styles.box_icon} source={require("../assets/sensor.png")} />
            <Text style={styles.box_title}>Cảm biến độ ẩm</Text>
            <Text style={styles.box_info}>Hoạt động: 3/5</Text>

            <TouchableOpacity 
             onPress={() => {navigation.navigate("Sensor")}}
            style={styles.box_button}>
              <Text style={styles.box_button_text}>Xem Danh Sách</Text>
            </TouchableOpacity>
          </Animetable.View>


          <Animetable.View animation="bounceIn"
            duration={1500} style={styles.box}>
            <Image style={[styles.box_icon,
            { marginTop: 20 },
            { marginRight: 0 },
            { marginBottom: 10 },]} source={require("../assets/sprinkler.png")} />
            <Text style={styles.box_title}>Thiết bị tưới nước</Text>
            <Text style={styles.box_info}>Hoạt động: 1/5</Text>


            <TouchableOpacity
            onPress={() => {navigation.navigate("Device")}}
             style={styles.box_button}>
              <Text style={styles.box_button_text}>Xem Danh Sách</Text>
            </TouchableOpacity>

          </Animetable.View>
        </View>


      </View>

      <View style={styles.menu}>
        {
          renderButtons()
        }
        
      </View>
    </View>
  );
}



var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f0f1'
  },


  average: {
    flex: 1,
    // backgroundColor:'#f5a942',
    paddingHorizontal: 20,
  },

  average_text: {
    paddingTop: 30,

    fontSize: 24,
    fontWeight: 'bold',
    // color:'#fff'
  },

  list_group: {
    flex: 3,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },

  box: {
    height: "auto",
    width: 175,
    backgroundColor: '#fff',
    borderRadius: 5,



  },
  box_title: {
    fontSize: 18,
    marginLeft: 10,
    fontFamily: 'system font',
    fontWeight: "bold",
  },

  box_info: {
    fontSize: 14,
    marginLeft: 10,
    fontFamily: 'system font',
    fontWeight: "normal",
    color: '#abacaf',
  },

  box_icon: {
    marginTop: 15,
    marginRight: 10,
    marginBottom: 15,
    width: 100,
    height: 100,
    alignSelf: 'center'

  },

  box_button: {
    alignItems: 'center',
    marginTop: 5,
    borderColor: "#4dc2f8",
    borderWidth: 2,
    borderRadius: 5,
    // backgroundColor:'#2196f3',

  },

  box_button_text: {
    color: '#4dc2f8',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 8,

  },






  menu: {
    flex: 4,

    paddingHorizontal: 20,
    paddingVertical: 10,
    // backgroundColor: "red",
  },

  card: {
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,

    flexDirection: 'row',
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.32,
    // shadowRadius: 5.46,

    // elevation: 9,
  },

  card_icon: {
    padding: 10,
    // borderWidth:2,
    marginRight: 5,
    margin: 3,

  },

  card_text: {
    fontSize: 18
  },




});

export default HomeScreen