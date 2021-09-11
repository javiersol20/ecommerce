import React from "react";
import { View, Text, StyleSheet, Image} from "react-native";
import {API_URL} from "../../utils/constants";

export default function Order(props){

    const {order} = props;
    return(
            <View style={styles.container}>
               <View style={styles.containerImage}>
                   <Image source={{uri: `${API_URL}${order.product.main_image.url}`}} style={styles.image} />
               </View>
                <View style={styles.info}>
                    <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
                        {order.product.title}
                    </Text>
                    <Text>
                        Cantidad: {order.quantity}
                    </Text>
                    <Text>Total pagado: Q. {order.productPayment}</Text>
                    <Text>{order.createdAt}</Text>
                </View>
            </View>
    )
}
const styles = StyleSheet.create({
    container:{
        borderBottomWidth: 1,
        borderColor: "#ddd",
        marginHorizontal: -20,
        paddingVertical: 5,
        flexDirection: "row",
    },
    name:{
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    info:{
        width: "70%",
        justifyContent: "center",
    },
    containerImage:{
        width: "30%",
        height: 120,
        padding: 10,
    },
    image:{
        height: "100%",
        resizeMode: "contain",
    }
});