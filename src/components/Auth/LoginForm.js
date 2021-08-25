import React, { useState } from "react";
import { View, Text} from "react-native";
import { TextInput, Button} from "react-native-paper";
import {formStyles} from "../../styles";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginApi } from '../../api/user';
import Toast from "react-native-root-toast";
import {RootSiblingParent} from 'react-native-root-siblings';
import useAuth from "../../hooks/useAuth";

export default function LoginForm(props){
    const { changeForm } = props;
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();


    const formik = useFormik({
        initialValues:initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                const response = await loginApi(formData);
                if(response.statusCode) throw "Usuario y/o contraseña incorrecta";
                login(response);
            }catch (e) {
                Toast.show("Usuario y/o contraseña incorrecta", {
                    position: Toast.positions.CENTER
                })
             setLoading(false);
            }
            
        },
    });
    return(
      <RootSiblingParent>
          <TextInput label="Email o username" style={formStyles.input} onChangeText={(text) => formik.setFieldValue("identifier", text)} value={formik.values.identifier} error={formik.errors.identifier}/>
          <TextInput label="Contraseña" style={formStyles.input} secureTextEntry onChangeText={(text) => formik.setFieldValue("password", text)} value={formik.values.password} error={formik.errors.password} />
          <Button mode="contained" style={formStyles.btnSucces} onPress={formik.handleSubmit} loading={loading}>
              Entrar
          </Button>
          <Button mode="text" style={formStyles.btnText} labelStyle={formStyles.btnTextLabel} onPress={changeForm}>Registrarse</Button>
      </RootSiblingParent>
    );
}
function initialValues()
{
    return{
        identifier: "",
        password: ""
    }
}

function validationSchema()
{
    return{
        identifier: Yup.string().required(true),
        password: Yup.string().required(true)
    }
}