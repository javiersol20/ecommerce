import React, {useCallback, useState} from "react";
import {View, StyleSheet} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {formStyles} from "../../styles";
import Toast from "react-native-root-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import {getMeApi, updateUserApi} from "../../api/user";

export default function ChangeUsername(){
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const { auth } = useAuth();
    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getMeApi(auth.token);
                await formik.setFieldValue("username", response.username);
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
               if(response.statusCode) throw "El usuario ya existe";
               navigation.goBack();
           }catch (e){
               Toast.show(e, {
                   position: Toast.positions.CENTER,
               });
               formik.setFieldError("username", true);
               setLoading(false);
           }
       }
    });
    return(
        <View style={styles.container}>
            <TextInput label="Usuario" style={formStyles.input} onChangeText={(text) => formik.setFieldValue("username", text)} value={formik.values.username} error={formik.errors.username}/>
            <Button mode="contained" style={formStyles.btnSucces} onPress={formik.handleSubmit} loading={loading}>Actualizar</Button>
        </View>
    )
}
function initialValues()
{
    return{
        username: "",
    }
}

function validationSchema()
{
    return{
        username: Yup.string().required(true),
    }
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
    }
})