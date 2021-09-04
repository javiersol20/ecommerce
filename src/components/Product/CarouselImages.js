import React, {useState} from "react";
import {StyleSheet, Image, Dimensions} from "react-native";
import Carousel, {Pagination} from "react-native-snap-carousel";
import {API_URL} from "../../utils/constants";
import {size} from "lodash";
const width = Dimensions.get("window").width;
const height = 500;
export default function CarouselImages(props){
    const { images } = props;
    const [imageActive, setImageActive] = useState(0);

    const renderItem = ({item}) => {

        return(
            <Image source={{uri: `${API_URL}${item.url}`}} style={styles.carousel}/>
        )
    }
    return(
        <>
         <Carousel layout={"default"} data={images} sliderWidth={width} itemWidth={width} renderItem={renderItem} onSnapToItem={(index) => setImageActive(index)} />
        <Pagination dotsLength={size(images)} activeDotIndex={imageActive} inactiveDotOpacity={0.4} inactiveDotScale={0.6} />
        </>
    )
}

const styles = StyleSheet.create({
    carousel:{
        width,
        height,
        resizeMode: "contain",
    }
});