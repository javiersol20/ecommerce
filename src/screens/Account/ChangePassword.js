import React, {useState} from "react";
import {View, StyleSheet} from "react-native";
import {TextInput, Button} from "react-native-paper";
import {formStyles} from "../../styles";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useNavigation} from "@react-navigation/native";
import Toast from "react-native-root-toast";
import useAuth from "../../hooks/useAuth";
import {updateUserApi} from "../../api/user";

export default function ChangePassword(){
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth();

    const navigation = useNavigation();

    const formik = useFormik({
        initialValues:initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
                try {
                   const response =  await updateUserApi(auth, formData);
                   if(response.statusCode) throw "Error al cambiar la contraseña";
                    navigation.goBack();
                }catch (e){
                    Toast.show(e, {
                        position: Toast.positions.CENTER,
                    })
                    setLoading(false);
                }

        }
    });
    return(
      <View style={styles.container}>
         <TextInput label="Nueva contraseña" secureTextEntry style={formStyles.input} onChangeText={(text) => formik.setFieldValue("password", text)} value={formik.values.password} error={formik.errors.password} />
         <TextInput label="Repetir contraseña" secureTextEntry style={formStyles.input}  onChangeText={(text) => formik.setFieldValue("repeatPassword", text)} value={formik.values.repeatPassword} error={formik.errors.repeatPassword}/>
          <Button mode="contained" style={formStyles.btnSucces} onPress={formik.handleSubmit} loading={loading}>Cambiar contraseña</Button>
      </View>
    );
}

function initialValues()
{
    return{
        password: "",
        repeatPassword: "",
    }
}

function validationSchema()
{
    return{
        password: Yup.string().min(4, true).required(true),
        repeatPassword: Yup.string().min(4, true).oneOf([Yup.ref("password")]).required(true)
    }
}
const styles = StyleSheet.create({
   container:{
       padding: 20,
   }
});