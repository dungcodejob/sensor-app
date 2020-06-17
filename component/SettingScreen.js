

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import auth from '@react-native-firebase/auth';
import { StackActions } from '@react-navigation/native';
function SettingScreen({ navigation }) {

  const [check_textInputChange, setCheck_textInputChange] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const textInputChange = (value) => {
    if (value) {
      // this.setState({
      //     check_textInputChange: true
      // });
      setEmail(value);
      setCheck_textInputChange(true);
    } else {
      // this.setState({
      //     check_textInputChange: false
      // });

      setCheck_textInputChange(false);
    }
  }


  const LogOut = async () => {
    console.log("LogOut button")
    auth()
      .signOut()
      .then(() => navigation.dispatch(StackActions.popToTop()));

    // navigation.dispatch(StackActions.popToTop());
  }




  return (
    <View style={styles.container}>
      <View style={[styles.item,{marginTop:20}]}>
        <View style={styles.item_info}>
          <MaterialIcons style={styles.item_icon} name="email" size={30} />
          <Text style={styles.item_text}>Gmail</Text>
        </View>

      </View>


      <View style={styles.item}>
        <View style={styles.item_info}>
          <MaterialIcons style={styles.item_icon} name="lock" size={30} />
          <Text style={styles.item_text}>Password</Text>
        </View>

      </View>

      <TouchableOpacity
        onPress={() => LogOut()}
        style={styles.item}>

        <View style={styles.item_info}>
          <MaterialIcons  style={styles.item_icon}  name="subdirectory-arrow-left" size={30}/>
          <Text style={[styles.item_text, ]}>Log out</Text>
        </View>


      </TouchableOpacity>


    </View>
  );
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  item: {
    height: 80,
    display: "flex",
    alignItems: "center",
    flexDirection: 'row',

  },

  item_info: {
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
  },

  item_icon: {
    marginLeft: 24,
    marginRight: 20,
  },

  item_text: {
    fontSize: 18

  }



});

export default SettingScreen