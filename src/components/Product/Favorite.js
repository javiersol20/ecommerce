import React, {useState, useEffect} from "react";
import {  StyleSheet, View} from "react-native";
import { Button } from "react-native-paper";
import {isFavoriteApi, addFavoriteApi, deleteFavoriteApi} from "../../api/favorite";
import useAuth from "../../hooks/useAuth";
import {size} from "lodash";

export default function Favorite(props){
    const {product} = props;
    const {auth} = useAuth();
    const [isFavorite, setIsFavorite] = useState(undefined);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const response = await isFavoriteApi(auth, product._id);
            if(size(response) === 0) setIsFavorite(false);
            else setIsFavorite(true);
        })()
    }, [product]);

    const addFavorite = async () => {
        if(!loading)
        {
            setLoading(true);
            try {
                await addFavoriteApi(auth, product._id);
                setIsFavorite(true);
            }catch (e){
                console.log(e);
            }
            setLoading(false);

        }

    }

    const deleteFavorite = async () => {
       if(!loading) {
           setLoading(true);
           try {
               await deleteFavoriteApi(auth, product._id);
               setIsFavorite(false);
           }catch (e) {
               console.log(e);
           }
           setLoading(false);
       }
    }
    if(isFavorite === undefined) return null;

    return(
        <View style={{zIndex: 1}}>
        <Button
        mode="contained"
        contentStyle={isFavorite ? styles.btnDeleteFavoritesContent : styles.btnAddFavoritesContent}
        labelStyle={styles.btnLabel}
        style={styles.btn}
        onPress={isFavorite ? deleteFavorite : addFavorite}
        loading={loading}>
            {isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
        </Button>
        </View>
    );
}

const styles = StyleSheet.create({

    btnAddFavoritesContent:{
        backgroundColor: "#057b00",
        paddingVertical: 5
    },
    btnDeleteFavoritesContent:{
        backgroundColor: "#c40000",
        paddingVertical: 5
    },
    btn:{
      marginTop: 20,
    },
    btnLabel:{
        fontSize: 18,
    }
});