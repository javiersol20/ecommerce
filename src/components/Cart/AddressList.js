import React, {useEffect} from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback} from "react-native";
import {map} from "lodash";
import colors from "../../styles/colors";
import ScreenLoading from "../ScreenLoading";

export default function AddressList(props){

    const {addresses, selectedAddress, setSelectedAddress} = props;
    useEffect(() => {
        addresses && setSelectedAddress(addresses[0])
    },[addresses] )
    return(
        <View style={styles.container}>
            <Text style={styles.containerTitle}>Dirección de envio: </Text>
            {!addresses && <ScreenLoading text="Cargando direcciones" />}
            { map(addresses,  (address) => (
                <TouchableWithoutFeedback key={address._id} onPress={() => setSelectedAddress(address)}>
                    <View style={[styles.address, address._id === selectedAddress?._id && styles.checked]}>
                        <Text style={styles.title}>{address.title}</Text>
                        <Text>{address.name_lastname}</Text>
                        <Text>{address.address}</Text>
                        <View style={styles.blockLine}>
                            <Text>{address.state}, </Text>
                            <Text>{address.city}, </Text>
                            <Text>{address.postal_code}</Text>
                        </View>
                        <Text>{address.country}</Text>
                        <Text>Numero de telefono: {address.phone}</Text>
                    </View>
                </TouchableWithoutFeedback>
            ))  }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop: 50,
    },
    blockLine:{
        flexDirection: "row",
    },
    title:{
        fontWeight: "bold",
        paddingBottom: 5,
    },
    containerTitle:{
        paddingBottom: 10,
        fontSize: 18,
        fontWeight: "bold",
    },
    address:{
        borderWidth: 0.9,
        borderRadius: 5,
        borderColor: "#ddd",
        padding: 15,
        marginBottom: 15,
    },
    checked:{
        borderColor: colors.primary,
        backgroundColor: "#0098d330",
    }
});