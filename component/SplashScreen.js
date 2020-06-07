import React from 'react';
import { View, Text, StatusBar, StyleSheet, Dimensions, Button ,TouchableOpacity } from "react-native";
import * as Animetable from "react-native-animatable";

import MetarialIcons from "react-native-vector-icons/MaterialIcons"



function SplashScreen({ navigation }) {

    return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content"/>
            <View style={styles.header}>
              <Animetable.Image
                animation="bounceIn"
                duration={1500}
                source={require("../assets/logo.png")}
                style={styles.logo}
                resizeMode={"stretch"}
              />
            </View>
  
            <Animetable.View animation="fadeInUpBig" style={styles.footer}>
              <Text style={styles.title}>Chào mừng bạn đến với BCODE</Text>
              <Text style={styles.text}>Sign in with account</Text>
              <View style={styles.button}>
  
              <TouchableOpacity
              onPress={() => navigation.navigate("SignIn")}>
              <View
                  colors={['#5db8fe','#39cff2']}
                  style={styles.signIn}>
                    <Text style={styles.textSign}>Get started</Text>
                    <MetarialIcons 
                    name="navigate-next"
                    color="white"
                    size={20}
                    />
                </View>
              </TouchableOpacity>
  
               
              </View>
            </Animetable.View>
        
        </View>
      );
}

const { height } = Dimensions.get("screen");
const logo_size = height * 0.7 * 0.4;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05375a"
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  footer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30
  },

  logo: {
    width: logo_size,
    height: logo_size
  },

  title: {
    color: "#05375a",
    fontWeight: "bold",
    fontSize: 30
  },

  text: {
    color: "gray",
    marginTop: 5
  },

  button: {
    alignItems: "flex-end",
    marginTop: 30
  },

  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
    backgroundColor:'#5db8fe'
  },

  textSign: {
    color: "white",
    fontWeight: "bold"
  }
});

export default SplashScreen