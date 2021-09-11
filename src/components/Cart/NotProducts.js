import React from "react";
import { View, Text, StyleSheet} from "react-native";

export default function NotProducts(){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>AUN NO TIENES PRODUCTOS EN EL CARRITO</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 20,
    },
    text: {
        fontSize: 16,
    }
});