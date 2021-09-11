import React, {useState, useCallback} from "react";
import { StyleSheet, View, Text } from "react-native";
import StatusBar from '../components/StatusBar';
import colors from "../styles/colors";
import Search from "../components/Search";
import {getFavoriteApi} from "../api/favorite";
import {useFocusEffect} from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import ScreenLoading from "../components/ScreenLoading";
import {size} from "lodash";
import FavoriteList from "../components/Favorites/FavoriteList";

export default function Favorites(){

    const [products, setProducts] = useState(null);
    const [reloadFavorites, setReloadFavorites] = useState(false);
    const { auth } = useAuth();

    useFocusEffect(

        useCallback(() => {
            setProducts(null);
            (async () => {
                const response = await getFavoriteApi(auth)
                setProducts(response);
            })()
            setReloadFavorites(false);
        }, [reloadFavorites])

    );


    return(
        <>
            <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
            <Search />
            {!products ? ( <ScreenLoading text="Cargando lista" /> ) : size(products) === 0 ? ( <View style={styles.container}><Text style={styles.title}>Lista de favoritos</Text><Text>No tienes productos en tu lista</Text></View>) : (<FavoriteList products={products} setReloadFavorites={setReloadFavorites} />)}
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    title:{
        fontWeight: "bold",
        fontSize: 19,
        marginBottom: 5,
    }
});