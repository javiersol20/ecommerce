import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Account from "../screens/Account/Account";
import ChangeName from "../screens/Account/ChangeName";
import colors from "../styles/colors";
import ChangeEmail from "../screens/Account/ChangeEmail";
import ChangeUsername from "../screens/Account/ChangeUsername";
import ChangePassword from "../screens/Account/ChangePassword";
import Addresses from "../screens/Account/Addresses";
import Orders from "../screens/Account/Orders";
import AddAddress from "../screens/Account/AddAddress";
const Stack = createStackNavigator();

export default function AccountStack(){
    return(
      <Stack.Navigator screenOptions={{ headerTintColor:  colors.fontLight, headerStyle: {backgroundColor: colors.bgDark}, cardStyle: { backgroundColor: colors.bgLight}}}>
          <Stack.Screen name="account" component={Account} options={{title: "Cuenta", headerShown: false}} />
          <Stack.Screen name="change-name" component={ChangeName} options={{title: "Cambio de nombre y apellidos", headerShown: true}} />
          <Stack.Screen name="change-email" component={ChangeEmail} options={{title: "Cambio de email", headerShown: true}} />
          <Stack.Screen name="change-username" component={ChangeUsername} options={{title: "Cambio de usuario", headerShown: true}} />
          <Stack.Screen name="change-password" component={ChangePassword} options={{title: "Cambio de contraseña", headerShown: true}} />
          <Stack.Screen name="addresses" component={Addresses} options={{title: "Direcciones", headerShown: true}}/>
          <Stack.Screen name="add-address" component={AddAddress} options={{title: "Nueva dirección", headerShown: true}}/>
          <Stack.Screen name="orders" component={Orders} options={{title: "Mis pedidos", headerShown: true}}/>
      </Stack.Navigator>
    );
}