import React from "react";
import {View, Text, StyleSheet, Alert} from "react-native";
import { Button } from "react-native-paper";
import {map} from "lodash";
import colors from "../../styles/colors";
import {deleteAddressApi} from "../../api/address";
import useAuth from "../../hooks/useAuth";
import {useNavigation} from "@react-navigation/native";

export default function AddressList(props){
    const navigation = useNavigation();
    const { addresses, setReloadAddress } = props;
    const { auth } = useAuth();
    const deleteAddressAlert = (address) => {
        Alert.alert(
            "Eliminar dirección",
            `¿Estas seguro que deseas eliminar la dirección: ${address.title}?`,
            [
                {
                    text: "NO"
                },
                {
                  text: "SI",
                  onPress: () =>deleteAddress(address._id)
                }
            ],
            { cancelable: false }
        )
    }

    const deleteAddress = async (idAddress) => {
        try {
            await deleteAddressApi(auth, idAddress)
            setReloadAddress(true);
        }catch (e) {
            console.log(e);
        }
    }

    const goToUpdateAddress = (idAddress) => {
        navigation.navigate("add-address", {idAddress})
    }
    return(
      <View style={styles.container}>
          {map(addresses, (address) => (
             <View key={address._id} style={styles.address}>
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
                <View style={styles.actions}>
                <Button onPress={() => goToUpdateAddress(address._id)} mode="contained" color={colors.primary}>Editar</Button>
                <Button onPress={() => deleteAddressAlert(address)} mode="contained" color="#ff4040">Eliminar</Button>
                </View>
             </View>
          ))}
      </View>
    );
}

const styles = StyleSheet.create({
    container:{
      marginTop: 50,
    },
    title:{
        fontWeight: "bold",
        paddingBottom: 5,
    },
    address:{
        borderWidth: 0.9,
        borderRadius: 5,
        borderColor: "#ddd",
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 15,
    },
    blockLine:{
        flexDirection: "row"
    },
    actions:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
    }
});