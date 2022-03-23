import React from 'react-native';
import {StyleSheet} from 'react-native';
import{general, colors,fonts} from '../../../deafultstyles';


export default StyleSheet.create({
    ...general,
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffffff",
    },
    imagem: {
        height: 98,
        width: 309,
    }

})