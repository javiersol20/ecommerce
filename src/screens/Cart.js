import React, {useState, useCallback, useEffect} from "react";
import { StyleSheet, ScrollView , View, Text } from "react-native";
import StatusBar from "../components/StatusBar";
import colors from "../styles/colors";
import {useFocusEffect} from "@react-navigation/native";
import {getProductCartApi} from "../api/cart";
import {size} from "lodash";
import {getAddressesApi} from "../api/address";
import NotProducts from "../components/Cart/NotProducts";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import ProductList from "../components/Cart/ProductList";
import useAuth from "../hooks/useAuth";
import AddressList from "../components/Cart/AddressList";
import Payment from "../components/Cart/Payment";
import Search from "../components/Search";

export default function Cart(){
    const {auth} = useAuth();
    const [cart, setCart] = useState(null);
    const [realoadCart, setRealoadCart] = useState(false);
    const [addresses, setAddresses] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [totalPayment, setTotalPayment] = useState(null);

    useFocusEffect(
        useCallback(() => {
           setCart(null);
           setAddresses(null);
           setSelectedAddress(null);

           loadCart();
           loadAddresses();
        }, [])
    );

    useEffect(() => {
        if(realoadCart)
        {
            loadCart();
            setRealoadCart(false);
        }
    }, [realoadCart]);

    const [products, setProducts] = useState(null);

    const loadCart = async () => {
        const response = await getProductCartApi();
        setCart(response);
    }
    const loadAddresses = async () => {
        const response = await getAddressesApi(auth);
        setAddresses(response);
    }
    return(
        <>
            <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
            {!cart || size(cart) === 0 ? (
                <>
                    <Search/>
                    <NotProducts />
                </>

            ) : (
               <KeyboardAwareScrollView>
                   <ScrollView style={styles.cartContainer}>
                        <ProductList setTotalPayment={setTotalPayment} setRealoadCart={setRealoadCart} cart={cart} products={products} setProducts={setProducts} />
                    <AddressList addresses={addresses} selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />
                    <Payment totalPayment={totalPayment} selectedAddress={selectedAddress} products={products}/>
                   </ScrollView>
               </KeyboardAwareScrollView>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    cartContainer:{
        padding: 10,
    }
});