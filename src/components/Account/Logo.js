import React, {useState, useEffect} from "react";
import {View, Text, Image,Button, StyleSheet, Platform} from "react-native";
import LogoDefault from "../../../assets/profile.png";
import useAuth from "../../hooks/useAuth";
import * as ImagePicker from 'expo-image-picker';

export default function Logo(props){
    const { user } = props;

    return(
      <View>
          {user.image === "sin-image" ? <Image style={styles.logo} source={LogoDefault}/> : <Image/>}

      </View>
    );
}

const styles = StyleSheet.create({
    logo:{

            width: "100%",
            height: 100,
            resizeMode: "contain",
            marginLeft: -145,
            marginBottom: -25,
            marginTop:10,

    },
});