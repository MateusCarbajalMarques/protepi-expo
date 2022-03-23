import React from 'react'
import { View } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'

import OpaAnnouncement from '../../../../assets/images/mascaraantiviral.jpg';    
import GFaceShield from '../../../../assets/images/faceshield.jpg';

import Luva from '../../../../assets/images/luva.jpg';
const CarouselCards = () => {
    const isCarousel = React.useRef(null)
    const [index, setIndex] = React.useState(0)

    const data = [
      {
        id: 0,
        img: OpaAnnouncement,
      },
      {
        id: 1,
        img: GFaceShield,
      },
      {
        id: 2,
        img: Luva,
      },
  
    ];

  return (
    <View>
      <Carousel
        layout="default"
        layoutCardOffset={9}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{          
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.92)'
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>

  )
}


export default CarouselCards