import React from 'react';
import { View, Text, Image, StatusBar, StyleSheet, TextInput, Button, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";




function HomeScreen({ navigation }) {

  return (
    <View style={styles.container}>

      <View style={styles.average}>
        <Text style={styles.average_text}>Độ ẩm trung bình: 45</Text>
         </View>

      <View style={styles.list_group}>
        {/* <Text style={[
          {padding:0},
          {paddingBottom:10},
          {fontWeight:'bold'},
          {fontSize:24},
        ]}> THIẾT BỊ </Text> */}
        <View style={[{ flexDirection: 'row' }, { justifyContent: 'space-between' }]}>

          <View style={styles.box}>
            {/* <FontAwesome style={styles.box_icon} name="thermometer-three-quarters" color="#05375a" size={60} /> */}
            <Image style={styles.box_icon} source={require("../assets/sensor.png")} />
            <Text style={styles.box_title}>Cảm biến độ ẩm</Text>
            <Text style={styles.box_info}>Hoạt động: 3/5</Text>
            {/* <Button style={styles.box_button} title="Press me"/> */}

            <TouchableOpacity style={styles.box_button}>
              <Text style={styles.box_button_text}>Xem Danh Sách</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.box}>
            {/* <FontAwesome style={styles.box_icon} name="thermometer-three-quarters" color="#05375a" size={60} /> */}
            <Image style={[styles.box_icon,
            { marginTop: 20 },
            { marginRight: 0 },
            { marginBottom: 10 },]} source={require("../assets/sprinkler.png")} />
            <Text style={styles.box_title}>Thiết bị tưới nước</Text>
            <Text style={styles.box_info}>Hoạt động: 1/5</Text>
            {/* <Button style={styles.box_button} title="Press me"/> */}


            <TouchableOpacity style={styles.box_button}>
              <Text style={styles.box_button_text}>Xem Danh Sách</Text>
            </TouchableOpacity>

          </View>
        </View>


      </View>
      
      <View style={styles.menu}>

      <TouchableOpacity style={styles.card}>
              <View style={[{ flexDirection: 'row' }, { alignItems: 'center' }]}>
              <Feather style={styles.card_icon} name="thermometer"  size={30} />
              <Text style={styles.card_text}>
                Giới hạn độ ẩm
              </Text>
              </View>

              <Feather style={[ { marginRight: 10 }]}  name="chevron-right"  size={20} />

        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
              <View style={[{ flexDirection: 'row' }, { alignItems: 'center' }]}>
              <Feather style={styles.card_icon} name="bar-chart-2"  size={30} />
              <Text style={styles.card_text}>
                Biểu đồ độ ẩm
              </Text>
              </View>

              <Feather style={[ { marginRight: 10 }]}  name="chevron-right"  size={20} />

        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
              <View style={[{ flexDirection: 'row' }, { alignItems: 'center' }]}>
              <Feather style={styles.card_icon} name="file-text"  size={30} />
              <Text style={styles.card_text}>
                Báo cáo hoạt động
              </Text>
              </View>

              <Feather style={[ { marginRight: 10 }]}  name="chevron-right"  size={20} />

        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
              <View style={[{ flexDirection: 'row' }, { alignItems: 'center' }]}>
              <Feather style={styles.card_icon} name="settings"  size={30} />
              <Text style={styles.card_text}>
                Thiết lập tài khoản
              </Text>
              </View>

              <Feather style={[ { marginRight: 10 }]}  name="chevron-right"  size={20} />

        </TouchableOpacity>

        
      </View>
    </View>
  );
}



var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f0f1'
  },


  average:{
    flex: 1,
    // backgroundColor:'#f5a942',
    paddingHorizontal: 20,
  },

  average_text:{
    paddingTop:30,

    fontSize:24,
    fontWeight:'bold',
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
    justifyContent:'space-between',
    marginBottom: 10,
    marginTop: 10,

    flexDirection: 'row',

    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.32,
shadowRadius: 5.46,

elevation: 9,
  },

  card_icon:{
    padding:10,
    // borderWidth:2,
    marginRight:5,
    margin:3,
    
  },

  card_text:{
    fontSize:18
  },




});

export default HomeScreen