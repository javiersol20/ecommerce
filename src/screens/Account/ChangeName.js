import React, {useCallback, useState} from "react";
import { View, StyleSheet } from 'react-native';
import {TextInput, Button} from "react-native-paper";
import {formStyles} from "../../styles";
import {useFormik} from "formik";
import * as Yup from "yup";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {getMeApi, updateUserApi} from "../../api/user";
import useAuth from "../../hooks/useAuth";
import Toast from "react-native-root-toast";

export default function ChangeName(){
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const {auth} = useAuth();
    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getMeApi(auth.token);
                if(response.name && response.lastname)
                {
                    await formik.setFieldValue("name", response.name);
                    await formik.setFieldValue("lastname", response.lastname);
                }

            }) ()
        }, [])
    )
    const formik = useFormik({
        initialValues:initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formValue) => {
            setLoading(true);
                try {
                    await updateUserApi(auth, formValue);
                    navigation.goBack();
                }catch (e){
                    Toast.show("Error al actualizar los datos.", {
                        position: Toast.positions.CENTER,
                    });
                    setLoading(false);
                }

        },
    });
    return(
      <View style={styles.container}>
          <TextInput label="Nombres" style={formStyles.input} onChangeText={(text) => formik.setFieldValue("name", text)} value={formik.values.name} error={formik.errors.name}/>

          <TextInput label="Apellidos" style={formStyles.input} onChangeText={(text) => formik.setFieldValue("lastname", text)} value={formik.values.lastname} error={formik.errors.lastname}/>

          <Button mode="contained" style={formStyles.btnSucces} onPress={formik.handleSubmit} loading={loading}>Guardar datos</Button>
      </View>
    );
}

function initialValues()
{
    return{
        name: "",
        lastname: "",
    }

}

function validationSchema()
{
    return{
        name: Yup.string().required(true),
        lastname: Yup.string().required(true)
    }
}
const styles = StyleSheet.create({
    container:{
        padding: 20,
    }
});

