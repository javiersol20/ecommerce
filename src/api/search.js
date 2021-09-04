import AsyncStorage from "@react-native-async-storage/async-storage";
import { SEARCH_HISTORY, API_URL } from "../utils/constants";
import {size} from "lodash";
import {sortArrayByDate} from "../utils/functions";


export async function getSearchHistoryApi(){

    try {
        const history = await AsyncStorage.getItem(SEARCH_HISTORY);
        if(!history) return []

        return sortArrayByDate(JSON.parse(history));
    }catch (e){
        console.log(e);
        return [];
    }

}

export async function updateSearchHistoryApi(search){
    const history = await getSearchHistoryApi();

    if(size(history) > 5) history.pop();

    history.push({
        search,
        date: new Date(),
    });

    await AsyncStorage.setItem(SEARCH_HISTORY, JSON.stringify(history));
}

export async function searchProductsApi(search){
    try {
        const url = `${API_URL}/products?_q=${search}&_limit=40`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    }catch (e) {
        console.log(e);
        return null;
    }
}