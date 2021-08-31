import React from "react";
import { StyleSheet, Alert } from "react-native";
import { List } from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";

export default function Menu(){
    const navigation = useNavigation();
    const {logout} = useAuth();
    const logoutAccount = () => {
        Alert.alert(
            "Cerrar sesión",
            "¿Estas seguro que deseas salir de tu cuenta?",
            [
                {
                    text: "NO",
                },
                {
                    text: "SI",
                    onPress: logout,
                }

            ],
            { cancelable: false }
        )
    }
    return(
        <>
      <List.Section>
          <List.Subheader>Mi cuenta</List.Subheader>
          <List.Item title="Cambiar nombre" description="Cambia el nombre de tu cuenta" left={(props) => <List.Icon {...props} icon="face" />} onPress={() => navigation.navigate("change-name")}/>
          <List.Item title="Cambiar Email" description="Cambia el email de tu cuenta" left={(props) => <List.Icon {...props} icon="at" />} onPress={() => navigation.navigate("change-email")}/>
          <List.Item title="Cambiar Username" description="Cambia el nombre de usuario " left={(props) => <List.Icon {...props} icon="sim" />} onPress={() => navigation.navigate("change-username")}/>
          <List.Item title="Cambiar Contraseña" description="Cambia tu contraseña" left={(props) => <List.Icon {...props} icon="key" />} onPress={() => navigation.navigate("change-password")}/>
          <List.Item title="Mis direcciones" description="Administrar mis direcciones" left={(props) => <List.Icon {...props} icon="map" />} onPress={() => console.log("ir a admin dir...")}/>
      </List.Section>

        <List.Section>
            <List.Subheader>App</List.Subheader>
            <List.Item title="Mis pedidos" description="Listado de mis pedidos" left={(props) => <List.Icon {...props} icon="clipboard-list" />} onPress={() => console.log("ir a mis pedidosr...")}/>
            <List.Item title="Lista de deseos" description="Mi lista de deseos" left={(props) => <List.Icon {...props} icon="heart" />} onPress={() => navigation.navigate("favorites")}/>
            <List.Item title="Cerrar Sesión" description="Cierra esta sesión y inicia con otra sesión" left={(props) => <List.Icon {...props} icon="logout" />} onPress={logoutAccount}/>

        </List.Section>

        </>
    );
}

const styles = StyleSheet.create({

});