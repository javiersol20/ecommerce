import React from "react";
import { StyleSheet, View} from "react-native";
import {Button} from "react-native-paper";
import {addProductCartApi} from "../../api/cart";
import Toast from "react-native-root-toast";
import {RootSiblingParent} from 'react-native-root-siblings';

export default function Buy(props){
    const { product, quantity } = props;


    const addProductCart = async () => {
        const response =  await addProductCartApi(product._id, quantity);

        if(response)
        {
            Toast.show("Producto añadido al carrito", {
                position: Toast.positions.CENTER,
            })
        }else {
            Toast.show("Error al añadir el producto al carrito", {
                position: Toast.positions.CENTER,
            })
        }
    }
    return(
        <RootSiblingParent>
        <View style={{zIndex: 10}}>
        <Button mode="contained" contentStyle={styles.btnBuyContent}
        labelStyle={styles.btnLabel}
        style={styles.btn}
        onPress={addProductCart}>
        Añadir a la cesta
        </Button>
        </View>
        </RootSiblingParent>
    )
}

const styles = StyleSheet.create({
    btnBuyContent: {
        backgroundColor: "#008fe9",
        paddingVertical: 5,

    },
    btnLabel:{
        fontSize: 18
    },
    btn:{
        marginTop: 20,

    }
});