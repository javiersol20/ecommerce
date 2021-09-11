import React, {useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import {TextInput, Button} from "react-native-paper";
import {formStyles} from "../../styles";
import colors from "../../styles/colors";
import {useFormik} from "formik";
import {size} from "lodash";
import * as Yup from "yup";
import {STRIPE_PUBLISHABLE_KEY} from "../../utils/constants";
import Toast from "react-native-root-toast";
import {RootSiblingParent} from "react-native-root-siblings";
import {paymentCartApi, deleteCartApi} from "../../api/cart";
import useAuth from "../../hooks/useAuth";
import {useNavigation} from "@react-navigation/native";

const stripe = require("stripe-client")(STRIPE_PUBLISHABLE_KEY);

export default function Payment(props){
    const navigation = useNavigation();
    const { auth } = useAuth();
    const {products, selectedAddress, totalPayment} = props;
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
       initialValues:initialValues(),
       validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
           const result = await stripe.createToken({card: formData});
            setLoading(true);

            if(result?.error)
            {
                setLoading(false);
                Toast.show(result.error.message, {
                    position: Toast.positions.CENTER
                })
            }else{
                const response = await paymentCartApi(
                    auth,
                    result.id,
                    products,
                    selectedAddress
                );
                if(size(response) > 0)
                {
                    await deleteCartApi();
                    navigation.navigate("accounts", {screen: "orders"});
                }else{
                    Toast.show("Error al realizar el pedido", {
                        position: Toast.positions.CENTER,
                    });
                    setLoading(false);
                }

            }

        }
    });
    return(
        <RootSiblingParent>
        <View style={styles.container}>
            <Text style={styles.containerTitle}>Forma de pago: </Text>
            <TextInput label="Nombre de la tarjeta" style={formStyles.input} onChangeText={(text) => formik.setFieldValue("name", text)} value={formik.values.name} error={formik.errors.name}/>
            <TextInput label="Numero de la tarjeta" style={formStyles.input} onChangeText={(text) => formik.setFieldValue("number", text)} value={formik.values.number} error={formik.errors.number}/>

            <View style={styles.containerInputs}>
                <View style={styles.containerMonthYearInputs}>
                    <TextInput label="mes" style={styles.inputDate} onChangeText={(text) => formik.setFieldValue("exp_month", text)} value={formik.values.exp_month} error={formik.errors.exp_month}/>
                    <TextInput label="año" style={styles.inputDate} onChangeText={(text) => formik.setFieldValue("exp_year", text)} value={formik.values.exp_year} error={formik.errors.exp_year}/>
                </View>
                <TextInput label="cvv/cvc" style={styles.inputCvc} onChangeText={(text) => formik.setFieldValue("cvc", text)} value={formik.values.cvc} error={formik.errors.cvc}/>

            </View>

            <Button mode="contained" loading={loading} onPress={!loading && formik.handleSubmit} contentStyle={styles.btnContent} labelStyle={styles.btnText}>
                Pagar: Q. {totalPayment && `${totalPayment}`}
            </Button>
        </View>
        </RootSiblingParent>
    )
}

function initialValues()
{
    return{
        number: "",
        exp_month: "",
        exp_year: "",
        cvc: "",
        name: "",
    }
}

function validationSchema()
{
    return{
        number: Yup.string().min(16, true).max(16, true).required(true),
        exp_month: Yup.string().min(2, true).max(2, true).required(true),
        exp_year: Yup.string().min(2, true).max(2, true).required(true),
        cvc: Yup.string().min(3, true).max(3, true).required(true),
        name: Yup.string().required(true),

    }
}
const styles = StyleSheet.create({
    container:{
        marginTop: 40,
        marginBottom: 30,
    },
    btnText:{
        fontSize: 16,
    },
    btnContent:{
        paddingVertical: 4,
        backgroundColor: colors.primary,
    },

    inputCvc:{
      width: "40%",
    },
    inputDate:{
      width: 100,
        marginRight: 10,
    },
    containerMonthYearInputs:{
      flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
    containerTitle:{
        paddingBottom: 10,
        fontSize: 18,
        fontWeight: "bold",
    },
    containerInputs:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    }
});