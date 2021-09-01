import React, {useCallback, useState} from "react";
import {View, StyleSheet} from "react-native";
import {TextInput, Button} from "react-native-paper";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {formStyles} from "../../styles";
import Toast from "react-native-root-toast";
import {useFormik} from "formik";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import {getMeApi, updateUserApi} from "../../api/user";

export default function ChangeEmail(){
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const { auth } = useAuth();
    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getMeApi(auth.token);
                await formik.setFieldValue("email", response.email);
            })()
        }, [])
    )

    const formik = useFormik({
        initialValues:initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                const response = await updateUserApi(auth, formData);
                if(response.statusCode) throw "El email ingresado ya existe";
                navigation.goBack();
            }catch (e){
               Toast.show(e, {
                   position: Toast.positions.CENTER,
               });
               formik.setFieldError("email", true);
                setLoading(false);
            }

        }
    });
    return(
        <View style={styles.container}>
            <TextInput label="Correo electrónico" style={formStyles.input} onChangeText={(text) => formik.setFieldValue("email", text)} value={formik.values.email} error={formik.errors.email}/>
            <Button mode="contained" style={formStyles.btnSucces} onPress={formik.handleSubmit} loading={loading}>Cambiar email</Button>
        </View>
    )
}

function initialValues()
{
    return{
        email: "",
    }
}

function validationSchema()
{
    return{
        email: Yup.string().email(true).required(true),
    }
}
const styles = StyleSheet.create({
    container:{
        padding: 20,
    }
});