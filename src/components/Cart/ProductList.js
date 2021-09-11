import React, {useEffect} from "react";
import { View, Text, StyleSheet} from "react-native";
import { map } from "lodash";
import {getProductApi} from "../../api/product";
import ScreenLoading from "../../components/ScreenLoading";
import Product from "../../components/Cart/Product";

export default function ProductList(props){

    const { cart, products, setProducts, setRealoadCart, setTotalPayment } = props;

    useEffect(() => {
        (async () => {
            setProducts(null);
           const productTemp = [];
           let totalPaymentTemp = 0;
            for await (const product of cart)
            {
               const response = await getProductApi(product.idProduct);
               response.quantity = product.quantity;
               productTemp.push(response);

               const price = calcPrice(response.price, response.discount);
               totalPaymentTemp += price * response.quantity;
            }
            setProducts(productTemp);
            setTotalPayment(totalPaymentTemp);
        })()
    }, [cart]);

    console.log(cart);
    return(
        <View>
            <Text style={styles.title}>PRODUCTOS</Text>
            {!products ? (
                <ScreenLoading text="Cargando carrito"  />
            ) : (
                map(products, (product) => (
                    <Product key={product._id} product={product} setRealoadCart={setRealoadCart} />
                ))
            )}
        </View>
    )
}
function calcPrice (price, discount) {

    if(!discount) return price;
    const discountAmount = (price * discount) / 100;
    return (price - discountAmount).toFixed(2);

}

const styles = StyleSheet.create({
    title:{
        fontSize: 18,
        fontWeight: "bold",
    }
});