import React from 'react'
import { View, Dimensions, Image } from "react-native"

import style from '../style';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH)
// export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8)

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={style.announcement} key={index}>
        <Image
        style={style.imageAnnouncement}
        source={item.img}
        resizeMode="contain"
        />
    </View>
  )
}

export default CarouselCardItem
