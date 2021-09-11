import React, {useState, useCallback} from "react";
import { ScrollView, Text, StyleSheet, ActivityIndicator} from "react-native";
import StatusBar from "../../components/StatusBar";
import useAuth from "../../hooks/useAuth";
import {size} from "lodash";
import colors from "../../styles/colors";
import {useFocusEffect} from "@react-navigation/native";
import {getOrdersApi} from "../../api/order";
import ScreenLoading from "../../components/ScreenLoading";
import ListOrder from "../../components/Order/ListOrder";

export default function Orders(){
    const [orders, setOrders] = useState(null);
    const {auth} = useAuth();
    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getOrdersApi(auth);
               setOrders(response);
            })()
        }, [])
    );

    return(
        <>
        <StatusBar/>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Mis pedidos</Text>
                {!orders ? (
                    <ActivityIndicator size="large" style={styles.loading} />
                ) : size(orders) === 0 ? (
                    <Text style={styles.noOrderText}>No tienes pedidos</Text>
                ) : (
                    <ListOrder orders={orders}/>
                )}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 20,

    },
    noOrderText:{
        textAlign: "center",
        paddingTop: 20,
        fontSize: 18,
    },
    title:{
        fontSize: 20,
    },
    loading:{
        marginTop: 20,
    }

});